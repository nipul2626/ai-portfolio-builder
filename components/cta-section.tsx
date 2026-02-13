"use client"

import { useEffect, useRef, useState } from "react"

export function CTASection() {
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

  return (
    <section ref={ref} className="relative z-10 py-32 px-4 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,240,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255,0,255,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-heading text-5xl font-extrabold text-balance sm:text-6xl lg:text-7xl" style={{ color: "#ffffff" }}>
            Ready to{" "}
            <span className="gradient-text">Stand Out?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-sub text-lg text-[#a0a0b8] sm:text-xl">
            Join thousands building recruiter-ready portfolios with AI
          </p>

          <div
            className={`mt-10 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              className="group relative rounded-2xl px-12 py-5 font-heading text-base font-bold tracking-wide text-[#0a0a0f] transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #00d4ff)",
                boxShadow:
                  "0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1)",
              }}
            >
              <span className="relative z-10">Create Your Portfolio Free</span>
              <span
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #7bf1ff)",
                  boxShadow: "0 0 50px rgba(0,240,255,0.5), 0 0 80px rgba(0,240,255,0.2)",
                }}
                aria-hidden="true"
              />
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                style={{ backgroundColor: "#00f0ff" }}
                aria-hidden="true"
              />
            </button>

            <p className="mt-6 font-sub text-sm text-[#a0a0b8]/60">
              No credit card required &bull; Takes 2 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
