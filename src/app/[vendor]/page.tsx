import { Profile, DEFAULT_PROFILE } from '@/lib/types';
import { LinkBlock } from '@/components/LinkBlock';

interface LandingPageProps {
  params: { vendor: string };
}

export default function LandingPage({ params }: LandingPageProps) {
  const profile: Profile = DEFAULT_PROFILE;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center space-y-3 pb-8">
          <div className="h-20 w-20 rounded-full bg-gray-800 ring-2 ring-gray-700" />
          <h1 className="text-xl font-bold text-white">{profile.vendorName}</h1>
          <p className="text-sm text-gray-400">{profile.bio}</p>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs text-gray-500">{profile.handle}</span>
          </div>
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
        <p className="pt-8 text-center text-xs text-gray-600">
          Powered by Swiftree
        </p>
      </div>
    </main>
  );
}