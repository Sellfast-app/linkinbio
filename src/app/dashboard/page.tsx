'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Globe, MessageCircle, MessageSquare, ShoppingBag, Link2 } from 'lucide-react';
import { Profile, LinkItem } from '@/lib/types';
import { MOCK_PROFILE } from '@/lib/mock';

const ICON_OPTIONS = [
  { value: 'globe', label: 'Website', icon: Globe },
  { value: 'message-circle', label: 'Web Chat', icon: MessageCircle },
  { value: 'message-square', label: 'WhatsApp', icon: MessageSquare },
  { value: 'shopping_bag', label: 'Shop', icon: ShoppingBag },
  { value: 'link-2', label: 'Custom Link', icon: Link2 },
];

export default function LinkDashboard() {
  const [profile, setProfile] = useState<Profile>(MOCK_PROFILE);

  const updateLink = (id: string, field: keyof LinkItem, value: string | boolean | number) => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    }));
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      platform: 'New Link',
      url: '',
      icon: 'globe',
      order: profile.links.length,
      isActive: true,
    };
    setProfile((prev) => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const removeLink = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Link-in-Bio</h1>
          <p className="text-sm text-gray-500">Manage the links shown on your Swiftree profile page</p>
        </div>

        {/* Profile Preview */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div className="space-y-1">
              <input
                type="text"
                value={profile.vendorName}
                onChange={(e) => setProfile((prev) => ({ ...prev, vendorName: e.target.value }))}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={profile.bio}
                onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Tell customers about your store"
              />
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Links</h2>
            <button
              onClick={addLink}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-secondary"
            >
              <Plus className="h-3.5 w-3.5" /> Add Link
            </button>
          </div>

          <div className="space-y-3">
            {profile.links
              .filter((link) => link.isActive)
              .sort((a, b) => a.order - b.order)
              .map((link, index) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                >
                  <GripVertical className="h-4 w-4 text-gray-300" />
                  <select
                    value={link.icon}
                    onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
                    className="rounded border border-gray-200 px-2 py-1 text-xs"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                    className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs"
                    placeholder="Label"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                    className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs"
                    placeholder="https://"
                  />
                  <button
                    onClick={() => removeLink(link.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}