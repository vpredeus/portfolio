export interface PortfolioContent {
  profile: {
    name: string;
    introduction: string;
    email: string;
    links: { label: string; url: string }[];
  };
  about: { paragraphs: string[]; education: string };
  projects: {
    id: string;
    title: string;
    category: string;
    description: string;
    contribution: string;
    url: string;
    order: number;
    published: boolean;
  }[];
  studies: {
    id: string;
    type: string;
    title: string;
    description: string;
    url?: string;
    order: number;
    published: boolean;
  }[];
  contact: { message: string; resumeUrl: string };
}
