"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, Globe, Share2, Star } from "lucide-react";
import {
  fetchSiteSettings,
  saveSiteSettings,
  fetchContactInformation,
  saveContactInformation,
} from "@/services/settings.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSkeleton } from "@/components/ui/skeleton";
import type { SiteSettings, ContactInformation } from "@/types";
import { cn } from "@/lib/utils";

const emptySettings: SiteSettings = {
  siteName: "",
  tagline: "",
  logoUrl: "",
  whatsappNumber: "",
  phone: "",
  email: "",
  address: "",
  googleMapsUrl: "https://maps.app.goo.gl/pG4zBELktoPaRYtdA",
  socialLinks: {
    facebook: "https://www.facebook.com/greenriverguesthouse",
    instagram: "https://www.instagram.com/greenriversidecosyhomephongnha",
    tiktok: "https://www.tiktok.com/@greenriversidecosyhome",
  },
  seo: { defaultTitle: "", defaultDescription: "", ogImage: "" },
  reviewRatings: {
    booking: "",
    airbnb: "",
    hostelworld: "",
    tripadvisor: "",
    google: "",
  },
};

const emptyContact: ContactInformation = {
  phone: "",
  email: "",
  address: "",
  whatsapp: "",
  googleMapsEmbed: "",
  googleMapsUrl: "https://maps.app.goo.gl/pG4zBELktoPaRYtdA",
  openingHours: "",
};

