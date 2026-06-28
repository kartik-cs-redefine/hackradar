"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  BellRing,
  BookmarkMinus,
  CalendarDays,
  CalendarRange,
  CircleDot,
  MapPin,
  Rocket,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button, Card, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Hackathon } from "../types";
import { getHackathonTimeline, type TimelineStage } from "../timeline-data";

type HackathonCardProps = {
  hackathon: Hackathon;
  index: number;
  tracked?: boolean;
  enrolledMode?: boolean;
  showNotifications?: boolean;
  recommendationScore?: number;
  recommendationReasons?: string[];
  recommendationLabel?: string;
  onRemove?: (hackathon: Hackathon) => void;
  onTrack?: (hackathon: Hackathon) => void;
};

function Badge({ children, tone }: { children: ReactNode; tone?: "default" | "muted" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "muted"
          ? "border-border bg-background text-muted-foreground"
          : "border-border bg-surface text-foreground"
      )}
    >
      {children}
    </span>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-background px-3 py-2.5">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

function TrackButton({
  tracked,
  enrolledMode,
  showNotifications,
  onTrack,
  hackathon,
}: {
  tracked?: boolean;
  enrolledMode?: boolean;
  showNotifications?: boolean;
  onTrack?: (hackathon: Hackathon) => void;
  hackathon: Hackathon;
}) {
  if (enrolledMode) {
    return (
      <Button asChild variant="outline" className="border-danger/20 text-danger hover:bg-danger/10 hover:text-danger">
        <Link href="/alerts">
          <BellRing className="size-4" />
          {showNotifications ? "Notifications" : "Tracking"}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={() => onTrack?.(hackathon)}
      className={cn(
        "relative overflow-hidden shadow-[0_10px_28px_rgba(124,58,237,0.18)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        tracked ? "opacity-95" : ""
      )}
      aria-pressed={tracked}
    >
      <motion.span
        animate={tracked ? { opacity: [0.96, 1, 0.96] } : { opacity: [0.98, 1, 0.98] }}
        transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="inline-flex items-center gap-2"
      >
        <Target className="size-4" />
        {tracked ? "Tracked" : "Track"}
      </motion.span>
    </Button>
  );
}

function TimelineStatusPill({ status }: { status: TimelineStage["status"] }) {
  const tone =
    status === "Completed"
      ? "border-success/20 bg-success/10 text-success dark:border-success/30 dark:bg-success/15"
      : status === "Current"
        ? "border-primary-border bg-primary-soft text-primary dark:bg-[rgba(124,58,237,0.16)] dark:text-[#E9D5FF]"
        : "border-border bg-background text-muted-foreground";

  return <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-medium", tone)}>{status}</span>;
}

function getTimelineIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("registration")) return <CalendarDays className="size-4" />;
  if (normalized.includes("team")) return <CircleDot className="size-4" />;
  if (normalized.includes("screen")) return <Target className="size-4" />;
  if (normalized.includes("mentor")) return <Rocket className="size-4" />;
  if (normalized.includes("winner")) return <ArrowUpRight className="size-4" />;
  if (normalized.includes("final")) return <CalendarRange className="size-4" />;
  return <CircleDot className="size-4" />;
}

