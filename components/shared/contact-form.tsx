"use client"

import { CheckCircle2, Loader2, Send } from "lucide-react"
import { useActionState } from "react"

import { sendContactMessage } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { initialContactState, type ContactField } from "@/lib/contact"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n-config"
import { cn } from "@/lib/utils"

type FieldProps = {
  name: ContactField
  label: string
  error?: string
  defaultValue?: string
  children: (props: {
    id: string
    name: ContactField
    defaultValue?: string
    "aria-invalid": boolean
    "aria-describedby"?: string
  }) => React.ReactNode
}

function Field({ name, label, error, defaultValue, children }: FieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children({
        id,
        name,
        defaultValue,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

type ContactFormProps = {
  locale: Locale
  labels: Dictionary["contact"]["form"]
}

export function ContactForm({ locale, labels }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialContactState)

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-xl border bg-card p-8 text-center">
        <CheckCircle2 className="size-10 text-brand" aria-hidden="true" />
        <p className="font-medium">{state.message}</p>
      </div>
    )
  }

  const { fieldErrors, values } = state

  return (
    <form action={formAction} className="grid gap-5 rounded-xl border bg-card p-6" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={labels.name} error={fieldErrors?.name} defaultValue={values?.name}>
          {(props) => <Input {...props} autoComplete="name" required className="h-10" />}
        </Field>
        <Field name="email" label={labels.email} error={fieldErrors?.email} defaultValue={values?.email}>
          {(props) => <Input {...props} type="email" autoComplete="email" required className="h-10" />}
        </Field>
      </div>

      <Field name="message" label={labels.message} error={fieldErrors?.message} defaultValue={values?.message}>
        {(props) => <Textarea {...props} rows={5} required placeholder={labels.messagePlaceholder} />}
      </Field>

      {/* Campo trampa para bots: oculto para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">{labels.honeypot}</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="alert"
          aria-live="polite"
          className={cn("text-sm", state.status === "error" ? "text-destructive" : "sr-only")}
        >
          {state.message}
        </p>
        <Button type="submit" disabled={isPending} className="h-10 px-5">
          {isPending ? (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          ) : (
            <Send data-icon="inline-start" />
          )}
          {isPending ? labels.sending : labels.submit}
        </Button>
      </div>
    </form>
  )
}
