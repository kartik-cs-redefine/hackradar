export const PROFILE_STORAGE_KEY = "hackradar-profile";

export type UserProfile = {
  name: string;
  college: string;
  year: string;
  degree: string;
  domains: string[];
  skills: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  goals: string[];
  preferredMode: string;
  availability: string;
};

export const defaultUserProfile: UserProfile = {
  name: "Kartik Kumar",
  college: "",
  year: "",
  degree: "",
  domains: ["AI", "Web Development"],
  skills: ["React", "Node.js", "Git", "GitHub"],
  experienceLevel: "Beginner",
  goals: ["Learning", "Build Portfolio"],
  preferredMode: "Online",
  availability: "Anytime",
};

export function getStoredUserProfile() {
  if (typeof window === "undefined") {
    return defaultUserProfile;
  }

  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      return defaultUserProfile;
    }

    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return {
      ...defaultUserProfile,
      ...parsed,
      domains: Array.isArray(parsed.domains) ? parsed.domains.filter(Boolean) : defaultUserProfile.domains,
      skills: Array.isArray(parsed.skills) ? parsed.skills.filter(Boolean) : defaultUserProfile.skills,
      goals: Array.isArray(parsed.goals) ? parsed.goals.filter(Boolean) : defaultUserProfile.goals,
    };
  } catch {
    return defaultUserProfile;
  }
}

export function setStoredUserProfile(profile: UserProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("hackradar-profile-updated"));
}
