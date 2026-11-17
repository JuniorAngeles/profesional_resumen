import { z } from "zod"

import type { Dictionary } from "@/lib/i18n"

export function createContactSchema(messages: Dictionary["contact"]["validation"]) {
  return z.object({
    name: z.string().trim().min(2, messages.nameTooShort).max(80, messages.nameTooLong),
    email: z.email(messages.emailInvalid),
    message: z.string().trim().min(10, messages.messageTooShort).max(2000, messages.messageTooLong),
  })
}

export type ContactField = keyof z.infer<ReturnType<typeof createContactSchema>>

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Partial<Record<ContactField, string>>
  values?: Partial<Record<ContactField, string>>
}

export const initialContactState: ContactFormState = { status: "idle", message: "" }
