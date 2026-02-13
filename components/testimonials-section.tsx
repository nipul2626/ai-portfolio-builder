"use client"

import { useEffect, useRef, useState } from "react"
import { Linkedin } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer at Google",
    quote:
      "I went from no portfolio to getting interview calls in 48 hours. The AI understood exactly what tech recruiters look for.",
    color: "#00f0ff",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "UX Designer at Spotify",
    quote:
      "The templates are stunning. I customized mine in minutes and my conversion rate from portfolio views to callbacks tripled.",
    color: "#ff00ff",
    initials: "MJ",
  },
  {
    name: "Priya Patel",
    role: "Data Scientist at Meta",
    quote:
      "The ATS optimizer is a game changer. It scored my portfolio against actual job descriptions and told me exactly what to fix.",
    color: "#00f0ff",
    initials: "PP",
  },
  {
    name: "Alex Rivera",
    role: "Product Manager at Stripe",
    quote:
      "I uploaded my resume and had a complete portfolio in 30 seconds. The AI even wrote better descriptions than I would have.",
    color: "#ff00ff",
    initials: "AR",
  },
  {
    name: "Emma Watson",
    role: "Full Stack Dev at Netflix",
    quote:
      "The analytics dashboard shows exactly which sections recruiters spend time on. I optimized my portfolio based on real data.",
    color: "#00f0ff",
    initials: "EW",
  },
  {
    name: "David Kim",
    role: "ML Engineer at OpenAI",
    quote:
      "From deploy to my first recruiter message: 3 days. This tool pays for itself instantly. Absolutely worth every penny.",
    color: "#ff00ff",
    initials: "DK",
  },
]

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        animation: isVisible
          ? `float-slow ${6 + index * 0.5}s ease-in-out infinite`
          : "none",
        animationDelay: `${index * 0.3}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="neu-card rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02]"
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${testimonial.color}15, 8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)`
            : "8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.03)",
        }}
      >
        {/* Avatar + info */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="relative flex h-11 w-11 items-center justify-center rounded-full font-heading text-sm font-bold"
            style={{
              background: `${testimonial.color}15`,
              color: testimonial.color,
              boxShadow: `0 0 0 2px ${testimonial.color}30`,
            }}
          >
            {testimonial.initials}
            {/* Neon ring */}
            <div
              className="absolute inset-[-3px] rounded-full opacity-0 transition-opacity duration-300"
              style={{
                border: `1px solid ${testimonial.color}40`,
                opacity: isHovered ? 1 : 0,
              }}
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <p className="font-heading text-sm font-bold" style={{ color: "#ffffff" }}>
              {testimonial.name}
            </p>
            <p className="text-xs text-[#a0a0b8]">{testimonial.role}</p>
          </div>
          <Linkedin
            className={`h-4 w-4 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: testimonial.color }}
          />
        </div>

        {/* Quote */}
        <p className="font-sub text-sm italic leading-relaxed text-[#a0a0b8]">
          {`"${testimonial.quote}"`}
        </p>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

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

  return (
    <section ref={sectionRef} className="relative z-10 py-32 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div
          className={`mb-20 text-center transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4 font-sub text-sm uppercase tracking-[0.2em] text-[#ff00ff]">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl font-bold text-balance sm:text-5xl" style={{ color: "#ffffff" }}>
            Loved by{" "}
            <span className="gradient-text">Thousands</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sub text-lg text-[#a0a0b8]">
            Join professionals who landed their dream roles
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