type SettingTabType = "contact" | "social" | "brand" | "trust";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);
  const [contact, setContact] = useState<ContactInformation>(emptyContact);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingTabType>("contact");

  useEffect(() => {
    async function load() {
      try {
        const [s, c] = await Promise.all([
          fetchSiteSettings(),
          fetchContactInformation(),
        ]);
        if (s) setSettings(s);
        if (c) setContact(c);
      } catch {
        toast.error("Failed to load settings data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveSiteSettings(settings),
        saveContactInformation({
          ...contact,
          whatsapp: settings.whatsappNumber,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          googleMapsUrl: settings.googleMapsUrl,
        }),
      ]);
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Global Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Configure contact coordinates, brand identities, links, and fallback SEO descriptors.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        {/* Tab Navigation Header */}
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-3 dark:border-gray-800 dark:bg-gray-950/20">
          {(["contact", "social", "brand", "trust"] as SettingTabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-sm font-semibold capitalize transition-all focus:outline-none focus:ring-0",
                activeTab === tab
                  ? "border-primary text-primary dark:border-primary-dark"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              )}
            >
              {tab === "contact"
                ? "1. Contact Information"
                : tab === "social"
                  ? "2. Social Media Accounts"
                  : tab === "brand"
                    ? "3. Brand & SEO Fallbacks"
                    : "4. Trust Scores"}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Details Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Phone className="h-5 w-5" /> Coordinate Parameters
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="set-wa">WhatsApp Number (e.g. 84778508898)</Label>
                  <Input
                    id="set-wa"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="mt-1.5"
                    placeholder="84778508898"
                  />
                </div>
                <div>
                  <Label htmlFor="set-ph">Public Phone Call</Label>
                  <Input
                    id="set-ph"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="set-em">Email Address</Label>
                  <Input
                    id="set-em"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="set-hours">Opening Hours Note</Label>
                  <Input
                    id="set-hours"
                    value={contact.openingHours}
                    onChange={(e) => setContact({ ...contact, openingHours: e.target.value })}
                    className="mt-1.5"
                    placeholder="e.g. Open 24/7"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-addr">Physical Address</Label>
                  <Textarea
                    id="set-addr"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="mt-1.5"
                    rows={2}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-gmap">Google Maps Navigation URL</Label>
                  <Input
                    id="set-gmap"
                    value={settings.googleMapsUrl}
                    onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-gmap-embed">Google Maps IFrame Embed Src Link</Label>
                  <Input
                    id="set-gmap-embed"
                    value={contact.googleMapsEmbed}
                    onChange={(e) => setContact({ ...contact, googleMapsEmbed: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Channels Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Share2 className="h-5 w-5" /> Social Media Linkings
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="set-fb">Facebook URL</Label>
                  <Input
                    id="set-fb"
                    value={settings.socialLinks.facebook || ""}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: e.target.value } })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="set-ig">Instagram URL</Label>
                  <Input
                    id="set-ig"
                    value={settings.socialLinks.instagram || ""}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="set-tiktok">TikTok URL</Label>
                  <Input
                    id="set-tiktok"
                    value={settings.socialLinks.tiktok || ""}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, tiktok: e.target.value } })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="set-yt">YouTube Channel URL</Label>
                  <Input
                    id="set-yt"
                    value={settings.socialLinks.youtube || ""}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, youtube: e.target.value } })}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Brand & SEO Tab */}
          {activeTab === "brand" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Globe className="h-5 w-5" /> Brand Identity & Search Parameters
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="set-site-name">Site Display Name</Label>
                  <Input
                    id="set-site-name"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="set-logo">Logo Asset URL</Label>
                  <Input
                    id="set-logo"
                    value={settings.logoUrl || ""}
                    onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                    className="mt-1.5"
                    placeholder="/logo.png"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-tag">Site Slogan / Tagline</Label>
                  <Input
                    id="set-tag"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-book-lbl">Book Button Call-to-action text</Label>
                  <Input
                    id="set-book-lbl"
                    value={settings.bookNowLabel || ""}
                    onChange={(e) => setSettings({ ...settings, bookNowLabel: e.target.value })}
                    className="mt-1.5"
                    placeholder="e.g. Book Now"
                  />
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-5 dark:border-gray-800">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">Global Fallback Meta tags</span>
                  <p className="text-xs text-gray-400 mb-3">Defaults applied automatically to pages that lack custom overrides.</p>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-seo-t">Global SEO Meta Title</Label>
                  <Input
                    id="set-seo-t"
                    value={settings.seo.defaultTitle}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, defaultTitle: e.target.value } })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="set-seo-d">Global SEO Meta Description</Label>
                  <Textarea
                    id="set-seo-d"
                    value={settings.seo.defaultDescription}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, defaultDescription: e.target.value } })}
                    className="mt-1.5"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "trust" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Star className="h-5 w-5" /> Manual Review Platform Scores
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
                These numbers are displayed above the Guest Reviews carousel as social proof. Enter them manually from each platform.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="trust-booking">Booking.com Rating</Label>
                  <Input
                    id="trust-booking"
                    value={settings.reviewRatings?.booking || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reviewRatings: { ...settings.reviewRatings, booking: e.target.value },
                      })
                    }
                    className="mt-1.5"
                    placeholder="9.4 / 10"
                  />
                </div>
                <div>
                  <Label htmlFor="trust-airbnb">Airbnb Rating</Label>
                  <Input
                    id="trust-airbnb"
                    value={settings.reviewRatings?.airbnb || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reviewRatings: { ...settings.reviewRatings, airbnb: e.target.value },
                      })
                    }
                    className="mt-1.5"
                    placeholder="4.9 / 5"
                  />
                </div>
                <div>
                  <Label htmlFor="trust-hostelworld">Hostelworld Rating</Label>
                  <Input
                    id="trust-hostelworld"
                    value={settings.reviewRatings?.hostelworld || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reviewRatings: { ...settings.reviewRatings, hostelworld: e.target.value },
                      })
                    }
                    className="mt-1.5"
                    placeholder="9.6 / 10"
                  />
                </div>
                <div>
                  <Label htmlFor="trust-tripadvisor">Tripadvisor Rating</Label>
                  <Input
                    id="trust-tripadvisor"
                    value={settings.reviewRatings?.tripadvisor || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reviewRatings: { ...settings.reviewRatings, tripadvisor: e.target.value },
                      })
                    }
                    className="mt-1.5"
                    placeholder="5 / 5"
                  />
                </div>
                <div>
                  <Label htmlFor="trust-google">Google Rating</Label>
                  <Input
                    id="trust-google"
                    value={settings.reviewRatings?.google || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reviewRatings: { ...settings.reviewRatings, google: e.target.value },
                      })
                    }
                    className="mt-1.5"
                    placeholder="4.8 / 5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer save controls */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/20">
          <Button onClick={handleSave} disabled={saving} size="default" className="min-w-[120px]">
            {saving ? "Saving..." : "Save Settings"}
          </Button>
          {activeTab !== "trust" && (
            <Button variant="outline" size="sm" onClick={() => {
              const tabs: SettingTabType[] = ["contact", "social", "brand", "trust"];
              const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
              setActiveTab(tabs[nextIdx]);
            }}>
              Next Step &rarr;
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
