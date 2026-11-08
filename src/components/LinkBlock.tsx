import Link from 'next/link';
import { Globe, MessageCircle, MessageSquare, ShoppingBag, Music, Link2 } from 'lucide-react';
import { Profile, LinkItem } from '@/lib/types';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  globe: Globe,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  shopping_bag: ShoppingBag,
  instagram: InstagramIcon,
  music: Music,
  'link-2': Link2,
};

interface LinkBlockProps {
  link: LinkItem;
  index: number;
  storeId?: string;
}

export function LinkBlock({ link, index, storeId }: LinkBlockProps) {
  const Icon = ICON_MAP[link.icon] || Globe;
  const destination = (() => {
    try {
      const url = new URL(link.url);
      const isStorefront = url.hostname === "storefront.swiftree.app" || url.hostname.endsWith(".swiftree.app");
      if (isStorefront) {
        url.searchParams.set("utm_source", "swiftree_linkinbio");
        url.searchParams.set("utm_medium", "profile_link");
        url.searchParams.set("utm_content", link.id);
      }
      return url.toString();
    } catch {
      return link.url;
    }
  })();

  return (
    <Link
      href={destination}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        const visitorKey = storeId ? `swiftree-linkinbio-visitor:${storeId}` : "";
        const visitorSessionId = visitorKey ? sessionStorage.getItem(visitorKey) : null;
        if (storeId) void fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storeId, type: 'linkinbio.click', payload: { link_id: link.id, platform: link.platform, ...(visitorSessionId ? { visitor_session_id: visitorSessionId } : {}) } }),
        });
      }}
      className="group flex w-full items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md hover:ring-[#4FCA6A] active:scale-[0.98]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D1FFDB] group-hover:bg-[#4FCA6A] group-hover:text-white">
        <Icon className="h-5 w-5 text-[#3BA65A] group-hover:text-white" />
      </div>
      <span className="text-sm font-medium text-gray-900">{link.platform}</span>
    </Link>
  );
}
