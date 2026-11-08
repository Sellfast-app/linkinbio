"use client";

import { useEffect, useState } from "react";
import { LinkBlock } from "@/components/LinkBlock";
import type { Profile } from "@/lib/types";

type PublicProfileData = Profile & { storeId: string };

export function PublicProfile({ handle }: { handle: string }) {
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`/api/profile/public/${encodeURIComponent(handle)}`, { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Profile not found");
        return result.data;
      })
      .then((data) => {
        if (!active) return;
        setProfile(data);
        const visitorKey = `swiftree-linkinbio-visitor:${data.storeId}`;
        const visitorSessionId = sessionStorage.getItem(visitorKey) || crypto.randomUUID();
        sessionStorage.setItem(visitorKey, visitorSessionId);
        void fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storeId: data.storeId, type: "linkinbio.view", payload: { visitor_session_id: visitorSessionId } }),
        });
      })
      .catch((reason: unknown) => active && setError(reason instanceof Error ? reason.message : "Unable to load profile"));
    return () => { active = false; };
  }, [handle]);

  if (error) return <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 text-center text-sm text-gray-600">{error}</main>;
  if (!profile) return <main className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">Loading profile...</main>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-3 pb-8">
          {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.vendorName} className="h-24 w-24 rounded-full object-cover ring-4 ring-[#D1FFDB]" /> :
            <div aria-hidden="true" className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D1FFDB] text-2xl font-semibold text-[#3BA65A]">{profile.vendorName.slice(0, 1).toUpperCase()}</div>}
          <h1 className="text-xl font-bold text-gray-900">{profile.vendorName}</h1>
          <p className="text-center text-sm text-gray-600">{profile.bio}</p>
          <span className="text-xs text-gray-400">@{profile.handle}</span>
        </div>
        <div className="space-y-3">
          {profile.links.filter((link) => link.isActive).sort((a, b) => a.order - b.order).map((link, index) => (
            <LinkBlock key={link.id} link={link} index={index} storeId={profile.storeId} />
          ))}
        </div>
        <p className="pt-8 text-center text-xs text-gray-400">Powered by Swiftree</p>
      </div>
    </main>
  );
}
