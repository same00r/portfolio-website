import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { contactDB } from "../db";

const resendAPIKey = secret("ResendAPIKey");

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

    await sendEmailNotification(req);

    return {
      success: true,
      id: result?.id || 0
    };
  }
);

async function sendEmailNotification(data: SubmitContactRequest): Promise<void> {
  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Project Type:</strong> ${data.project || "Not specified"}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendAPIKey()}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["samerhanna001@gmail.com"],
        subject: `New Contact Form: ${data.name}`,
        html: emailContent,
        reply_to: data.email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to send email:", error);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
