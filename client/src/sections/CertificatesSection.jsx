import SectionHeading from "../components/SectionHeading.jsx";

export default function CertificatesSection({ certificates }) {
  return (
    <section className="section content-width" id="certificates" aria-labelledby="certificates-title">
      <SectionHeading
        id="certificates-title"
        eyebrow="CERTIFICATES"
        title={<>Learning, <span className="gradient-text">recognized.</span></>}
        description="Credentials listed in the portfolio source. Original certificate files were not included in the uploaded ZIP."
      />
      <div className="certificate-grid">
        {certificates.map((certificate, index) => (
          <article className="certificate-card" key={certificate.title}>
            <span className={`certificate-mark${index === certificates.length - 1 ? " certificate-mark-violet" : ""}`} aria-hidden="true">{certificate.mark}</span>
            <span className="certificate-copy">
              <span className="certificate-issuer">{certificate.issuer}</span>
              <strong>{certificate.title}</strong>
              <span className="certificate-detail">{certificate.detail}</span>
            </span>
            <span className="certificate-file-note">File not supplied</span>
          </article>
        ))}
      </div>
    </section>
  );
}
