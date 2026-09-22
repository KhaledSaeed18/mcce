import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { m } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { useEntrance } from "@/hooks/use-entrance";

export function LegalQuestions() {
  const entrance = useEntrance(0.1);

  return (
    <m.div {...entrance}>
      <Card>
        <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            Anything here reads as vague? It is worth asking about, and worth
            rewriting.
          </p>
          <Link
            className="inline-flex items-center gap-1.5 font-head text-sm underline underline-offset-2 hover:text-primary"
            to="/contact"
          >
            Contact
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </m.div>
  );
}
