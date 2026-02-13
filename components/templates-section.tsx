"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

const templates = [
  {
    name: "Minimal Pro",
    style: "Clean & Modern",
    accent: "#00f0ff",
    bgGrad: "from-[#0d1117] to-[#161b22]",
  },
  {
    name: "Creative Studio",
    style: "Bold & Artistic",
    accent: "#ff00ff",
    bgGrad: "from-[#1a0a1e] to-[#12121a]",
  },
  {
    name: "Developer Hub",
    style: "Tech-Focused",
    accent: "#00f0ff",
    bgGrad: "from-[#0a0f1a] to-[#121820]",
  },
  {
    name: "Executive Suite",
    style: "Professional",
    accent: "#ff00ff",
    bgGrad: "from-[#120a0a] to-[#1a1215]",
  },
  {
    name: "Gradient Flow",
    style: "Vibrant & Dynamic",
    accent: "#00f0ff",
    bgGrad: "from-[#0a1018] to-[#101a22]",
  },
]

function TemplateCard({
  template,
  position,
}: {
  template: (typeof templates)[0]
  position: number
}) {
  const isActive = position === 0
  const absPos = Math.abs(position)
  const scale = isActive ? 1 : Math.max(0.75, 1 - absPos * 0.12)
  const opacity = isActive ? 1 : Math.max(0.3, 1 - absPos * 0.3)
  const translateX = position * 280
  const zIndex = 10 - absPos

  return (
    <div
      className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
      style={{
        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
        opacity,
        zIndex,
      }}
    >
      <div
        className={`group relative w-[300px] h-[420px] sm:w-[340px] sm:h-[480px] rounded-2xl neu-card overflow-hidden transition-all duration-500 ${
          isActive ? "hover:-translate-y-2" : ""
        }`}
        style={{
          boxShadow: isActive
            ? `0 0 40px ${template.accent}20, 8px 8px 16px rgba(0,0,0,0.5)`
            : "8px 8px 16px rgba(0,0,0,0.5)",
          border: `1px solid ${
            isActive ? `${template.accent}30` : "rgba(255,255,255,0.05)"
          }`,
        }}
      >
        {/* Template preview */}
        <div className={`h-full w-full bg-gradient-to-br ${template.bgGrad} p-5 flex flex-col`}>
          {/* Mock nav */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-2.5 w-16 rounded" style={{ backgroundColor: `${template.accent}30` }} />
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded bg-[#ffffff]/10" />
              <div className="h-2 w-8 rounded bg-[#ffffff]/10" />
              <div className="h-2 w-8 rounded bg-[#ffffff]/10" />
            </div>
          </div>

          {/* Mock hero */}
          <div className="mb-4">
            <div className="h-3 w-3/4 rounded mb-2" style={{ backgroundColor: `${template.accent}20` }} />
            <div className="h-2 w-full rounded bg-[#ffffff]/8 mb-1.5" />
            <div className="h-2 w-2/3 rounded bg-[#ffffff]/8" />
          </div>

          {/* Mock avatar */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-10 w-10 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${template.accent}, ${
                  template.accent === "#00f0ff" ? "#ff00ff" : "#00f0ff"
                })`,
              }}
            />
            <div>
              <div className="h-2 w-20 rounded bg-[#ffffff]/15 mb-1" />
              <div className="h-1.5 w-14 rounded bg-[#ffffff]/8" />
            </div>
          </div>

          {/* Mock cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="h-20 rounded-lg border border-[#ffffff]/5" style={{ backgroundColor: `${template.accent}05` }} />
            <div className="h-20 rounded-lg border border-[#ffffff]/5" style={{ backgroundColor: `${template.accent}05` }} />
          </div>

          {/* Mock section */}
          <div className="flex-1 rounded-lg bg-[#ffffff]/3 border border-[#ffffff]/5 p-3">
            <div className="h-2 w-16 rounded mb-2" style={{ backgroundColor: `${template.accent}15` }} />
            <div className="h-1.5 w-full rounded bg-[#ffffff]/5 mb-1" />
            <div className="h-1.5 w-4/5 rounded bg-[#ffffff]/5" />
          </div>

          {/* Template name */}
          <div className="mt-4 text-center">
            <p className="font-heading text-sm font-bold" style={{ color: "#ffffff" }}>{template.name}</p>
            <p className="text-xs text-[#a0a0b8]">{template.style}</p>
          </div>
        </div>

        {/* Hover overlay */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              className="flex items-center gap-2 rounded-xl px-6 py-3 font-heading text-sm font-bold text-[#0a0a0f] transition-transform hover:scale-105"
              style={{
                background: template.accent,
                boxShadow: `0 0 20px ${template.accent}40`,
              }}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function TemplatesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % templates.length)
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + templates.length) % templates.length)
  }, [])

  useEffect(() => {
    autoRotateRef.current = setInterval(next, 5000)
    return () => clearInterval(autoRotateRef.current)
  }, [next])

  const handleNav = (dir: "prev" | "next") => {
    clearInterval(autoRotateRef.current)
    if (dir === "prev") prev()
    else next()
    autoRotateRef.current = setInterval(next, 5000)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleNav("prev")
      if (e.key === "ArrowRight") handleNav("next")
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 py-32 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div
          className={`mb-20 text-center transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4 font-sub text-sm uppercase tracking-[0.2em] text-[#ff00ff]">
            Templates
          </p>
          <h2 className="font-heading text-4xl font-bold text-balance sm:text-5xl" style={{ color: "#ffffff" }}>
            Choose from{" "}
            <span className="gradient-text">Professional Templates</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sub text-lg text-[#a0a0b8]">
            Or let AI generate a custom one for you
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[560px]">
          {templates.map((template, i) => {
            let position = i - activeIndex
            if (position > Math.floor(templates.length / 2)) position -= templates.length
            if (position < -Math.floor(templates.length / 2)) position += templates.length
            return (
              <TemplateCard key={template.name} template={template} position={position} />
            )
          })}

          {/* Nav arrows */}
          <button
            onClick={() => handleNav("prev")}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass text-[#00f0ff] transition-all hover:glow-cyan sm:left-8"
            aria-label="Previous template"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleNav("next")}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass text-[#00f0ff] transition-all hover:glow-cyan sm:right-8"
            aria-label="Next template"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {templates.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearInterval(autoRotateRef.current)
                setActiveIndex(i)
                autoRotateRef.current = setInterval(next, 5000)
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                  : "w-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40"
              }`}
              aria-label={`Go to template ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
