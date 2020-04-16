export interface Link {
  route: string;
  label?: string;
  icon?: string;
}

export const NAVBAR_LINKS: Link[] = [
  {
    route: '/',
    label: 'Home',
    icon: 'icon-landmark'
  },
  {
    route: '/',
    label: 'About',
    icon: 'icon-person'
  },
  {
    route: '/',
    label: 'Portfolio',
    icon: 'icon-project'
  },
  {
    route: '/',
    label: 'Blog',
    icon: 'icon-paper',
  },
  {
    route: '/',
    label: 'Contact',
    icon: 'icon-email'
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
