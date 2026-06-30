import { Navbar } from "@/components/layout/navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Dashboard
              </p>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Welcome back to HackRadar
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Your personalized opportunities, alerts, and hackathon tracking live here.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
