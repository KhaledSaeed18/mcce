import { useCallback, useState } from "react";
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
} from "@/lib/contact/types";
import { validateContactForm } from "@/lib/contact/validation";
import { submitContactForm } from "@/lib/contact/web3forms";

const INITIAL_VALUES: ContactFormValues = {
  email: "",
  message: "",
  topic: "",
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const setField = useCallback(
    <K extends keyof ContactFormValues>(
      field: K,
      value: ContactFormValues[K]
    ) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setField("email", event.target.value),
    [setField]
  );

  const handleTopicChange = useCallback(
    (value: string | null) => setField("topic", value ?? ""),
    [setField]
  );

  const handleMessageChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setField("message", event.target.value),
    [setField]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErrors = validateContactForm(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("submitting");

      try {
        const result = await submitContactForm(values);
        if (result.success) {
          setStatus("success");
          setValues(INITIAL_VALUES);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [values]
  );

  return {
    errors,
    handleEmailChange,
    handleMessageChange,
    handleSubmit,
    handleTopicChange,
    status,
    values,
  };
}
