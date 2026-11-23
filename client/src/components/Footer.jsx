import { ArrowUpRight } from "lucide-react";

export default function Footer({ name }) {
  return (
    <footer className="site-footer content-width">
      <a className="footer-brand" href="#home">prashant<span>.</span>dev</a>
      <p>© {new Date().getFullYear()} {name} <span>·</span> Software Engineer &amp; AI Enthusiast</p>
      <a className="back-to-top" href="#home">Back to top <ArrowUpRight aria-hidden="true" /></a>
    </footer>
  );
}
