"use client"

import { useEffect, useRef, useState } from "react"
import { Users, TrendingUp, Zap, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Portfolios Created",
    color: "#00f0ff",
  },
  {
    icon: TrendingUp,
    value: 95,
    suffix: "%",
    label: "Got More Interviews",
    color: "#ff00ff",
  },
  {
    icon: Zap,
    value: 30,
    suffix: " Sec",
    label: "Average Build Time",
    color: "#00f0ff",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "User Rating",
    color: "#ff00ff",
    isDecimal: true,
  },
]

function CountUp({
  target,
  isDecimal,
  suffix,
  isVisible,
}: {
  target: number
  isDecimal?: boolean
  suffix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(current)
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [isVisible, target])

  const display = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString()

  return (
    <span>
      {display}
      {suffix}
      {!isDecimal && target === 4.9 ? "" : ""}
    </span>
  )
}

export function StatsSection() {
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
    <section ref={ref} className="relative z-10 py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <Icon
                    className="mb-4 h-8 w-8 animate-pulse-glow"
                    style={{ color: stat.color }}
                  />
                  <div
                    className="font-heading text-3xl font-extrabold sm:text-4xl"
                    style={{ color: "#ffffff" }}
                  >
                    <CountUp
                      target={stat.value}
                      isDecimal={stat.isDecimal}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                  </div>
                  <p className="mt-2 font-sub text-sm text-[#a0a0b8]">
                    {stat.label}
                  </p>
                  {/* Neon underline */}
                  <div
                    className={`mt-3 h-[2px] rounded-full transition-all duration-1000 ${
                      isVisible ? "w-12" : "w-0"
                    }`}
                    style={{
                      backgroundColor: stat.color,
                      boxShadow: `0 0 8px ${stat.color}60`,
                      transitionDelay: `${i * 150 + 500}ms`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
