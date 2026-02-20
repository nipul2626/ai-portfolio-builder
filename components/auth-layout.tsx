'use client';

import { useEffect, useRef } from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
        color: Math.random() > 0.5 ? '#00f0ff' : '#ff00ff',
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -1;
        }

        // Keep in bounds
        particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Draw connections
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `${particle.color}${Math.round((1 - distance / 150) * 50).toString(16)}`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex h-screen bg-deep-bg">
      {/* Left side - Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        {children}
      </div>

      {/* Right side - Visual showcase */}
      <div className="w-1/2 relative overflow-hidden bg-deep-surface">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Floating mockups */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-96 animate-float">
            <div className="neu-card rounded-xl p-4 h-full flex flex-col items-center justify-center">
              <div className="w-full h-12 bg-deep-bg rounded mb-4" />
              <div className="w-full space-y-3 flex-1">
                <div className="h-3 bg-deep-bg rounded w-3/4" />
                <div className="h-3 bg-deep-bg rounded" />
                <div className="h-3 bg-deep-bg rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-8 left-8 space-y-2">
          <div className="text-cyan-DEFAULT text-2xl font-bold">1,234</div>
          <div className="text-text-secondary text-sm">Portfolios created</div>
        </div>

        <div className="absolute bottom-8 right-8 space-y-2 text-right">
          <div className="text-secondary text-2xl font-bold">5,678</div>
          <div className="text-text-secondary text-sm">Users online</div>
        </div>

        {/* Tagline */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-xl text-foreground/50">Where AI Meets Your Career</p>
        </div>
      </div>
    </div>
  );
}
