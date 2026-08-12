export interface ContactFormValues {
  captchaToken: string | null;
  email: string;
  message: string;
  topic: string;
}

export type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export type ContactFormStatus = "error" | "idle" | "submitting" | "success";
