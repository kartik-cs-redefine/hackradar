"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getStoredUserProfile,
  setStoredUserProfile,
  type UserProfile,
} from "@/features/profile/storage";

const domains = [
  "AI",
  "Web Development",
  "Cyber Security",
  "Cloud Computing",
  "Blockchain",
  "Data Science",
  "IoT",
  "Robotics",
  "Open Source",
  "Mobile Development",
  "Game Development",
];

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Python",
  "Java",
  "C++",
  "Flutter",
  "Machine Learning",
  "Prompt Engineering",
  "Git",
  "GitHub",
];

const goals = ["Win Hackathons", "Learning", "Internship", "Networking", "Build Portfolio", "Research", "Open Source"];

const modes = ["Online", "Offline", "Hybrid"];
const availability = ["Weekdays", "Weekends", "Anytime"];
const experienceLevels: UserProfile["experienceLevel"][] = ["Beginner", "Intermediate", "Advanced"];

function ToggleGroup({
  label,
  values,
  selected,
  onToggle,
}: {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => {
          const active = selected.includes(value);
          return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onToggle(value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    active
                  ? "border-primary-border bg-primary-soft text-primary shadow-[0_10px_20px_rgba(124,58,237,0.12)] dark:bg-[rgba(124,58,237,0.18)] dark:text-[#E9D5FF]"
                  : "border-border bg-surface text-foreground hover:bg-muted"
                  )}
                >
                  {value}
                </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="border-border/70 bg-surface p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(() => getStoredUserProfile());

  const toggleMulti = (field: "domains" | "skills" | "goals") => (value: string) => {
    setProfile((current) => {
      const selected = current[field];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
      return { ...current, [field]: next };
    });
  };

  const saveProfile = () => {
    setStoredUserProfile(profile);
    toast.success("Profile Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                User Profile
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                User Profile
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Help HRAI understand your interests so we can recommend the most relevant hackathons.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-10 grid gap-4"
            >
              <Card className="border-border/70 bg-surface p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      MVP Demo User
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                      {profile.name || "Kartik Kumar"}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    MVP Demo User
                  </div>
                </div>
              </Card>

              <SectionCard title="Basic Information">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    value={profile.name}
                    onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                    placeholder="Name"
                  />
                  <Input
                    value={profile.college}
                    onChange={(event) => setProfile({ ...profile, college: event.target.value })}
                    placeholder="College"
                  />
                  <Input
                    value={profile.year}
                    onChange={(event) => setProfile({ ...profile, year: event.target.value })}
                    placeholder="Year"
                  />
                  <Input
                    value={profile.degree}
                    onChange={(event) => setProfile({ ...profile, degree: event.target.value })}
                    placeholder="Degree"
                  />
                </div>
              </SectionCard>

              <SectionCard title="Preferred Domains">
                <ToggleGroup label="" values={domains} selected={profile.domains} onToggle={toggleMulti("domains")} />
              </SectionCard>

              <SectionCard title="Skills">
                <ToggleGroup label="" values={skills} selected={profile.skills} onToggle={toggleMulti("skills")} />
              </SectionCard>

              <SectionCard title="Experience Level">
                <div className="flex flex-wrap gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setProfile({ ...profile, experienceLevel: level })}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      profile.experienceLevel === level
                          ? "border-primary-border bg-primary-soft text-primary shadow-[0_10px_20px_rgba(124,58,237,0.12)] dark:bg-[rgba(124,58,237,0.18)] dark:text-[#E9D5FF]"
                          : "border-border bg-surface text-foreground hover:bg-muted"
                    )}
                  >
                    {level}
                  </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Goals">
                <ToggleGroup label="" values={goals} selected={profile.goals} onToggle={toggleMulti("goals")} />
              </SectionCard>

              <SectionCard title="Preferred Mode">
                <div className="flex flex-wrap gap-2">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setProfile({ ...profile, preferredMode: mode })}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      profile.preferredMode === mode
                          ? "border-primary-border bg-primary-soft text-primary shadow-[0_10px_20px_rgba(124,58,237,0.12)] dark:bg-[rgba(124,58,237,0.18)] dark:text-[#E9D5FF]"
                          : "border-border bg-surface text-foreground hover:bg-muted"
                    )}
                  >
                    {mode}
                  </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Availability">
                <div className="flex flex-wrap gap-2">
                  {availability.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProfile({ ...profile, availability: item })}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      profile.availability === item
                          ? "border-primary-border bg-primary-soft text-primary shadow-[0_10px_20px_rgba(124,58,237,0.12)] dark:bg-[rgba(124,58,237,0.18)] dark:text-[#E9D5FF]"
                          : "border-border bg-surface text-foreground hover:bg-muted"
                    )}
                  >
                    {item}
                  </button>
                ))}
                </div>
              </SectionCard>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={saveProfile}
                  className="h-12 px-6 text-base"
                >
                  Save Preferences
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
