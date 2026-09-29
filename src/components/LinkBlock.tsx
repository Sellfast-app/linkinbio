import Link from 'next/link';
import { Globe, MessageCircle, MessageSquare, ShoppingBag, Phone } from 'lucide-react';
import { Profile, LinkItem } from '@/lib/types';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  globe: Globe,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  shopping_bag: ShoppingBag,
  phone: Phone,
};

interface LinkBlockProps {
  link: LinkItem;
  index: number;
}

export function LinkBlock({ link, index }: LinkBlockProps) {
  const Icon = ICON_MAP[link.icon] || Globe;

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md hover:ring-gray-300 active:scale-[0.98]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-100">
        <Icon className="h-5 w-5 text-gray-700" />
      </div>
      <span className="text-sm font-medium text-gray-900">{link.platform}</span>
    </Link>
  );
}