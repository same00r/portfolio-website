import { api } from "encore.dev/api";
import db from "../db";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
}

export interface GetProjectsResponse {
  projects: Project[];
}

// Retrieves all portfolio projects, ordered by display order.
export const getProjects = api<void, GetProjectsResponse>(
  { expose: true, method: "GET", path: "/portfolio/projects" },
  async () => {
    const rows = await db.queryAll<{
      id: number;
      title: string;
      description: string;
      image_url: string;
      project_url: string | null;
      github_url: string | null;
      technologies: string[];
    }>`
      SELECT id, title, description, image_url, project_url, github_url, technologies
      FROM projects
      ORDER BY display_order ASC
    `;

    const projects = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      imageUrl: row.image_url,
      projectUrl: row.project_url,
      githubUrl: row.github_url,
      technologies: row.technologies,
    }));

    return { projects };
  }
);
