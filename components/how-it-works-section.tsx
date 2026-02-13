"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, Sparkles, SlidersHorizontal, Globe } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload or Prompt",
    description:
      "Drop your resume or describe your ideal portfolio in natural language. Our AI understands what you need.",
    color: "#00f0ff",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Does the Magic",
    description:
      "Neural networks analyze your content, generate layouts, write compelling copy, and build your portfolio in seconds.",
    color: "#ff00ff",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Customize & Perfect",
    description:
      "Fine-tune every detail with our intuitive editor. AI suggests improvements as you go.",
    color: "#00f0ff",
  },
  {
    number: "04",
    icon: Globe,
    title: "Deploy & Share",
    description:
      "Go live with one click. Share your custom URL with recruiters and watch the interviews roll in.",
    color: "#ff00ff",
  },
]

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const Icon = step.icon
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Timeline connector dot */}
      <div
        className={`absolute left-1/2 z-10 -translate-x-1/2 h-4 w-4 rounded-full transition-all duration-700 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
        style={{
          backgroundColor: step.color,
          boxShadow: `0 0 20px ${step.color}60`,
          transitionDelay: `${index * 200}ms`,
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`w-full max-w-md transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : isLeft
              ? "opacity-0 -translate-x-12"
              : "opacity-0 translate-x-12"
        } ${isLeft ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div
          className="neu-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
          style={{
            borderColor: `${step.color}15`,
          }}
        >
          {/* Step number + icon */}
          <div className="mb-5 flex items-center gap-4">
            <span
              className="font-heading text-3xl font-extrabold"
              style={{ color: `${step.color}40` }}
            >
              {step.number}
            </span>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${step.color}10` }}
            >
              <Icon className="h-6 w-6" style={{ color: step.color }} />
            </div>
          </div>

          <h3 className="mb-3 font-heading text-xl font-bold" style={{ color: "#ffffff" }}>
            {step.title}
          </h3>
          <p className="font-sub text-sm leading-relaxed text-[#a0a0b8]">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - sectionTop) / (sectionHeight + viewportHeight * 0.5))
      )
      setLineProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 py-32 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div
          className={`mb-20 text-center transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4 font-sub text-sm uppercase tracking-[0.2em] text-[#00f0ff]">
            How It Works
          </p>
          <h2 className="font-heading text-4xl font-bold text-balance sm:text-5xl" style={{ color: "#ffffff" }}>
            From Zero to{" "}
            <span className="gradient-text">Portfolio Hero</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sub text-lg text-[#a0a0b8]">
            Four simple steps to a recruiter-ready portfolio
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" aria-hidden="true">
            <div className="h-full w-full bg-[#ffffff]/5" />
            <div
              className="absolute top-0 left-0 w-full transition-all duration-100"
              style={{
                height: `${lineProgress * 100}%`,
                background: "linear-gradient(180deg, #00f0ff, #ff00ff)",
                boxShadow: "0 0 10px rgba(0,240,255,0.3)",
              }}
            />
          </div>

          {/* Step cards */}
          <div className="flex flex-col gap-24">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
