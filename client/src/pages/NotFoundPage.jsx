import { ArrowUpRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main id="main" className="page-status">
      <p>This page doesn’t exist.</p>
      <a className="button button-primary" href="/">Back to portfolio <ArrowUpRight aria-hidden="true" /></a>
    </main>
  );
}
