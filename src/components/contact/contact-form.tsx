import { SendIcon } from "lucide-react";
import { motion } from "motion/react";
import { ContactCaptchaField } from "@/components/contact/contact-captcha-field";
import { ContactDetailsFields } from "@/components/contact/contact-details-fields";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/hooks/use-contact-form";

export function ContactForm() {
  const {
    captchaRef,
    errors,
    handleCaptchaExpire,
    handleCaptchaVerify,
    handleEmailChange,
    handleMessageChange,
    handleSubmit,
    handleTopicChange,
    status,
    values,
  } = useContactForm();
  const isSubmitting = status === "submitting";

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col gap-5 rounded border-2 bg-card p-5 shadow-md sm:p-8"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.05, duration: 0.4 }}
    >
      <Badge
        className="absolute -top-3 left-5 rotate-[-3deg]"
        variant="secondary"
      >
        WRITE IT HERE
      </Badge>

      <div className="flex flex-col gap-2 pt-2">
        <h2 className="font-head text-xl sm:text-2xl">Send a message</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Pick a topic, leave your email, and I will get back to you.
        </p>
      </div>

      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <ContactDetailsFields
          disabled={isSubmitting}
          email={values.email}
          emailError={errors.email}
          onEmailChange={handleEmailChange}
          onTopicChange={handleTopicChange}
          topic={values.topic}
          topicError={errors.topic}
        />

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            disabled={isSubmitting}
            id="contact-message"
            name="message"
            onChange={handleMessageChange}
            placeholder="What's on your mind?"
            rows={5}
            value={values.message}
          />
          <FieldError
            errors={errors.message ? [{ message: errors.message }] : []}
          />
        </Field>

        <ContactCaptchaField
          captchaRef={captchaRef}
          error={errors.captchaToken}
          onExpire={handleCaptchaExpire}
          onVerify={handleCaptchaVerify}
        />

        <input
          aria-hidden="true"
          autoComplete="off"
          className="hidden"
          name="botcheck"
          tabIndex={-1}
          type="text"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Sending" : "Send message"}
            <SendIcon data-icon="inline-end" />
          </Button>

          {status === "success" && (
            <span className="text-primary text-sm">
              Message sent. Thanks for reaching out.
            </span>
          )}
          {status === "error" && (
            <span className="text-destructive text-sm">
              Something went wrong. Email works too.
            </span>
          )}
        </div>
      </form>
    </motion.section>
  );
}
