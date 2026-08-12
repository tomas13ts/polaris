import { AtSign, Briefcase, GitBranch, Mail, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

// lucide-react removed its brand icons (Linkedin, Twitter, Github);
// these are neutral stand-ins — swap for each network's official SVG
// (e.g. via simple-icons) once the real profiles exist.
const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: Briefcase },
  { label: 'Twitter / X', href: '#', icon: AtSign },
  { label: 'GitHub', href: '#', icon: GitBranch },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <a
              href="#home"
              className="text-base font-semibold tracking-tight text-white"
            >
              Polaris Enterprises
            </a>
            <div className="mt-6 space-y-3 text-sm text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-neutral-500" />
                30 N Gould St Ste R, Sheridan, WY 82801, USA
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-neutral-500" />
                <a
                  href="mailto:info@polaris.enterprises.com"
                  className="transition-colors hover:text-indigo-400"
                >
                  info@polaris.enterprises.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Social</p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-indigo-500/40 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-neutral-500">
            © 2026 Polaris Enterprises Group LLC. All rights reserved.
          </p>
          <p className="mt-2 text-center text-xs text-neutral-600">
            Polaris Enterprises Group LLC · 30 N Gould St, Ste R, Sheridan, WY
            82801, United States
          </p>
        </div>
      </div>
    </footer>
  )
}
