import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!glow || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let trailX = 0;
    let trailY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      trailX += (targetX - trailX) * 0.08;
      trailY += (targetY - trailY) * 0.08;

      glow.style.setProperty("--cursor-x", `${currentX}px`);
      glow.style.setProperty("--cursor-y", `${currentY}px`);
      glow.style.setProperty("--trail-x", `${trailX}px`);
      glow.style.setProperty("--trail-y", `${trailY}px`);

      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2 || Math.abs(targetX - trailX) > 0.2 || Math.abs(targetY - trailY) > 0.2) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

      targetX = event.clientX;
      targetY = event.clientY;
      if (!glow.dataset.active || glow.dataset.active !== "true") {
        currentX = targetX;
        currentY = targetY;
        trailX = targetX;
        trailY = targetY;
        glow.dataset.active = "true";
      }
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const hideGlow = () => {
      glow.dataset.active = "false";
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const handlePointerOut = (event) => {
      if (!event.relatedTarget) hideGlow();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", hideGlow);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", hideGlow);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" data-active="false" aria-hidden="true" />;
}
