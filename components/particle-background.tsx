"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  pulse: number
  pulseSpeed: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  const createParticles = useCallback((width: number, height: number) => {
    const count = Math.min(120, Math.floor((width * height) / 15000))
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "#00f0ff" : "#ff00ff",
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = createParticles(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(0, 240, 255, 0.03)"
      ctx.lineWidth = 0.5
      const spacing = 60
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      ctx.fillStyle = "#050510"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid()

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / 200)
        const currentAlpha = p.alpha + influence * 0.5 + Math.sin(p.pulse) * 0.15
        const currentSize = p.size + influence * 3

        // Glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0, p.x, p.y, currentSize * 4
        )
        gradient.addColorStop(0, p.color.replace(")", `, ${currentAlpha})`).replace("rgb", "rgba").replace("#00f0ff", "rgba(0,240,255").replace("#ff00ff", "rgba(255,0,255"))

        // Simplified glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2)
        ctx.fillStyle =
          p.color === "#00f0ff"
            ? `rgba(0,240,255,${currentAlpha * 0.15})`
            : `rgba(255,0,255,${currentAlpha * 0.15})`
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle =
          p.color === "#00f0ff"
            ? `rgba(0,240,255,${currentAlpha})`
            : `rgba(255,0,255,${currentAlpha})`
        ctx.fill()

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cdx = p.x - p2.x
          const cdy = p.y - p2.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cdist < 150) {
            const lineAlpha = (1 - cdist / 150) * 0.15
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle =
              p.color === "#00f0ff"
                ? `rgba(0,240,255,${lineAlpha})`
                : `rgba(255,0,255,${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [createParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  )
}
