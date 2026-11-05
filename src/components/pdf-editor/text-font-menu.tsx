import { useCallback } from "react";
import { TextFontOption } from "@/components/pdf-editor/text-font-option";
import { TextToolbarMenu } from "@/components/pdf-editor/text-toolbar-menu";
import { TEXT_FONT_FAMILIES, TEXT_FONTS } from "@/config/pdf-editor";
import type { TextToolbarMenus } from "@/hooks/use-text-toolbar-menus";
import type { TextFontFamily, TextStyle } from "@/lib/pdf-editor/types";

interface TextFontMenuProps {
  menus: TextToolbarMenus;
  onRestyle: (style: Partial<TextStyle>) => void;
  value: TextFontFamily;
}

export function TextFontMenu({ menus, onRestyle, value }: TextFontMenuProps) {
  const { close } = menus;
  const handlePick = useCallback(
    (fontFamily: TextFontFamily) => {
      onRestyle({ fontFamily });
      close();
    },
    [close, onRestyle]
  );

  return (
    <TextToolbarMenu
      id="font"
      label="Font"
      menus={menus}
      trigger={
        <span
          className="w-10 text-left"
          style={{ fontFamily: TEXT_FONTS[value].stack }}
        >
          {TEXT_FONTS[value].label}
        </span>
      }
    >
      <div className="flex w-28 flex-col gap-0.5">
        {TEXT_FONT_FAMILIES.map((family) => (
          <TextFontOption
            family={family}
            isActive={family === value}
            key={family}
            onPick={handlePick}
          />
        ))}
      </div>
    </TextToolbarMenu>
  );
}
