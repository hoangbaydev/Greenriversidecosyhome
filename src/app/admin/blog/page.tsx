"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, Sparkles, FileText, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  fetchAllBlogPosts,
  saveBlogPost,
  deleteBlogPost,
} from "@/services/blog.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import { useAdminI18n } from "@/components/admin/AdminI18nProvider";
import type { BlogPost, ContentStatus } from "@/types";
import { slugify, cn } from "@/lib/utils";

const emptyPost: Partial<BlogPost> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  category: "Travel Guide",
  tags: [],
  author: "Green Riverside Team",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  published: false,
  publishedAt: new Date().toISOString().split("T")[0],
  featured: false,
};

type TabType = "basics" | "content" | "media" | "seo";

export default function AdminBlogPage() {
  const { dict, locale } = useAdminI18n();
  const publicLocalePrefix = locale === "vi" ? "/vi" : "/en";
  const fetchList = useCallback(async () => {
    try {
      return await fetchAllBlogPosts();
    } catch {
      toast.error("Failed to load blog posts");
      return [] as BlogPost[];
    }
  }, []);

  const { data: posts, loading, reload } = useAdminLoader(fetchList, [] as BlogPost[]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("basics");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const id = editing.id || slugify(editing.title);
      const status: ContentStatus = editing.status || "draft";
      const featuredImage = editing.featuredImage || editing.coverImage || "";
      await saveBlogPost(id, {
        slug: editing.slug || slugify(editing.title),
        title: editing.title,
        excerpt: editing.excerpt || "",
        content: editing.content || "",
        featuredImage,
        coverImage: featuredImage,
        category: editing.category || "Travel Guide",
        tags: editing.tags || [],
        author: editing.author || "Green Riverside Team",
        seoTitle: editing.seoTitle || "",
        seoDescription: editing.seoDescription || "",
        status,
        published: status === "published",
        publishedAt: editing.publishedAt || new Date().toISOString().split("T")[0],
        featured: editing.featured ?? false,
        createdAt: editing.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast.success("Post saved successfully!");
      setEditing(null);
      reload();
    } catch {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteBlogPost(id);
      toast.success("Deleted successfully");
      reload();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  if (loading) return <TableSkeleton />;

  const seoTitlePreview = editing?.seoTitle || editing?.title || "";
  const seoDescPreview = editing?.seoDescription || editing?.excerpt || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Blog & Guides</h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">Create and manage travel stories, local recommendations, and news publications.</p>
        </div>
        {!editing && (
          <Button onClick={() => { setEditing({ ...emptyPost }); setActiveTab("basics"); }} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> New Blog Post
          </Button>
        )}
      </div>

      {editing && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-3 dark:border-gray-800 dark:bg-gray-950/20">
            {(["basics", "content", "media", "seo"] as TabType[]).map((tab) => (
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
                {tab === "basics" ? "1. Post Basics" : tab === "content" ? "2. Rich Content" : tab === "media" ? "3. Cover Image" : "4. SEO Options"}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {/* 1. Basics Tab */}
            {activeTab === "basics" && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="post-title">Post Title</Label>
                  <Input
                    id="post-title"
                    placeholder="e.g. 5 Things to Do in Phong Nha Ke Bang"
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="post-slug">URL Slug</Label>
                  <Input
                    id="post-slug"
                    placeholder="e.g. 5-things-to-do-in-phong-nha"
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="post-cat">Category</Label>
                  <Input
                    id="post-cat"
                    placeholder="e.g. Travel Guide, Local Food, News"
                    value={editing.category || ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="post-author">Author Name</Label>
                  <Input
                    id="post-author"
                    placeholder="e.g. Green Riverside Team"
                    value={editing.author || ""}
                    onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="post-date">Publish Date</Label>
                  <Input
                    id="post-date"
                    type="date"
                    value={editing.publishedAt || ""}
                    onChange={(e) => setEditing({ ...editing, publishedAt: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="post-status">Status</Label>
                  <select
                    id="post-status"
                    value={editing.status || "draft"}
                    onChange={(e) => setEditing({ ...editing, status: e.target.value as ContentStatus })}
                    className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="draft">{dict.common.draft}</option>
                    <option value="published">{dict.common.published}</option>
                  </select>
                </div>
                <div className="flex items-center gap-6 mt-4 sm:col-span-2">
                  <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                      checked={editing.featured ?? false}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    />
                    Feature Post / Pin to top
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="post-excerpt">Short Summary Excerpt (for lists)</Label>
                  <Textarea
                    id="post-excerpt"
                    placeholder="A quick 1-2 sentence preview to draw readers in..."
                    value={editing.excerpt || ""}
                    onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 2. Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-4">
                <Label>Post Content (HTML Rich Text)</Label>
                <RichTextEditor
                  content={editing.content || ""}
                  onChange={(content) => setEditing({ ...editing, content })}
                  className="mt-2 min-h-[400px]"
                />
              </div>
            )}

            {/* 3. Media Tab */}
            {activeTab === "media" && (
              <div>
                <Label className="text-base font-bold text-gray-800 dark:text-gray-200">Cover / Featured Image</Label>
                <p className="text-xs text-gray-400 mb-2">Upload a high-quality thumbnail image for the blog post card.</p>
                <ImageUploader
                  folder="blog"
                  images={editing.featuredImage ? [editing.featuredImage] : []}
                  onChange={(imgs) => setEditing({ ...editing, featuredImage: imgs[0] || "" })}
                  maxImages={1}
                  className="mt-2"
                />
              </div>
            )}

            {/* 4. SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3 text-sm text-primary">
                  <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{dict.common.seoTitle}</span>
                    <p className="mt-1 text-xs text-primary/80 leading-relaxed">{dict.common.seoHelp}</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="post-seo-title">{dict.common.customMetaTitle}</Label>
                      <span className={cn("text-xs font-bold", seoTitlePreview.length > 60 ? "text-rose-500" : "text-emerald-500")}>
                        {seoTitlePreview.length} / 60 {dict.common.characters}
                      </span>
                    </div>
                    <Input
                      id="post-seo-title"
                      placeholder="e.g. Complete Phong Nha Travel Guide | Green Riverside"
                      value={editing.seoTitle || ""}
                      onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="post-seo-desc">{dict.common.customMetaDescription}</Label>
                      <span className={cn("text-xs font-bold", seoDescPreview.length > 160 || seoDescPreview.length < 120 ? "text-amber-500" : "text-emerald-500")}>
                        {seoDescPreview.length} / 160 {dict.common.characters} ({dict.common.idealLength})
                      </span>
                    </div>
                    <Textarea
                      id="post-seo-desc"
                      placeholder={dict.common.emptySeoDescription}
                      value={editing.seoDescription || ""}
                      onChange={(e) => setEditing({ ...editing, seoDescription: e.target.value })}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Google Snippet Simulator */}
                <div className="border-t border-gray-150 pt-5 dark:border-gray-800">
                  <Label className="text-sm font-semibold text-gray-500">{dict.common.seoPreview}</Label>
                  <div className="mt-2.5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950/40">
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <Globe className="h-3 w-3" /> https://greenriversidecosyhome.com &gt; blog &gt; {editing.slug || "post-slug"}
                    </p>
                    <h4 className="mt-1 text-lg font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer leading-tight">
                      {seoTitlePreview || dict.common.emptySeoTitle}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-normal">
                      {seoDescPreview || dict.common.emptySeoDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/20">
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} size="default" className="min-w-[100px]">
                {saving ? dict.common.saving : dict.common.save}
              </Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>
                {dict.common.cancel}
              </Button>
            </div>
            {activeTab !== "seo" && (
              <Button variant="outline" size="sm" onClick={() => {
                const tabs: TabType[] = ["basics", "content", "media", "seo"];
                const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
                setActiveTab(tabs[nextIdx]);
              }}>
                {dict.crud.rooms.form.next}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Grid of Blog posts list */}
      <div className="mt-8 space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">All Blog Posts ({posts.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="border border-gray-200 shadow-sm bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {post.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400"><FileText className="h-8 w-8" /></div>
                )}
                {/* Status Badges Overlay */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {post.status === "published" || post.published ? (
                    <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">{dict.common.published}</span>
                  ) : (
                    <span className="rounded bg-gray-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">{dict.common.draft}</span>
                  )}
                  {post.featured && (
                    <span className="rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-white text-white" /> {dict.common.featured}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-semibold">{post.category} - {post.publishedAt || "No Date"}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">By {post.author || "Admin"}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(post); setActiveTab("basics"); }} title={dict.common.edit}>
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <a href={`${publicLocalePrefix}/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title={dict.common.viewPublicPage}>
                      <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id, post.title)}
                      title={dict.common.delete}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No blog posts yet. Add your first post to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
