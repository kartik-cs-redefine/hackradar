"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ComparisonItem = {
  left: string;
  right: string;
};

const comparisonItems: ComparisonItem[] = [
  {
    left: "Visit multiple hackathon platforms every day",
    right: "Discover verified hackathons from one platform",
  },
  {
    left: "Track registrations and deadlines manually",
    right: "AI-powered personalized recommendations",
  },
  {
    left: "Miss important submissions and PPT deadlines",
    right: "Smart registration & submission reminders",
  },
  {
    left: "No centralized event timeline",
    right: "Complete event timeline tracking",
  },
  {
    left: "Scattered reminders across different platforms",
    right: "Personalized notification preferences",
  },
  {
    left: "Difficult to manage multiple hackathons",
    right: "Manage every enrolled hackathon from one dashboard",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Row({
  text,
  icon,
  active,
  visible,
  onHover,
  tone,
}: {
  text: string;
  icon: "x" | "check";
  active: boolean;
  visible: boolean;
  onHover: () => void;
  tone: "left" | "right";
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl px-5 py-4 text-left outline-none transition-[background-color,box-shadow,transform,border-color,opacity] duration-200 ease-in-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        active
          ? tone === "left"
            ? "bg-[#FFF7F7] shadow-[0_8px_24px_rgba(220,38,38,0.08)]"
            : "bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_24px_rgba(124,58,237,0.08)]"
          : tone === "right"
            ? "bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)]"
            : "bg-transparent hover:bg-background/40"
      )}
      style={{ transitionDelay: `${visible ? 0 : 0}ms` }}
      aria-label={text}
    >
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
          icon === "x" ? "text-[#DC2626]" : "text-[#86EFAC]"
        )}
      >
        {icon === "x" ? <X className="size-3.5" /> : <Check className="size-3.5" />}
      </span>
      <span
        className={cn(
          "pt-px text-sm leading-6",
          tone === "right" ? "text-[rgba(255,255,255,0.92)]" : "text-foreground"
        )}
      >
        {text}
      </span>
    </button>
  );
}

export function WhyDiscoveryMattersPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-2">
      <div
        className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color,transform] duration-200 ease-in-out hover:border-[#DC2626]/25 hover:shadow-[0_12px_30px_rgba(220,38,38,0.06)]"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Without HackRadar
        </p>
        <div className="mt-6 space-y-4">
          {comparisonItems.map((item, index) => (
            <Row
              key={item.left}
              text={item.left}
              icon="x"
              active={activeIndex === index}
              visible={inView}
              tone="left"
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      <div
        className="rounded-[2rem] border border-[#8B5CF6]/20 bg-[linear-gradient(180deg,#8B5CF6_0%,#7C3AED_100%)] p-8 text-background shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[box-shadow,transform,border-color] duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[#A78BFA]/25 hover:shadow-[0_14px_38px_rgba(124,58,237,0.14)]"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFFFFF]">
          With HackRadar
        </p>
        <div className="mt-6 space-y-4">
          {comparisonItems.map((item, index) => (
            <Row
              key={item.right}
              text={item.right}
              icon="check"
              active={activeIndex === index}
              visible={inView}
              tone="right"
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
