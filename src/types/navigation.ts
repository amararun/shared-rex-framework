// Create a types file for better organization
export type NavigationItem = {
  title: string;
  items?: {
    title: string;
    description: string;
    href: string;
    helpContentId: string; // Maps to markdown files
  }[];
  href?: string;
} 