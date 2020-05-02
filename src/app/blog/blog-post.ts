export interface BlogPost {
  title: string;
  description: string;
  date: string;
  route: string;
  published: boolean;
  image?: string;
  topics?: string[];
}
