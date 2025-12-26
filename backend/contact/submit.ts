import { api } from "encore.dev/api";
import db from "../db";

export interface SubmitContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface SubmitContactResponse {
  success: boolean;
  message: string;
}

// Submits a contact form message.
export const submit = api<SubmitContactRequest, SubmitContactResponse>(
  { expose: true, method: "POST", path: "/contact/submit" },
  async (req) => {
    await db.exec`
      INSERT INTO contacts (name, email, message)
      VALUES (${req.name}, ${req.email}, ${req.message})
    `;

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  }
);