function TimelineDialog({ hackathon }: { hackathon: Hackathon }) {
  const timeline = getHackathonTimeline(hackathon);

  return (
    <DialogContent className="p-0">
      <div className="max-h-[86vh] overflow-y-auto">
        <div className="border-b border-border/70 bg-surface px-5 py-5 sm:px-6">
          <DialogHeader className="max-w-[calc(100%-3rem)] text-left">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-sm font-semibold text-foreground">
                {hackathon.logo}
              </div>
              <div className="min-w-0">
                <DialogTitle>{hackathon.name}</DialogTitle>
                <DialogDescription className="mt-1">{hackathon.organizer}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <div className="relative pl-2 sm:pl-4">
            <div className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-border sm:left-[1.35rem]" />
            <div className="space-y-5">
              {timeline.stages.map((stage) => (
                <div key={`${hackathon.id}-${stage.label}`} className="relative flex gap-4">
                  <div className="relative z-10 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground shadow-sm">
                    {getTimelineIcon(stage.label)}
                  </div>
                  <Card className="flex-1 border-border/70 bg-background/70 p-4 shadow-none">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground">{stage.label}</h4>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{stage.description}</p>
                      </div>
                      <TimelineStatusPill status={stage.status} />
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      {stage.date}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {timeline.officialWebsite ? (
            <div className="mt-6">
              <Button asChild variant="outline" className="w-full">
                <a href={timeline.officialWebsite} target="_blank" rel="noreferrer">
                  <ArrowUpRight className="size-4" />
                  Open Official Website
                </a>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </DialogContent>
  );
}

function TimelineButton({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative w-full overflow-hidden border-rose-200/80 bg-rose-50 text-rose-950 shadow-none",
            "hover:border-rose-300 hover:bg-rose-100/80 hover:text-rose-950",
            "dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-100 dark:hover:border-rose-400/30 dark:hover:bg-rose-500/15 dark:hover:text-rose-50"
          )}
        >
          <CalendarRange className="size-4" />
          Event Timeline
        </Button>
      </DialogTrigger>
      <TimelineDialog hackathon={hackathon} />
    </Dialog>
  );
}

export function HackathonCard({
  hackathon,
  index,
  tracked = false,
  enrolledMode = false,
  showNotifications = false,
  recommendationScore,
  recommendationReasons,
  recommendationLabel = "HRAI Match",
  onTrack,
  onRemove,
}: HackathonCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group flex h-full flex-col justify-between border-border/70 bg-surface/95 p-5 shadow-[0_10px_30px_rgba(31,25,48,0.06)] backdrop-blur-sm",
          "relative overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-out",
          "hover:border-primary-border hover:shadow-[0_18px_45px_rgba(124,58,237,0.10),0_2px_8px_rgba(124,58,237,0.06)]",
          "dark:hover:border-primary-border dark:hover:shadow-[0_18px_45px_rgba(124,58,237,0.12),0_2px_8px_rgba(124,58,237,0.08)]"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
            "bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.08),transparent_40%)]",
            "group-hover:opacity-100",
            "dark:bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.10),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.08),transparent_40%)]"
          )}
        />
        <div className="relative">
          {enrolledMode ? (
            <button
              type="button"
              onClick={() => onRemove?.(hackathon)}
              aria-label={`Remove ${hackathon.name} from enrolled hackathons`}
              className="absolute right-0 top-0 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BookmarkMinus className="size-4" />
            </button>
          ) : null}

          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-sm font-semibold text-foreground">
                {hackathon.logo}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold tracking-tight text-foreground">
                  {hackathon.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{hackathon.organizer}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {typeof recommendationScore === "number" ? (
                <Badge tone="default">
                  {recommendationScore}% {recommendationLabel}
                </Badge>
              ) : null}
              <Badge tone={hackathon.status === "Live" ? "default" : "muted"}>{hackathon.status}</Badge>
              <Badge tone="muted">{hackathon.mode}</Badge>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{hackathon.domain}</Badge>
            <Badge tone="muted">{hackathon.difficulty}</Badge>
            <Badge tone="muted">{hackathon.registration}</Badge>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">{hackathon.description}</p>
          {recommendationReasons?.length ? (
            <div className="mt-4 rounded-2xl border border-border bg-background px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Why Recommended
              </p>
              <ul className="mt-2 space-y-1 text-sm text-foreground">
                {recommendationReasons.map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <span className="text-success">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            <MetaRow
              icon={<CalendarDays className="size-4" />}
              label="Registration Deadline"
              value={hackathon.deadline}
            />
            <MetaRow
              icon={<CircleDot className="size-4" />}
              label={
                hackathon.eventDates.includes("–") ||
                hackathon.eventDates.toLowerCase().includes("ongoing") ||
                hackathon.eventDates.toLowerCase().includes("rolling")
                  ? "Event Dates"
                  : "Event Date"
              }
              value={hackathon.eventDates}
            />
            <MetaRow icon={<Rocket className="size-4" />} label="Prize Pool" value={hackathon.prizePool} />
            <MetaRow icon={<MapPin className="size-4" />} label="Location" value={hackathon.location} />
          </div>
        </div>

        <div className="relative mt-5 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" asChild className="relative overflow-hidden">
              <Link href={hackathon.officialWebsite} target="_blank" rel="noreferrer">
                More Details
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <TrackButton
              tracked={tracked}
              enrolledMode={enrolledMode}
              showNotifications={showNotifications}
              onTrack={onTrack}
              hackathon={hackathon}
            />
          </div>
          <TimelineButton hackathon={hackathon} />
        </div>
      </Card>
    </motion.article>
  );
}
