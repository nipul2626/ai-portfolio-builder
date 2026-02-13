"use client"

import { Twitter, Github, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Community", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#ffffff]/5 bg-[#0a0a0f]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg font-heading text-xs font-extrabold text-[#0a0a0f]"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                }}
              >
                P
              </div>
              <span className="font-heading text-lg font-bold" style={{ color: "#ffffff" }}>
                PortfolioAI
              </span>
            </div>
            <p className="max-w-xs font-sub text-sm leading-relaxed text-[#a0a0b8]">
              Build stunning, recruiter-ready portfolios in minutes with the
              power of AI. No coding required.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ffffff]/5 text-[#a0a0b8] transition-all duration-300 hover:border-[#00f0ff]/30 hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider" style={{ color: "#ffffff" }}>
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sub text-sm text-[#a0a0b8] transition-all duration-300 hover:text-[#00f0ff] hover:glow-text-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#ffffff]/5 pt-8 sm:flex-row">
          <p className="font-sub text-xs text-[#a0a0b8]/50">
            &copy; {new Date().getFullYear()} PortfolioAI. All rights reserved.
          </p>
          <p className="font-sub text-xs text-[#a0a0b8]/30">
            Built with AI, designed for humans.
          </p>
        </div>
      </div>
    </footer>
  )
}
