// Vercel Serverless Function — POST /api/contact
// Sends contact form submissions to your Gmail inbox via SMTP.

import nodemailer from 'nodemailer';

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name = '', email = '', message = '', website = '' } = req.body || {};

    // Honeypot: real users never fill a hidden field. Bots do.
    // Return 200 so the bot thinks it worked and doesn't retry.
    if (website) {
      return res.status(200).json({ success: true, message: 'Message sent' });
    }

    const clean = {
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim()
    };

    if (!clean.name || !clean.email || !clean.message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (!EMAIL_RE.test(clean.email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    for (const [field, max] of Object.entries(MAX_LENGTHS)) {
      if (clean[field].length > max) {
        return res.status(400).json({ success: false, message: `${field} is too long.` });
      }
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars');
      return res.status(500).json({ success: false, message: 'Server is not configured to send mail.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: user,
      replyTo: `"${clean.name}" <${clean.email}>`,
      subject: `Portfolio message from ${clean.name}`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}\n\n${clean.message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0f131f;padding:20px;border-radius:8px 8px 0 0;">
            <h2 style="color:#00ff99;margin:0;font-size:18px;">New portfolio message</h2>
          </div>
          <div style="border:1px solid #e5e5e5;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
            <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(clean.name)}</p>
            <p style="margin:0 0 16px;"><strong>Email:</strong>
              <a href="mailto:${escapeHtml(clean.email)}">${escapeHtml(clean.email)}</a></p>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;">
            <p style="white-space:pre-wrap;margin:0;line-height:1.6;">${escapeHtml(clean.message)}</p>
          </div>
        </div>`
    });

    return res.status(200).json({ success: true, message: 'Message sent' });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ success: false, message: 'Could not send message. Please try again.' });
  }
}