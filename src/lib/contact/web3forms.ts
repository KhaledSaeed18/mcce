import type { ContactFormValues } from "@/lib/contact/types";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface Web3FormsResponse {
  message: string;
  success: boolean;
}

export async function submitContactForm(
  values: ContactFormValues
): Promise<Web3FormsResponse> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Web3Forms access key is not configured.");
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    body: JSON.stringify({
      access_key: accessKey,
      botcheck: "",
      email: values.email.trim(),
      "h-captcha-response": values.captchaToken,
      message: values.message.trim(),
      subject: `MCCE contact: ${values.topic}`,
      topic: values.topic,
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  return (await response.json()) as Web3FormsResponse;
}
