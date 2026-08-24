import { Link } from "@tanstack/react-router";
import { InfoIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CCE_SCOPE_NOTE_BODY,
  CCE_SCOPE_NOTE_TITLE,
} from "@/config/cce/content";

export function CceScopeNote() {
  return (
    <Card>
      <CardContent className="flex gap-3">
        <InfoIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
        <div className="flex flex-col gap-2">
          <h2 className="font-head text-base sm:text-lg">
            {CCE_SCOPE_NOTE_TITLE}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {CCE_SCOPE_NOTE_BODY}
          </p>
          <Link
            className="w-fit text-sm underline underline-offset-2 hover:text-primary"
            to="/about"
          >
            More about this site
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
