import { useEffect, useRef } from "react";

export default function CodeRainBackground({ theme = "dawn", active = true, paused = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || paused) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const fontSize = 14;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>@#$%&*+=/?|~constletvarfunctionreturnimportexportasyncawaitreactnodeexpressmongodb";
    const charPool = characters.split("");

    let drops = [];
    let columns = 0;
    let animationFrameId = null;
    let lastFrame = 0;
    const frameGap = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * 30));
    };

    const draw = (timestamp) => {
      if (timestamp - lastFrame < frameGap) {
        animationFrameId = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      const isDawn = theme === "dawn";
      const washColor = isDawn ? "rgba(242, 247, 255, 0.1)" : "rgba(3, 7, 18, 0.08)";
      const glyphColor = isDawn ? "hsla(206, 90%, 37%, 0.35)" : "hsla(184, 86%, 53%, 0.35)";

      context.fillStyle = washColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = `${fontSize}px "Space Grotesk", monospace`;

      for (let index = 0; index < drops.length; index += 1) {
        const symbol = charPool[Math.floor(Math.random() * charPool.length)];
        const x = index * fontSize;
        const y = drops[index] * fontSize;

        context.fillStyle = glyphColor;
        context.fillText(symbol, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index] += 1;
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [active, theme, paused]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-50" aria-hidden="true" />;
}
