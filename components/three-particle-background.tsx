'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  color: string
  size: number
}

export function ThreeParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const particleCount = 200
    const particles: Particle[] = []
    
    const colors = [
      'rgba(100, 150, 255, 0.8)', // Blue
      'rgba(150, 100, 255, 0.8)', // Purple
      'rgba(80, 200, 255, 0.8)',  // Cyan
      'rgba(120, 180, 255, 0.6)', // Light blue
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z -= particle.vz

        // Wrap around edges smoothly
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10
        if (particle.z < 0) {
          particle.z = 1000
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        // Calculate size based on depth
        const scale = 1000 / (1000 - particle.z)
        const size = particle.size * scale

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.15)'
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.globalAlpha = 1 - distance / 150
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-slate-950/60 pointer-events-none" />
      
      {/* Bottom gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/20 pointer-events-none" />
    </div>
  )
}
