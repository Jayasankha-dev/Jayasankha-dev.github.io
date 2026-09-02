import React, { useEffect, useRef } from 'react';
import { ThemeVariant } from '../types';

interface CyberMatrixCanvasProps {
  theme: ThemeVariant;
  interactive?: boolean;
}

export const CyberMatrixCanvas: React.FC<CyberMatrixCanvasProps> = ({ theme, interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for constellation
    const particleCount = Math.min(Math.floor(width / 22), 70);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // Matrix rain characters
    const chars = '01010101ABCDEF0123456789XYZ_>#%';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const getColors = () => {
      switch (theme) {
        case 'cyan':
          return {
            primary: 'rgba(0, 229, 255, ',
            glow: '#00e5ff',
          };
        case 'crimson':
          return {
            primary: 'rgba(255, 0, 60, ',
            glow: '#ff003c',
          };
        case 'amber':
          return {
            primary: 'rgba(255, 184, 0, ',
            glow: '#ffb800',
          };
        case 'matrix':
        default:
          return {
            primary: 'rgba(0, 255, 65, ',
            glow: '#00ff41',
          };
      }
    };

    let frameCount = 0;

    const render = () => {
      frameCount++;
      const { primary } = getColors();

      // Clear with subtle trail
      ctx.fillStyle = 'rgba(2, 6, 3, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Render Matrix rain drops on lower opacity
      if (frameCount % 2 === 0) {
        ctx.font = `${fontSize}px 'Fira Code', monospace`;
        for (let i = 0; i < drops.length; i++) {
          if (Math.random() > 0.3) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Faint matrix characters
            ctx.fillStyle = primary + '0.12)';
            ctx.fillText(text, x, y);

            if (y > height && Math.random() > 0.985) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }
      }

      // Render Constellation particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse avoidance/attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = primary + p.alpha + ')';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = primary + (0.15 * (1 - dist2 / 120)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
