"use client"

import { useEffect, useState, useRef } from "react"
import { Play, ChevronDown } from "lucide-react"

export function HeroSection() {
  const [visibleChars, setVisibleChars] = useState(0)
  const [showSubline, setShowSubline] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [showMockup, setShowMockup] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const headline = "Build Your Dream Portfolio in Minutes"
  const mockupRef = useRef<HTMLDivElement>(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= headline.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 35)
    return () => clearInterval(interval)
  }, [headline.length])

  useEffect(() => {
    if (visibleChars >= headline.length) {
      setTimeout(() => setShowSubline(true), 300)
      setTimeout(() => setShowCTA(true), 600)
      setTimeout(() => setShowMockup(true), 900)
      setTimeout(() => setShowScroll(true), 2000)
    }
  }, [visibleChars, headline.length])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      setMouseOffset({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-[#050510]/40 backdrop-blur-[2px]" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-2xl">
          {/* Headline */}
          <h1 className="font-heading text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">
              {headline.slice(0, visibleChars)}
            </span>
            <span
              className="inline-block w-[3px] h-[1em] bg-[#00f0ff] align-middle ml-1"
              style={{
                opacity: visibleChars < headline.length ? 1 : 0,
                animation: "pulse-glow 1s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </h1>

          {/* Subheadline */}
          <p
            className={`mt-6 font-sub text-lg text-[#a0a0b8] sm:text-xl lg:text-2xl transition-all duration-700 ${
              showSubline
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            AI-Powered. Recruiter-Ready. Zero Coding Required.
          </p>

          {/* CTA buttons */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 ${
              showCTA
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <button
              className="group relative rounded-xl px-8 py-4 font-heading text-sm font-bold tracking-wide text-[#0a0a0f] transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #00c4cc)",
                boxShadow:
                  "0 0 20px rgba(0,240,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <span className="relative z-10">Start Creating Free</span>
              <span
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, #00f0ff, #00d4ff, #00f0ff)",
                  boxShadow: "0 0 40px rgba(0,240,255,0.5)",
                }}
                aria-hidden="true"
              />
            </button>

            <button className="group flex items-center gap-3 rounded-xl border border-[#00f0ff]/30 px-8 py-4 font-heading text-sm font-bold tracking-wide text-[#00f0ff] transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#00f0ff]/50 transition-all duration-300 group-hover:border-[#00f0ff]">
                <Play className="h-3 w-3 fill-[#00f0ff] text-[#00f0ff]" />
                <span
                  className="absolute inset-0 rounded-full border border-[#00f0ff]/20 animate-ping"
                  aria-hidden="true"
                />
              </span>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right: Floating mockup cards */}
        <div
          ref={mockupRef}
          className={`relative mt-12 lg:mt-0 transition-all duration-1000 ${
            showMockup
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            perspective: "1000px",
            transform: `rotateY(${mouseOffset.x * 3}deg) rotateX(${-mouseOffset.y * 3}deg)`,
          }}
        >
          <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px]">
            {/* Card 3 (back) */}
            <div
              className="absolute rounded-2xl neu-card overflow-hidden"
              style={{
                width: "100%",
                height: "85%",
                top: "0",
                left: "30px",
                transform: `translateZ(-60px) rotateY(-5deg)`,
                boxShadow: "0 0 20px rgba(255,0,255,0.15), 8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)",
                opacity: 0.5,
              }}
            >
              <div className="h-full w-full bg-gradient-to-br from-[#1a1a24] to-[#12121a] p-4">
                <div className="h-3 w-16 rounded bg-[#ff00ff]/20 mb-3" />
                <div className="h-2 w-full rounded bg-[#ffffff]/5 mb-2" />
                <div className="h-2 w-3/4 rounded bg-[#ffffff]/5 mb-4" />
                <div className="h-24 w-full rounded-lg bg-[#ff00ff]/5" />
              </div>
            </div>

            {/* Card 2 (middle) */}
            <div
              className="absolute rounded-2xl neu-card overflow-hidden"
              style={{
                width: "100%",
                height: "85%",
                top: "15px",
                left: "15px",
                transform: `translateZ(-30px) rotateY(-2deg)`,
                boxShadow: "0 0 20px rgba(0,240,255,0.1), 8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)",
                opacity: 0.7,
              }}
            >
              <div className="h-full w-full bg-gradient-to-br from-[#1a1a24] to-[#12121a] p-4">
                <div className="h-3 w-20 rounded bg-[#00f0ff]/20 mb-3" />
                <div className="h-2 w-full rounded bg-[#ffffff]/5 mb-2" />
                <div className="h-2 w-2/3 rounded bg-[#ffffff]/5 mb-4" />
                <div className="h-28 w-full rounded-lg bg-[#00f0ff]/5" />
              </div>
            </div>

            {/* Card 1 (front) */}
            <div
              className="absolute rounded-2xl neu-card overflow-hidden animate-float-slow"
              style={{
                width: "100%",
                height: "85%",
                top: "30px",
                left: "0",
                boxShadow: "0 0 30px rgba(0,240,255,0.2), 8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,240,255,0.15)",
              }}
            >
              <div className="h-full w-full bg-gradient-to-br from-[#1a1a24] to-[#12121a] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00ff]" />
                  <div>
                    <div className="h-2.5 w-20 rounded bg-[#ffffff]/20" />
                    <div className="mt-1 h-2 w-14 rounded bg-[#ffffff]/10" />
                  </div>
                </div>
                <div className="h-2 w-full rounded bg-[#ffffff]/8 mb-2" />
                <div className="h-2 w-4/5 rounded bg-[#ffffff]/8 mb-4" />
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="h-16 rounded-lg bg-[#00f0ff]/8 border border-[#00f0ff]/10" />
                  <div className="h-16 rounded-lg bg-[#ff00ff]/8 border border-[#ff00ff]/10" />
                </div>
                <div className="h-20 w-full rounded-lg bg-gradient-to-r from-[#00f0ff]/5 to-[#ff00ff]/5 border border-[#ffffff]/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${
          showScroll ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs font-sub text-[#a0a0b8]/60 tracking-widest uppercase">
          Scroll to explore
        </span>
        <ChevronDown className="h-5 w-5 text-[#00f0ff]/50 animate-scroll-bounce" />
      </div>
    </section>
  )
}
