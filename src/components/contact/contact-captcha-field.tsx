import HCaptcha from "@hcaptcha/react-hcaptcha";
import type { RefObject } from "react";
import { Field, FieldError } from "@/components/ui/field";
import { CONTACT_HCAPTCHA_SITE_KEY } from "@/config/contact";

interface ContactCaptchaFieldProps {
  captchaRef: RefObject<HCaptcha | null>;
  error?: string;
  onExpire: () => void;
  onVerify: (token: string) => void;
}

export function ContactCaptchaField({
  captchaRef,
  error,
  onExpire,
  onVerify,
}: ContactCaptchaFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <HCaptcha
        onExpire={onExpire}
        onVerify={onVerify}
        ref={captchaRef}
        sitekey={CONTACT_HCAPTCHA_SITE_KEY}
      />
      <FieldError errors={error ? [{ message: error }] : []} />
    </Field>
  );
}
