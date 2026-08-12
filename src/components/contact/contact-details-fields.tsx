import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_FORM_TOPICS } from "@/config/contact";

const TOPIC_LABEL_BY_VALUE = new Map(
  CONTACT_FORM_TOPICS.map((topic) => [topic.value, topic.label])
);

interface ContactDetailsFieldsProps {
  disabled: boolean;
  email: string;
  emailError?: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTopicChange: (value: string | null) => void;
  topic: string;
  topicError?: string;
}

export function ContactDetailsFields({
  disabled,
  email,
  emailError,
  onEmailChange,
  onTopicChange,
  topic,
  topicError,
}: ContactDetailsFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field data-invalid={Boolean(emailError)}>
        <FieldLabel htmlFor="contact-email">Email</FieldLabel>
        <Input
          autoComplete="email"
          disabled={disabled}
          id="contact-email"
          name="email"
          onChange={onEmailChange}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
        <FieldError errors={emailError ? [{ message: emailError }] : []} />
      </Field>

      <Field data-invalid={Boolean(topicError)}>
        <FieldLabel htmlFor="contact-topic">Topic</FieldLabel>
        <Select
          disabled={disabled}
          onValueChange={onTopicChange}
          value={topic || undefined}
        >
          <SelectTrigger className="w-full" id="contact-topic">
            <SelectValue placeholder="Choose one">
              {(value: string) => TOPIC_LABEL_BY_VALUE.get(value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CONTACT_FORM_TOPICS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError errors={topicError ? [{ message: topicError }] : []} />
      </Field>
    </div>
  );
}
