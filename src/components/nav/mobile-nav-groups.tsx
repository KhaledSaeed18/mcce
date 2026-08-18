import { MobileNavGroup } from "@/components/nav/mobile-nav-group";
import { NAV_GROUPS } from "@/config/navigation";
import { useNavAccordion } from "@/hooks/use-nav-accordion";

interface MobileNavGroupsProps {
  onNavigate: () => void;
}

export function MobileNavGroups({ onNavigate }: MobileNavGroupsProps) {
  const { activeGroupValue, expandedValue, toggleGroup } = useNavAccordion();

  return (
    <ul className="flex flex-col border-t-2">
      {NAV_GROUPS.map((group, index) => (
        <MobileNavGroup
          group={group}
          index={index}
          isActive={activeGroupValue === group.value}
          isExpanded={expandedValue === group.value}
          key={group.value}
          onNavigate={onNavigate}
          onToggle={toggleGroup}
        />
      ))}
    </ul>
  );
}
