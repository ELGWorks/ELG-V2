export type ProjectStatus = "Completed" | "In development";

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  role: string;
  aiRole: string;
  highlights: string[];
  image: string;
  techStack: string[];
  sourceUrl: string;
  siteUrl: string;
};
