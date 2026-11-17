"use server"

import { Resend } from "resend"
import { z } from "zod"

import { createContactSchema, type ContactFormState } from "@/lib/contact"
import { getContent } from "@/lib/content"
import { defaultLocale, format, getDictionary, hasLocale } from "@/lib/i18n"

const DEFAULT_FROM = "Portafolio <onboarding@resend.dev>"

function readField(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Las Server Actions no tienen acceso a next/root-params, por eso el idioma llega en un campo oculto.
  const requestedLocale = readField(formData, "locale")
  const locale = hasLocale(requestedLocale) ? requestedLocale : defaultLocale
  const t = getDictionary(locale).contact
  const { email: ownerEmail } = getContent(locale).profile

  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    message: readField(formData, "message"),
  }

  // Campo trampa invisible: si un bot lo llena, se responde con éxito sin enviar nada.
  if (readField(formData, "company")) {
    return { status: "success", message: t.result.success }
  }

  const parsed = createContactSchema(t.validation).safeParse(values)
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error)
    return {
      status: "error",
      message: t.result.invalid,
      values,
      fieldErrors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contacto] RESEND_API_KEY no está configurada.")
    return { status: "error", message: format(t.result.unavailable, { email: ownerEmail }), values }
  }

  const { name, email, message } = parsed.data
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM,
    to: process.env.CONTACT_TO_EMAIL ?? ownerEmail,
    replyTo: email,
    subject: format(t.result.subject, { name }),
    text: `Nombre: ${name}\nEmail: ${email}\nIdioma: ${locale}\n\n${message}`,
  })

  if (error) {
    console.error("[contacto] Error al enviar con Resend:", error)
    return { status: "error", message: format(t.result.failed, { email: ownerEmail }), values }
  }

  return { status: "success", message: t.result.success }
}
