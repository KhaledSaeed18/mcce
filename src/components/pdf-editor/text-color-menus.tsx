import { BaselineIcon, PaintBucketIcon } from "lucide-react";
import { useCallback } from "react";
import { TextInkPicker } from "@/components/pdf-editor/text-ink-picker";
import { TextInkTrigger } from "@/components/pdf-editor/text-ink-trigger";
import { TextToolbarMenu } from "@/components/pdf-editor/text-toolbar-menu";
import { TEXT_COLORS, TEXT_FILLS } from "@/config/pdf-editor";
import type { TextToolbarMenus } from "@/hooks/use-text-toolbar-menus";
import type { TextStyle } from "@/lib/pdf-editor/types";

interface TextColorMenusProps {
  background: string | undefined;
  color: string;
  menus: TextToolbarMenus;
  onRestyle: (style: Partial<TextStyle>) => void;
}

/** The text's own color, and the fill that can sit behind it. */
export function TextColorMenus({
  background,
  color,
  menus,
  onRestyle,
}: TextColorMenusProps) {
  const { close } = menus;
  const handleColor = useCallback(
    (next: string) => onRestyle({ color: next }),
    [onRestyle]
  );
  const handleFill = useCallback(
    (next: string) => onRestyle({ background: next }),
    [onRestyle]
  );
  const handleClearFill = useCallback(() => {
    onRestyle({ background: undefined });
    close();
  }, [close, onRestyle]);

  return (
    <>
      <TextToolbarMenu
        id="color"
        label="Text color"
        menus={menus}
        trigger={<TextInkTrigger color={color} icon={BaselineIcon} />}
      >
        <TextInkPicker
          colors={TEXT_COLORS}
          onPick={handleColor}
          value={color}
        />
      </TextToolbarMenu>
      <TextToolbarMenu
        id="fill"
        label="Fill behind the text"
        menus={menus}
        trigger={<TextInkTrigger color={background} icon={PaintBucketIcon} />}
      >
        <TextInkPicker
          colors={TEXT_FILLS}
          onClear={handleClearFill}
          onPick={handleFill}
          value={background}
        />
      </TextToolbarMenu>
    </>
  );
}
