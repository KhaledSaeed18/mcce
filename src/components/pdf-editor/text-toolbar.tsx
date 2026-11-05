import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CopyIcon,
  ItalicIcon,
  type LucideIcon,
  PencilIcon,
  Trash2Icon,
  UnderlineIcon,
} from "lucide-react";
import { type RefObject, useCallback, useRef } from "react";
import { TextAlignButton } from "@/components/pdf-editor/text-align-button";
import { TextColorMenus } from "@/components/pdf-editor/text-color-menus";
import { TextFontMenu } from "@/components/pdf-editor/text-font-menu";
import { TextFormatToggle } from "@/components/pdf-editor/text-format-toggle";
import { TextSizeControl } from "@/components/pdf-editor/text-size-control";
import { TextToolbarButton } from "@/components/pdf-editor/text-toolbar-button";
import { Separator } from "@/components/ui/separator";
import { TEXT_CONTROLS_ATTRIBUTE } from "@/config/pdf-editor";
import { useMarkupToolbarPosition } from "@/hooks/use-markup-toolbar-position";
import { useTextToolbarMenus } from "@/hooks/use-text-toolbar-menus";
import type { TextAlign, TextStyle } from "@/lib/pdf-editor/types";

const ALIGNMENTS: ReadonlyArray<{
  icon: LucideIcon;
  label: string;
  value: TextAlign;
}> = [
  { icon: AlignLeftIcon, label: "Align left", value: "left" },
  { icon: AlignCenterIcon, label: "Align center", value: "center" },
  { icon: AlignRightIcon, label: "Align right", value: "right" },
];

const CONTROLS_MARKER = { [TEXT_CONTROLS_ATTRIBUTE]: "" };
const SEPARATOR_CLASS = "mx-0.5 h-5";

interface TextToolbarProps {
  isEditing: boolean;
  onDuplicate: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onRestyle: (style: Partial<TextStyle>) => void;
  scrollRef: RefObject<HTMLElement | null>;
  style: TextStyle;
}

/** Everything about the text in hand, right beside it. */
export function TextToolbar({
  isEditing,
  onDuplicate,
  onEdit,
  onRemove,
  onRestyle,
  scrollRef,
  style,
}: TextToolbarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const menus = useTextToolbarMenus(barRef);
  useMarkupToolbarPosition(barRef, scrollRef);
  const handleSize = useCallback(
    (fontSize: number) => onRestyle({ fontSize }),
    [onRestyle]
  );

  return (
    <div
      {...CONTROLS_MARKER}
      aria-label="Text style"
      className="bg-card invisible fixed top-0 left-0 z-30 flex items-center gap-0.5 rounded border-2 p-1 shadow-md"
      ref={barRef}
      role="toolbar"
    >
      <TextFontMenu
        menus={menus}
        onRestyle={onRestyle}
        value={style.fontFamily ?? "sans"}
      />
      <TextSizeControl onChange={handleSize} value={style.fontSize} />
      <Separator className={SEPARATOR_CLASS} orientation="vertical" />
      <TextFormatToggle
        field="bold"
        icon={BoldIcon}
        label="Bold"
        onRestyle={onRestyle}
        style={style}
      />
      <TextFormatToggle
        field="italic"
        icon={ItalicIcon}
        label="Italic"
        onRestyle={onRestyle}
        style={style}
      />
      <TextFormatToggle
        field="underline"
        icon={UnderlineIcon}
        label="Underline"
        onRestyle={onRestyle}
        style={style}
      />
      <Separator className={SEPARATOR_CLASS} orientation="vertical" />
      {ALIGNMENTS.map(({ icon, label, value }) => (
        <TextAlignButton
          align={value}
          icon={icon}
          isActive={(style.align ?? "left") === value}
          key={value}
          label={label}
          onRestyle={onRestyle}
        />
      ))}
      <Separator className={SEPARATOR_CLASS} orientation="vertical" />
      <TextColorMenus
        background={style.background}
        color={style.color}
        menus={menus}
        onRestyle={onRestyle}
      />
      <Separator className={SEPARATOR_CLASS} orientation="vertical" />
      {isEditing ? null : (
        <>
          <TextToolbarButton
            icon={PencilIcon}
            label="Edit text"
            onClick={onEdit}
          />
          <TextToolbarButton
            icon={CopyIcon}
            label="Duplicate"
            onClick={onDuplicate}
          />
        </>
      )}
      <TextToolbarButton icon={Trash2Icon} label="Delete" onClick={onRemove} />
    </div>
  );
}
