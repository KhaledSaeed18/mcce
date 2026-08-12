import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

export function FaqCta() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <Card>
        <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">Question not covered here?</p>
          <Link
            className="inline-flex items-center gap-1.5 font-head text-sm underline underline-offset-2 hover:text-primary"
            to="/contact"
          >
            Contact
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
