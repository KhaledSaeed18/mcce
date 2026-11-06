import { FooterContact } from "@/components/footer/footer-contact";
import { FOOTER_COPYRIGHT, FOOTER_DISCLAIMER } from "@/config/footer";
import { formatDate } from "@/lib/drive/format";

interface LinksFooterProps {
  syncedAt: string;
}

export function LinksFooter({ syncedAt }: LinksFooterProps) {
  return (
    <footer className="text-muted-foreground flex flex-col gap-3 text-xs">
      <FooterContact />
      <p className="text-pretty">
        Last synced {formatDate(syncedAt)}. {FOOTER_COPYRIGHT} ·{" "}
        {FOOTER_DISCLAIMER}
      </p>
    </footer>
  );
}
