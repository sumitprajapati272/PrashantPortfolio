const { Resend } = require("resend");
const supabase = require("../config/supabase");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;

const SUBJECTS = [
  "General Inquiry",
  "Job Opportunity",
  "Freelance Project",
  "Collaboration",
  "Other",
];

const clean = (value, max) =>
  typeof value === "string"
    ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max)
    : "";

function validate(body = {}) {
  const values = {
    name: clean(body.name, 100),
    email: clean(body.email, 150),
    phone: clean(body.phone, 20),
    subject: clean(body.subject, 60),
    message:
      typeof body.message === "string"
        ? body.message.trim().slice(0, 3000)
        : "",
  };

  const errors = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (values.phone && !PHONE_PATTERN.test(values.phone))
    errors.phone = "Please enter a valid phone number.";
  if (!SUBJECTS.includes(values.subject))
    errors.subject = "Please choose a subject.";
  if (values.message.length < 10)
    errors.message = "Please write a message of at least 10 characters.";

  return { values, errors };
}

async function sendContactMessage(req, res) {
  try {
    if (req.body && req.body.website) {
      return res.status(201).json({ ok: true });
    }

    const { values, errors } = validate(req.body);

    if (Object.keys(errors).length) {
      return res.status(400).json({
        error: "Please check the highlighted fields.",
        errors,
      });
    }

    // 1. Save contact message in Supabase
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([{
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        subject: values.subject,
        message: values.message,
      }]);

    if (dbError) {
      console.error("Supabase save failed:", dbError.message);
      return res.status(500).json({
        error: "Unable to save your message. Please try again.",
      });
    }

    // 2. Send email notification through Resend
    if (process.env.RESEND_API_KEY &&
        process.env.RESEND_FROM_EMAIL &&
        process.env.CONTACT_TO_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error: emailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.CONTACT_TO_EMAIL,
          replyTo: values.email,
          subject: `[Portfolio] ${values.subject} — ${values.name}`,
          text: [
            `Name: ${values.name}`,
            `Email: ${values.email}`,
            `Phone: ${values.phone || "—"}`,
            `Subject: ${values.subject}`,
            "",
            values.message,
          ].join("\n"),
        });

        if (emailError) {
          console.error("Resend email failed:", emailError);
        }
      } catch (emailError) {
        console.error("Resend error:", emailError.message);
      }
    }

    return res.status(201).json({
      ok: true,
      message: "Your message has been saved successfully.",
    });

  } catch (error) {
    console.error("Contact form error:", error.message);

    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
}

module.exports = { sendContactMessage };