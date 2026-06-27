"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bot } from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { hackathons } from "@/data/hackathons";
import { HackathonCard } from "@/features/hackathons/components/hackathon-card";
import { useEnrolledHackathons } from "@/features/hackathons/hooks";
import { addHackathon, removeHackathon } from "@/features/hackathons/storage";
import { recommendHackathons } from "@/features/recommendation/recommendationEngine";
import { defaultUserProfile, getStoredUserProfile } from "@/features/profile/storage";
import type { UserProfile } from "@/features/profile/storage";

export default function HraiPage() {
  const [profile, setProfile] = useState<UserProfile>(() => getStoredUserProfile());
  const { trackedIds } = useEnrolledHackathons(hackathons);

  useEffect(() => {
    const sync = () => setProfile(getStoredUserProfile());
    window.addEventListener("storage", sync);
    window.addEventListener("hackradar-profile-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("hackradar-profile-updated", sync);
    };
  }, []);

  const recommendations = useMemo(() => recommendHackathons(hackathons, profile), [profile]);

  const handleTrack = (hackathonId: string) => {
    const result = addHackathon(hackathonId);
    if (result.status === "duplicate") {
      toast("Already Tracking");
      return;
    }
    toast.success("Added to Enrolled");
  };

  const handleRemove = (hackathonId: string) => {
    removeHackathon(hackathonId);
    toast.success("Tracking Removed");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                HRAI
              </div>
              <h1 className="mt-5 flex items-center gap-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <Bot className="size-8" />
                HRAI
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                AI-powered hackathon recommendations tailored to your profile.
              </p>
            </div>

            <Card className="mt-10 border-border/70 bg-surface p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Hello, {profile.name || "Kartik Kumar"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Based on your profile, HRAI has selected these hackathons for you.
              </p>
            </Card>

            {recommendations.length > 0 ? (
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommendations.map((item, index) => (
                  <HackathonCard
                    key={item.hackathon.id}
                    hackathon={item.hackathon}
                    index={index}
                    recommendationScore={item.matchScore}
                    recommendationReasons={item.reasons}
                    tracked={trackedIds.includes(item.hackathon.id)}
                    onTrack={(hackathon) => handleTrack(hackathon.id)}
                    onRemove={(hackathon) => handleRemove(hackathon.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10">
                <Card className="border-border/70 bg-surface px-6 py-14 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:px-10 sm:py-16">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    No Perfect Matches Found
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    Update your profile preferences to discover more hackathons.
                  </p>
                  <div className="mt-8">
                    <Button asChild className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:text-white">
                      <Link href="/profile">Update Profile</Link>
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
