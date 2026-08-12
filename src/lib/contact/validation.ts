import type { ContactFormErrors, ContactFormValues } from "@/lib/contact/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN_LENGTH = 10;

export function validateContactForm(
  values: ContactFormValues
): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const email = values.email.trim();
  const message = values.message.trim();

  if (!email) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email.";
  }

  if (!values.topic) {
    errors.topic = "Pick a topic.";
  }

  if (!values.captchaToken) {
    errors.captchaToken = "Complete the captcha.";
  }

  if (!message) {
    errors.message = "Write a message.";
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Say a little more, at least ${MESSAGE_MIN_LENGTH} characters.`;
  }

  return errors;
}
