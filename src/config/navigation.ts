export interface NavLink {
  label: string;
  to: "/" | "/plan-of-study" | "/about" | "/faq" | "/contact";
}

export const NAV_PAGE_LINKS: NavLink[] = [
  { label: "Plan of Study", to: "/plan-of-study" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
