"use client"

import { useEffect, useRef, useState } from "react"
import {
  Brain,
  FileText,
  Wand2,
  ShieldCheck,
  Rocket,
  BarChart3,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Portfolio Generator",
    description:
      "Describe your dream portfolio in plain English. Watch AI build it instantly.",
    animText: 'Create a modern developer portfolio with dark theme and project showcase...',
    color: "#00f0ff",
  },
  {
    icon: FileText,
    title: "Resume to Portfolio in 30 Seconds",
    description:
      "Upload your resume. AI extracts everything. Auto-fills your entire portfolio.",
    animText: "Extracting skills, experience, education...",
    color: "#ff00ff",
  },
  {
    icon: Wand2,
    title: "Context-Aware AI Editor",
    description:
      "Select any section. AI rewrites it perfectly for your target role.",
    animText: "Optimizing content for Senior Frontend role...",
    color: "#00f0ff",
  },
  {
    icon: ShieldCheck,
    title: "Beat the ATS Robots",
    description:
      "AI scores your portfolio against job requirements. Get actionable improvements.",
    animText: "ATS Score: 95% - Excellent match!",
    color: "#ff00ff",
  },
  {
    icon: Rocket,
    title: "Deploy in One Click",
    description:
      "No hosting headaches. Your portfolio goes live instantly with a custom URL.",
    animText: "yourname.portfolio.ai is now live!",
    color: "#00f0ff",
  },
  {
    icon: BarChart3,
    title: "Know What Recruiters See",
    description:
      "Track views, engagement, and get AI insights to improve your portfolio.",
    animText: "247 views this week, +34% engagement",
    color: "#ff00ff",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= feature.animText.length) {
        setTypedText(feature.animText.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [isVisible, feature.animText])

  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="neu-card relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2"
        style={{
          boxShadow: isHovered
            ? `0 0 40px ${feature.color}20, 8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)`
            : "8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)",
          borderColor: isHovered ? `${feature.color}30` : "rgba(255,255,255,0.05)",
        }}
      >
        {/* Icon */}
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
          style={{
            background: `${feature.color}10`,
            boxShadow: isHovered ? `0 0 20px ${feature.color}20` : "none",
          }}
        >
          <Icon
            className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12"
            style={{ color: feature.color }}
          />
        </div>

        {/* Title */}
        <h3
          className="mb-3 font-heading text-xl font-bold"
          style={{ color: "#ffffff" }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mb-5 font-sub text-sm leading-relaxed text-[#a0a0b8]">
          {feature.description}
        </p>

        {/* Typing animation area */}
        <div className="rounded-xl bg-[#0a0a0f]/60 p-4 border border-[#ffffff]/5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <p className="font-mono text-xs" style={{ color: feature.color }}>
            {typedText}
            <span
              className="inline-block w-[6px] h-3 ml-0.5 align-middle animate-pulse-glow"
              style={{ backgroundColor: feature.color }}
              aria-hidden="true"
            />
          </p>
        </div>

        {/* Subtle top highlight line */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] transition-all duration-500"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, transparent, ${feature.color}60, transparent)`
              : "transparent",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true)
      },
      { threshold: 0.3 }
    )
    if (headingRef.current) observer.observe(headingRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative z-10 py-32 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mb-20 text-center transition-all duration-700 ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4 font-sub text-sm uppercase tracking-[0.2em] text-[#00f0ff]">
            Powerful Features
          </p>
          <h2 className="font-heading text-4xl font-bold text-balance sm:text-5xl" style={{ color: "#ffffff" }}>
            Everything You Need to{" "}
            <span className="gradient-text">Stand Out</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sub text-lg text-[#a0a0b8]">
            From AI generation to analytics, every tool is designed to help you
            land your dream role.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
