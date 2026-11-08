import { PublicProfile } from "@/components/PublicProfile";

export default async function LandingPage({ params }: { params: Promise<{ vendor: string }> }) {
  const { vendor } = await params;
  return <PublicProfile handle={vendor} />;
}
