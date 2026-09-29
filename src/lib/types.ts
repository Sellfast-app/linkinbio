export interface LinkItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface Profile {
  vendorName: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  links: LinkItem[];
}

export const DEFAULT_PROFILE: Profile = {
  vendorName: 'Swiftree Vendor',
  handle: '@vendor',
  avatarUrl: '',
  bio: 'Shop with us on Swiftree',
  links: [
    { id: '1', platform: 'Website', url: 'https://example.com', icon: 'globe', order: 0, isActive: true },
    { id: '2', platform: 'Web Chat', url: 'https://chat.example.com', icon: 'message-circle', order: 1, isActive: true },
    { id: '3', platform: 'WhatsApp', url: 'https://wa.me/2340000000000', icon: 'message-square', order: 2, isActive: true },
  ],
};