import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({
  email,
  url,
}: {
  email: string;
  url: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "CashFlow <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      html: `
        <p>Welcome to CashFlow 👋</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${url}">Verify Email</a>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
    } else {
      console.log("Resend success:", data);
    }
  } catch (error) {
    console.error("Resend exception:", error);
  }
}
