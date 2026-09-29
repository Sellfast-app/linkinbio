import { MOCK_PROFILE } from "@/lib/mock";
import { LinkBlock } from "@/components/LinkBlock";

export default function LandingPage() {
  const profile = MOCK_PROFILE;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center space-y-3 pb-8">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4FCA6A] to-[#3BA65A] ring-4 ring-[#D1FFDB]" />
          <h1 className="text-xl font-bold text-gray-900">{profile.vendorName}</h1>
          <p className="text-sm text-gray-600 text-center">{profile.bio}</p>
          <span className="text-xs text-gray-400">{profile.handle}</span>
        </div>

        {/* Link Blocks */}
        <div className="space-y-3">
          {profile.links
            .filter((link) => link.isActive)
            .sort((a, b) => a.order - b.order)
            .map((link, index) => (
              <LinkBlock key={link.id} link={link} index={index} />
            ))}
        </div>

        {/* Footer */}
        <p className="pt-8 text-center text-xs text-gray-400">
          Powered by Swiftree
        </p>
      </div>
    </main>
  );
}