import { api } from "encore.dev/api";
import db from "../db";

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export interface GetSkillsResponse {
  skills: Skill[];
}

// Retrieves all skills, ordered by display order.
export const getSkills = api<void, GetSkillsResponse>(
  { expose: true, method: "GET", path: "/portfolio/skills" },
  async () => {
    const rows = await db.queryAll<{
      id: number;
      name: string;
      category: string;
      proficiency: number;
    }>`
      SELECT id, name, category, proficiency
      FROM skills
      ORDER BY display_order ASC
    `;

    return { skills: rows };
  }
);
