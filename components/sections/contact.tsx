'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields before sending.')
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    // TODO: integrate a real email delivery service here.
    // Suggestion: create an endpoint at app/api/contact/route.ts using
    // Resend (https://resend.com) or another provider, replacing this
    // simulation with: await fetch('/api/contact', { method: 'POST', ... })
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setStatus('success')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="contact" className="bg-neutral-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <Badge
            variant="outline"
            className="border-white/10 bg-white/5 px-3 text-neutral-300"
          >
            Contact
          </Badge>
          <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Let&apos;s talk
          </h2>
          <p className="text-neutral-400">
            Tell us about your challenge — we typically reply within 1–2
            business days.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                <MapPin className="size-5 text-white" />
              </span>
              <div>
                <p className="font-medium text-white">Address</p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  30 N Gould St Ste R
                  <br />
                  Sheridan, WY 82801, USA
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                <Mail className="size-5 text-white" />
              </span>
              <div>
                <p className="font-medium text-white">Email</p>
                <a
                  href="mailto:info@polaris.enterprises.com"
                  className="mt-1 inline-block text-sm text-neutral-400 transition-colors hover:text-indigo-400"
                >
                  info@polaris.enterprises.com
                </a>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-neutral-500">
              Prefer to reach out directly? Send us an email with a brief
              description of your project and the best time for a call.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {status === 'success' ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                <CheckCircle2 className="size-12 text-indigo-400" />
                <p className="text-lg font-medium text-white">
                  Message sent successfully!
                </p>
                <p className="text-sm text-neutral-400">
                  Thank you for reaching out — we&apos;ll get back to you very
                  soon.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus('idle')}
                  className="mt-2 border-white/15 bg-white/5 text-neutral-100 hover:bg-white/10 hover:text-white"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-neutral-200">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border-white/10 bg-black/40 text-white placeholder:text-neutral-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-neutral-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="border-white/10 bg-black/40 text-white placeholder:text-neutral-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-neutral-200">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project…"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="min-h-32 border-white/10 bg-black/40 text-white placeholder:text-neutral-500"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-400">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-11 w-full border-transparent bg-indigo-600 text-base text-white hover:bg-indigo-500"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
