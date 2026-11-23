import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let stars = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 6100));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.15 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
        color: Math.random() < 0.55 ? "222, 237, 255" : "115, 190, 255",
      }));
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach((star) => {
        const opacity = reducedMotion ? 0.52 : 0.24 + (Math.sin(time * 0.001 * star.speed + star.phase) + 1) * 0.23;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${star.color}, ${opacity})`;
        context.shadowColor = star.radius > 1 ? `rgba(${star.color}, 0.58)` : "transparent";
        context.shadowBlur = star.radius > 1 ? 4 : 0;
        context.fill();
        context.shadowBlur = 0;
      });
      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    const handleResize = () => {
      window.cancelAnimationFrame(frame);
      resize();
      draw();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
