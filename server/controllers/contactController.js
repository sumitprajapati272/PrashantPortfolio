const nodemailer = require("nodemailer");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;
const SUBJECTS = ["General Inquiry", "Job Opportunity", "Freelance Project", "Collaboration", "Other"];

const clean = (value, max) => (typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");

/** SMTP settings come only from environment variables; nothing is hard-coded or sent to the browser. */
function getMailConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) return null;
  const port = Number(SMTP_PORT) || 587;
  return {
    transport: { host: SMTP_HOST, port, secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } },
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL || SMTP_USER,
  };
}

function validate(body = {}) {
  const values = {
    name: clean(body.name, 100),
    email: clean(body.email, 150),
    phone: clean(body.phone, 20),
    subject: clean(body.subject, 60),
    message: typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "",
  };
  const errors = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !PHONE_PATTERN.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (!SUBJECTS.includes(values.subject)) errors.subject = "Please choose a subject.";
  if (values.message.length < 10) errors.message = "Please write a message of at least 10 characters.";
  return { values, errors };
}

async function sendContactMessage(req, res, next) {
  try {
    // Hidden honeypot field: real visitors leave it empty. Pretend success to bots without sending anything.
    if (req.body && req.body.website) return res.status(201).json({ ok: true });

    const { values, errors } = validate(req.body);
    if (Object.keys(errors).length) return res.status(400).json({ error: "Please check the highlighted fields.", errors });

    const config = getMailConfig();
    if (!config) {
      return res.status(503).json({ error: "Message delivery isn't configured on the server yet, so your message was not sent." });
    }

    const transporter = nodemailer.createTransport(config.transport);
    await transporter.sendMail({
      from: `"Portfolio contact form" <${config.from}>`,
      to: config.to,
      replyTo: `"${values.name.replace(/"/g, "")}" <${values.email}>`,
      subject: `[Portfolio] ${values.subject} — ${values.name}`,
      text: [`Name: ${values.name}`, `Email: ${values.email}`, `Phone: ${values.phone || "—"}`, `Subject: ${values.subject}`, "", values.message].join("\n"),
    });
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error.message);
    return res.status(502).json({ error: "The message could not be delivered right now. Please try again later." });
  }
}

module.exports = { sendContactMessage };
