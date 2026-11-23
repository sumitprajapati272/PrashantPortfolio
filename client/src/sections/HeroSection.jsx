import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero content-width" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="availability"><span className="availability-dot" /> OPEN TO OPPORTUNITIES</div>
        <p className="eyebrow hero-eyebrow">SOFTWARE ENGINEER · AI ALIGNMENT &amp; FULL-STACK</p>
        <h1 id="hero-title">Hi, I&apos;m <span className="gradient-text">Prashant.</span></h1>
        <p className="hero-subtitle">Curious mind. <span>Builder by practice.</span></p>
        <p className="hero-description">
          I build full-stack applications and evaluate generative AI systems. My recent work focused on LLM quality, alignment, and safer responses—grounded in a foundation in Computer Science &amp; Engineering.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight aria-hidden="true" /></a>
          <a className="button button-secondary" href="#about">About me <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="hero-facts" aria-label="Profile details">
          <span><GraduationCap aria-hidden="true" /> B.Tech CSE · ABES</span>
          <span><MapPin aria-hidden="true" /> Ghaziabad, India</span>
          <span><BriefcaseBusiness aria-hidden="true" /> 6 months · Ethara AI</span>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <span className="orbit orbit-large">
          <span className="orbit-dot orbit-dot-one" />
        </span>
        <span className="orbit orbit-medium">
          <span className="orbit-dot orbit-dot-two" />
        </span>
        <span className="orbit orbit-small" />
        <div className="hero-planet">
          <img
            className="hero-planet-photo"
            src="/prashant-profile.jpeg"
            alt=""
            draggable={false}
          />
        </div>
        <div className="visual-card visual-card-top">
          <span className="visual-card-icon"><Code2 aria-hidden="true" /></span>
          <span><small>FOCUS</small><strong>Full-stack engineering</strong></span>
        </div>
        <div className="visual-card visual-card-bottom">
          <span className="visual-card-pulse" />
          <span><small>BUILDING WITH</small><strong>Curiosity &amp; care</strong></span>
        </div>
        <span className="visual-caption">IDEAS INTO DIGITAL EXPERIENCES</span>
      </div>
      <a className="scroll-cue" href="#about"><ArrowDown aria-hidden="true" /><span>SCROLL TO EXPLORE</span></a>
    </section>
  );
}
