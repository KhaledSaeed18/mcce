import { motion } from "motion/react";
import { ContactBubble } from "@/components/contact/contact-bubble";
import { ContactTypingDot } from "@/components/contact/contact-typing-dot";
import {
  CONTACT_DOT_X,
  CONTACT_MARK_HEIGHT,
  CONTACT_MARK_LOOP,
  CONTACT_MARK_WIDTH,
} from "@/config/contact-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const OUTGOING = 0;
const REPLY = 1;

export function ContactConversationMark() {
  const { progress, opacity } = useLoopingProgress(CONTACT_MARK_LOOP);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${CONTACT_MARK_WIDTH} ${CONTACT_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ContactBubble index={OUTGOING} progress={progress} />

      {/* Sit outside the bubble's group so the pop does not scale them too,
       * which would make them swell rather than simply land. */}
      {CONTACT_DOT_X.map((x, index) => (
        <ContactTypingDot index={index} key={x} progress={progress} />
      ))}

      <ContactBubble index={REPLY} progress={progress} />
    </motion.svg>
  );
}
