import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  CircleCheckBig,
  Clock3,
  Globe2,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StatsSection } from "./stats-section";
import { HackRadarWorkflowGrid } from "./hackradar-workflow-grid";
import { HackRadarJourneyAccordion } from "./hackradar-journey-accordion";
import { WhyDiscoveryMattersPanel } from "./why-discovery-matters-panel";

type SectionShellProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

type ProblemCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

type OpportunityCardProps = {
  title: string;
  source: string;
  deadline: string;
  category: string;
};

type TimelineItemProps = {
  phase: string;
  title: string;
  description?: string;
  active?: boolean;
};

type FooterColumnProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};
const opportunityCards = [
  {
    title: "Google Solution Challenge",
    source: "Google",
    deadline: "Closes in 6 days",
    category: "Hackathon",
  },
  {
    title: "Smart India Hackathon",
    source: "Government of India",
    deadline: "Registrations open",
    category: "Competition",
  },
  {
    title: "Microsoft Imagine Cup",
    source: "Microsoft",
    deadline: "Application window active",
    category: "Hackathon",
  },
  {
    title: "Code for Good",
    source: "JPMorgan Chase",
    deadline: "Apply this week",
    category: "Build Challenge",
  },
  {
    title: "Unstop Innovate",
    source: "Unstop",
    deadline: "New this month",
    category: "Innovation",
  },
  {
    title: "Hack The Future",
    source: "Devfolio",
    deadline: "Limited slots left",
    category: "Hackathon",
  },
];

const roadmapItems = [
  { phase: "Phase 1", title: "Hackathons", active: true },
  { phase: "Phase 2", title: "Internships" },
  { phase: "Phase 3", title: "Scholarships" },
  { phase: "Phase 4", title: "Portfolio Builder" },
  { phase: "Phase 5", title: "Organizer Dashboard" },
  { phase: "Phase 6", title: "AI Career Coach" },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#introducing-hackradar" },
      { label: "Hackathons", href: "#featured-opportunities" },
      { label: "Internships", href: "#roadmap" },
      { label: "Competitions", href: "#featured-opportunities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#introducing-hackradar" },
      { label: "Contact", href: "mailto:hello@hackradar.com" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

export function SectionShell({
  title,
  subtitle,
  children,
  id,
  className,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function ProblemCard({ title, description, icon }: ProblemCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="mb-6 flex size-11 items-center justify-center rounded-2xl bg-muted text-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="mb-6 flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
        {icon ?? <Check className="size-5" />}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {step}
        </span>
        <div className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground">
          <ChevronDown className="size-4 -rotate-90" />
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

export function OpportunityCard({
  title,
  source,
  deadline,
  category,
}: OpportunityCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {category}
          </p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-background">
          <CircleCheckBig className="size-5 text-success" />
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Source</p>
          <p className="mt-1 font-medium text-foreground">{source}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Deadline</p>
          <p className="mt-1 font-medium text-foreground">{deadline}</p>
        </div>
      </div>
    </article>
  );
}

export function TimelineItem({ phase, title, description, active }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          "mt-1 flex size-10 items-center justify-center rounded-full border",
          active ? "border-primary bg-primary text-background" : "border-border bg-surface text-foreground"
        )}
      >
        <span className="text-xs font-semibold">{phase.replace("Phase ", "")}</span>
      </div>
      <div className="pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {phase}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-16 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Final step
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Ready to Never Miss Another Opportunity?
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Discover the opportunities that matter, track them intelligently, and apply with
              confidence.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
                <Link href="/get-started">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#featured-opportunities">
                  Explore Opportunities
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandingSections() {
  return (
    <>
      <SectionShell
        id="problem"
        eyebrow="The Problem"
        title="Why Students Miss Great Opportunities"
        subtitle="Hackathons are spread across multiple platforms, making it difficult to discover opportunities, track deadlines, and choose the right one."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ProblemCard
            icon={<Globe2 className="size-5" />}
            title="Scattered Platforms"
            description="Hackathons are spread across multiple websites, making discovery slow and frustrating."
          />
          <ProblemCard
            icon={<Clock3 className="size-5" />}
            title="Missed Deadlines"
            description="Students often discover great hackathons after registrations have already closed."
          />
          <ProblemCard
            icon={<Search className="size-5" />}
            title="Information Overload"
            description="Too many platforms, too much information, and no easy way to find what matters."
          />
          <ProblemCard
            icon={<Brain className="size-5" />}
            title="No Personalization"
            description="Students receive generic listings instead of opportunities matched to their skills."
          />
        </div>
        <div className="mt-6 rounded-[1.75rem] border border-border bg-muted/40 px-6 py-5 text-sm font-medium text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
          The problem isn&apos;t the lack of hackathons - it&apos;s discovering the right ones in time.
        </div>
      </SectionShell>

      <SectionShell
        id="introducing-hackradar"
        eyebrow="Introducing HackRadar"
        title="Introducing HackRadar"
        subtitle="HackRadar solves fragmented discovery through one intelligent platform."
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureCard
                title="Smart Discovery"
                description="Discover verified hackathons from multiple trusted platforms without endless searching."
              />
              <FeatureCard
                title="AI-Powered Recommendations"
                description="Receive personalized hackathon suggestions based on your skills, interests and experience level."
              />
              <FeatureCard
                title="Smart Alerts & Tracking"
                description="Stay informed with reminders for registrations, submissions, presentations and every important milestone."
              />
            </div>
          </div>
          <HackRadarJourneyAccordion />
        </div>
      </SectionShell>

      <SectionShell
        id="how-it-works"
        eyebrow="How HackRadar Works"
        title="How HackRadar Works"
        subtitle="A simple workflow that helps you discover hackathons, track important deadlines and never miss an opportunity."
      >
        <HackRadarWorkflowGrid />
      </SectionShell>

      <SectionShell
        id="why-discovery-matters"
        eyebrow="Why Discovery Matters"
        title="Why Students Choose HackRadar"
        subtitle="Stop searching across multiple websites. HackRadar helps you discover opportunities, track deadlines and stay updated-all from one platform."
      >
        <WhyDiscoveryMattersPanel />
      </SectionShell>

      <SectionShell
        id="featured-opportunities"
        eyebrow="Featured Opportunities"
        title="Featured Opportunities"
        subtitle="Six premium opportunities provide a glimpse into the kind of discovery HackRadar organizes."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {opportunityCards.map((item) => (
            <OpportunityCard key={item.title} {...item} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/hackathons">View All Opportunities</Link>
          </Button>
        </div>
      </SectionShell>

      <StatsSection />

      <SectionShell
        id="roadmap"
        eyebrow="Roadmap"
        title="Roadmap"
        subtitle="HackRadar expands from discovery into the broader student opportunity stack."
      >
        <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="space-y-0">
            {roadmapItems.map((item, index) => (
              <div key={item.phase}>
                <TimelineItem
                  phase={item.phase}
                  title={item.title}
                  active={item.active}
                />
                {index < roadmapItems.length - 1 ? (
                  <div className="ml-[1.3125rem] h-10 w-px bg-border" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <CTASection />

      <footer className="border-t border-border py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 xl:grid-cols-[1.3fr_1fr]">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" />
              HackRadar
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              A premium discovery platform for hackathons, internships, competitions, and
              student growth.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

