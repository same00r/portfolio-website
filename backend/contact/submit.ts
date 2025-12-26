import { api } from "encore.dev/api";
import { contactDB } from "../db";

export interface SubmitContactRequest {
  name: string;
  email: string;
  project?: string;
  message: string;
}

export interface SubmitContactResponse {
  success: boolean;
  id: number;
}

export const submit = api(
  { expose: true, method: "POST", path: "/contact/submit" },
  async (req: SubmitContactRequest): Promise<SubmitContactResponse> => {
    const result = await contactDB.queryRow`
      INSERT INTO contact_messages (name, email, project, message, created_at)
      VALUES (${req.name}, ${req.email}, ${req.project || null}, ${req.message}, NOW())
      RETURNING id
    `;

    return {
      success: true,
      id: result?.id || 0
    };
  }
);
