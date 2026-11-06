import { CheckIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LINKS_SHARE_COPIED_LABEL,
  LINKS_SHARE_FAILED_LABEL,
  LINKS_SHARE_LABEL,
  LINKS_SHARE_TITLE,
  LINKS_URL,
} from "@/config/links";
import { useLinksShare } from "@/hooks/use-links-share";

export function LinksShareButton() {
  const { hasFailed, isCopied, share } = useLinksShare({
    title: LINKS_SHARE_TITLE,
    url: LINKS_URL,
  });

  let label = LINKS_SHARE_LABEL;
  if (isCopied) {
    label = LINKS_SHARE_COPIED_LABEL;
  } else if (hasFailed) {
    label = LINKS_SHARE_FAILED_LABEL;
  }

  return (
    <Button className="h-8" onClick={share} size="sm" variant="outline">
      {isCopied ? <CheckIcon /> : <Share2Icon />}
      <span aria-live="polite">{label}</span>
    </Button>
  );
}
