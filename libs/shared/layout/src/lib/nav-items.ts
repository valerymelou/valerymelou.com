export type NavItem = {
  label: string;
  path: string;
  exact?: boolean;
};

export const LAYOUT_NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'About', path: '/', exact: true },
  { label: 'Projects', path: '/projects' },
  { label: 'Articles', path: '/blog' },
] as const;
