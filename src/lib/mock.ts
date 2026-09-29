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

export const MOCK_PROFILE: Profile = {
  vendorName: "Fresh Flavours Kitchen",
  handle: "@freshflavours",
  avatarUrl: "",
  bio: "🍽️ Authentic Nigerian cuisine | 📦 Delivery across Lagos | 🛒 Order now",
  links: [
    {
      id: "1",
      platform: "Shop via Website",
      url: "https://freshflavours.store",
      icon: "globe",
      order: 0,
      isActive: true,
    },
    {
      id: "2",
      platform: "Shop via Web Chat",
      url: "https://chat.freshflavours.store",
      icon: "message-circle",
      order: 1,
      isActive: true,
    },
    {
      id: "3",
      platform: "Shop via WhatsApp",
      url: "https://wa.me/2348012345678",
      icon: "message-square",
      order: 2,
      isActive: true,
    },
  ],
};