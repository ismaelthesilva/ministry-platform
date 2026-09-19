"use server";

import resend from "@/lib/resend";

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<{ error?: string }> {
  const { name, email, phone, subject, message } = data;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: "ministry@ismaelsilva.org",
    replyTo: email,
    subject: `Contact: ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1e40af">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border:1px solid #e5e7eb;margin:16px 0"/>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-line">${message}</p>
      </div>
    `,
  });

  if (error) return { error: "Failed to send message. Please try again." };
  return {};
}
