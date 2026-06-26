'use client'

import { Mail, MessageSquare, PenLine, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: PenLine, title: 'Pitch an essay', body: 'Have an idea, argument, or long-form piece in mind? Tell us the shape of it and where you want to take it.' },
  { icon: MessageSquare, title: 'Suggest a topic', body: 'Spot a thread worth pulling? Point us toward the subjects and questions you want to see explored.' },
  { icon: Sparkles, title: 'Collaborate', body: 'Partnerships, series, and editorial collaborations — start the conversation and we will find the right fit.' },
]

export default function ContactPage() {
  const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

  return (
    <EditableSiteShell>
      <main>
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute -right-[12%] -top-[34%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,var(--slot4-accent-glow),transparent_62%)] blur-3xl" />
          <div className={`relative ${container} py-16 sm:py-20`}>
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div data-reveal="left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
                <h1 className="editable-display mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl">{pagesContent.contact.title}</h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
                <div className="mt-9 space-y-4">
                  {lanes.map((lane, index) => (
                    <div
                      key={lane.title}
                      data-reveal
                      style={{ transitionDelay: `${index * 90}ms` }}
                      className="flex items-start gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-500 hover:border-[var(--editable-border-strong)]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--slot4-accent)]/30 bg-[color-mix(in_oklab,var(--slot4-accent)_12%,transparent)] text-[var(--slot4-accent)]">
                        <lane.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="editable-display text-lg font-semibold tracking-[-0.01em]">{lane.title}</h2>
                        <p className="mt-1.5 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9" data-reveal="right">
                <div className="flex items-center gap-2 text-[var(--slot4-accent)]">
                  <Mail className="h-5 w-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Reach the desk</span>
                </div>
                <h2 className="editable-display mt-3 text-2xl font-semibold tracking-[-0.01em]">{pagesContent.contact.formTitle}</h2>
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
