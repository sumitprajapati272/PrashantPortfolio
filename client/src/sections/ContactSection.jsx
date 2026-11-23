import { useRef, useState } from "react";
import { Briefcase, Check, ChevronDown, Copy, LoaderCircle, Mail, MessageCircle, Phone, Send, User } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { sendContactMessage } from "../services/api.js";
import { contactInfo, contactSubjects } from "../utils/contactInfo.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;
const emptyForm = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!values.subject) errors.subject = "Please choose a subject.";
  if (values.message.trim().length < 10) errors.message = "Please write a message of at least 10 characters.";
  return errors;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    area.remove();
    return ok;
  }
}

function Field({ icon: Icon, error, id, className = "", children }) {
  return (
    <div className={`cf-field ${className}`}>
      <div className={`cf-control${error ? " has-error" : ""}`}>
        <Icon className="cf-field-icon" aria-hidden="true" />
        {children}
      </div>
      {error && <p className="cf-error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

function CopyRow({ icon: Icon, label, value, href }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const handleCopy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="ci-card">
      <span className="ci-icon"><Icon aria-hidden="true" /></span>
      <div className="ci-copy">
        <small>{label}</small>
        {href ? <a href={href}><strong>{value}</strong></a> : <strong>{value}</strong>}
      </div>
      <button className={`ci-copy-button${copied ? " is-copied" : ""}`} type="button" onClick={handleCopy} aria-label={copied ? `${label} copied` : `Copy ${label}`} title={copied ? "Copied!" : `Copy ${label}`}>
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
      <span className="visually-hidden" role="status">{copied ? `${label} copied to clipboard` : ""}</span>
    </div>
  );
}

export default function ContactSection() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.state === "sending") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ state: "idle", message: "" });
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus({ state: "sending", message: "" });
    try {
      await sendContactMessage({ ...values, name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim(), message: values.message.trim() });
      setValues(emptyForm);
      setStatus({ state: "success", message: "Thank you! Your message has been sent. I'll get back to you soon." });
    } catch (error) {
      setStatus({ state: "error", message: error.message || "Something went wrong. Please try again." });
    }
  };

  const sending = status.state === "sending";

  return (
    <section className="section content-width contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeading
        id="contact-title"
        eyebrow="LET’S CONNECT"
        title={<>Get <span className="gradient-text">in Touch</span></>}
        description="Have a question, a project idea, or an opportunity? I’d love to hear from you. Send me a message and I’ll get back to you as soon as possible."
        centered
      />

      <div className="contact-layout">
        <form className="cf-card" onSubmit={handleSubmit} noValidate aria-busy={sending}>
          <div className="cf-head">
            <Send className="cf-head-icon" aria-hidden="true" />
            <div>
              <h3>Send a Message</h3>
              <p>Fill out the form below and I’ll reach out to you.</p>
            </div>
          </div>

          <div className="cf-grid">
            <Field icon={User} error={errors.name} id="cf-name">
              <input id="cf-name" type="text" name="name" placeholder="Name *" aria-label="Name" autoComplete="name" maxLength={100} value={values.name} onChange={update("name")} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "cf-name-error" : undefined} />
            </Field>
            <Field icon={Mail} error={errors.email} id="cf-email">
              <input id="cf-email" type="email" name="email" placeholder="Email *" aria-label="Email" autoComplete="email" maxLength={150} value={values.email} onChange={update("email")} aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "cf-email-error" : undefined} />
            </Field>
            <Field icon={Phone} error={errors.phone} id="cf-phone">
              <input id="cf-phone" type="tel" name="phone" placeholder="Phone Number" aria-label="Phone number" autoComplete="tel" maxLength={20} value={values.phone} onChange={update("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "cf-phone-error" : undefined} />
            </Field>
            <Field icon={Briefcase} error={errors.subject} id="cf-subject">
              <select id="cf-subject" name="subject" aria-label="Subject" className={values.subject ? "has-value" : ""} value={values.subject} onChange={update("subject")} aria-required="true" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "cf-subject-error" : undefined}>
                <option value="" disabled>Subject *</option>
                {contactSubjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
              </select>
              <ChevronDown className="cf-chevron" aria-hidden="true" />
            </Field>
            <Field icon={MessageCircle} error={errors.message} id="cf-message" className="cf-wide cf-textarea">
              <textarea id="cf-message" name="message" rows={5} placeholder="Your Message *" aria-label="Your message" maxLength={3000} value={values.message} onChange={update("message")} aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "cf-message-error" : undefined} />
            </Field>
            {/* Honeypot: hidden from people, filled in by simple spam bots. */}
            <div className="cf-honeypot" aria-hidden="true">
              <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} /></label>
            </div>
          </div>

          <button className="cf-submit" type="submit" disabled={sending}>
            {sending ? <LoaderCircle className="cf-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            {sending ? "Sending…" : "Send Message"}
          </button>

          <div className="cf-status-region" role="status" aria-live="polite">
            {status.state === "success" && <p className="cf-status cf-status-success">{status.message}</p>}
            {status.state === "error" && (
              <p className="cf-status cf-status-error" role="alert">
                {status.message} You can also email me at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
              </p>
            )}
          </div>
        </form>

        <div className="contact-info">
          <CopyRow icon={User} label="Name" value={contactInfo.name} />
          <CopyRow icon={Phone} label="Phone Number" value={contactInfo.phone} href={contactInfo.phoneHref} />
          <CopyRow icon={Mail} label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
          <div className="ci-available">
            <p><i aria-hidden="true" />Available for Opportunities</p>
            <span>Open to full-time roles, freelance projects, and collaborations in Software Development and AI/LLM.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
