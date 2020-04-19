export interface Link {
  route: string;
  label?: string;
  icon?: string;
  exactMatch?: boolean;
}

export const NAVBAR_LINKS: Link[] = [
  {
    route: '/',
    label: 'Home',
    icon: 'icon-landmark',
    exactMatch: true
  },
  {
    route: '/about',
    label: 'About',
    icon: 'icon-person',
    exactMatch: true,
  },
  {
    route: '/',
    label: 'Portfolio',
    icon: 'icon-project',
    exactMatch: true
  },
  {
    route: '/',
    label: 'Blog',
    icon: 'icon-paper',
    exactMatch: true
  },
  {
    route: '/',
    label: 'Contact',
    icon: 'icon-email',
    exactMatch: true
  }
];

export const SOCIAL_LINKS: Link[] = [
  {
    route: 'https://github.com/valerymelou',
    label: 'See my work on GitHub',
    icon: 'icon-github'
  },
  {
    route: 'https://gitlab.com/valerymelou',
    label: 'See my work on GitLab',
    icon: 'icon-gitlab'
  },
  {
    route: 'https://twitter.com/valerymelou',
    label: 'Follow me on Twitter',
    icon: 'icon-twitter'
  },
  {
    route: 'https://linkedin.com/in/valerymelou',
    label: 'Let\'s connect on Linkedin',
    icon: 'icon-linkedin'
  }
];
