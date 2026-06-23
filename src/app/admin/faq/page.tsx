"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  deleteFaq,
  fetchFaqsByLocale,
  fetchFaqSection,
  saveFaq,
  saveFaqSection,
} from "@/services/faq.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import { useAdminDict } from "@/components/admin/AdminI18nProvider";
import { useAdminToast } from "@/hooks/use-admin-toast";
import type { Faq } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const LOCALES: Locale[] = ["en", "vi"];

type FaqAdminData = {
  items: Faq[];
  title: string;
  subtitle: string;
};

const emptyData = (): FaqAdminData => ({ items: [], title: "", subtitle: "" });

const emptyFaq = (locale: Locale, order: number): Partial<Faq> => ({
  locale,
  question: "",
  answer: "",
  order,
  published: true,
});

export default function AdminFaqPage() {
  const dict = useAdminDict();
  const t = useAdminToast();
  const faqDict = dict.crud.faq;

  const [locale, setLocale] = useState<Locale>("en");
  const [sectionDraft, setSectionDraft] = useState<{ title?: string; subtitle?: string }>({});
  const [savingSection, setSavingSection] = useState(false);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [savingFaq, setSavingFaq] = useState(false);

  const fetchData = useCallback(async (): Promise<FaqAdminData> => {
    try {
      const [section, items] = await Promise.all([
        fetchFaqSection(locale),
        fetchFaqsByLocale(locale),
      ]);
      return {
        items: (items || []).sort((a, b) => a.order - b.order),
        title: section?.title ?? "",
        subtitle: section?.subtitle ?? "",
      };
    } catch {
      t.failedToLoad();
      return emptyData();
    }
  }, [locale, t]);

  const { data, loading, reload } = useAdminLoader(fetchData, emptyData());

  const sectionTitle = sectionDraft.title ?? data.title;
  const sectionSubtitle = sectionDraft.subtitle ?? data.subtitle;

  const handleSaveSection = async () => {
    if (!sectionTitle.trim()) {
      t.titleRequired();
      return;
    }
    setSavingSection(true);
    try {
      await saveFaqSection(locale, {
        title: sectionTitle.trim(),
        subtitle: sectionSubtitle.trim(),
      });
      setSectionDraft({});
      t.saved();
      await reload();
    } catch {
      t.failedToSave();
    } finally {
      setSavingSection(false);
    }
  };

  const handleSaveFaq = async () => {
    if (!editing?.question?.trim() || !editing.answer?.trim()) {
      t.titleRequired();
      return;
    }
    setSavingFaq(true);
    try {
      const id =
        editing.id ||
        `${locale}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      await saveFaq(id, {
        locale,
        question: editing.question.trim(),
        answer: editing.answer.trim(),
        order: editing.order ?? data.items.length,
        published: editing.published ?? true,
      });
      t.saved();
      setEditing(null);
      await reload();
    } catch {
      t.failedToSave();
    } finally {
      setSavingFaq(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!t.confirmDelete()) return;
    try {
      await deleteFaq(id);
      t.deleted();
      await reload();
    } catch {
      t.failedToDelete();
    }
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
            {faqDict.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Configure page descriptions and localized FAQs accordion items.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl dark:bg-gray-800 self-start sm:self-center">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setSectionDraft({});
                setEditing(null);
              }}
              className={cn(
                "rounded-lg px-4 py-1.5 text-xs font-bold transition-all uppercase",
                locale === l
                  ? "bg-white text-primary shadow-sm dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              {l === "en" ? "English" : "Tiếng Việt"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Section Header Settings */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> {faqDict.sectionHeading}
            </h2>
            <p className="mt-1.5 text-xs text-gray-500 leading-relaxed mb-4">Update the titles and intro paragraphs shown at the top of the public FAQ tab.</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="faq-sec-title">{faqDict.sectionTitle}</Label>
                <Input
                  id="faq-sec-title"
                  value={sectionTitle}
                  onChange={(e) =>
                    setSectionDraft((d) => ({ ...d, title: e.target.value }))
                  }
                  className="mt-1.5"
                  placeholder={faqDict.sectionTitlePlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="faq-sec-sub">{faqDict.sectionSubtitle}</Label>
                <Textarea
                  id="faq-sec-sub"
                  value={sectionSubtitle}
                  onChange={(e) =>
                    setSectionDraft((d) => ({ ...d, subtitle: e.target.value }))
                  }
                  className="mt-1.5"
                  rows={3}
                  placeholder={faqDict.sectionSubtitlePlaceholder}
                />
              </div>
              <Button className="w-full" onClick={handleSaveSection} disabled={savingSection}>
                {savingSection ? dict.common.saving : faqDict.saveSection}
              </Button>
            </div>
          </Card>
        </div>

        {/* FAQs Accordions list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" /> {faqDict.questionsHeading} ({data.items.length})
            </h2>
            {!editing && (
              <Button size="sm" onClick={() => setEditing(emptyFaq(locale, data.items.length))} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> {faqDict.addQuestion}
              </Button>
            )}
          </div>

          {editing && (
            <Card className="border border-primary/20 bg-primary/5 p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-heading text-base font-bold text-gray-950 dark:text-white">
                {editing.id ? faqDict.editQuestion : faqDict.addQuestion}
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="faq-q">{faqDict.questionLabel}</Label>
                  <Input
                    id="faq-q"
                    value={editing.question ?? ""}
                    onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                    className="mt-1.5 bg-white dark:bg-gray-950"
                  />
                </div>
                <div>
                  <Label htmlFor="faq-a">{faqDict.answerLabel}</Label>
                  <Textarea
                    id="faq-a"
                    value={editing.answer ?? ""}
                    onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
                    className="mt-1.5 bg-white dark:bg-gray-950 min-h-[120px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="faq-ord">{faqDict.orderLabel}</Label>
                    <Input
                      id="faq-ord"
                      type="number"
                      min={0}
                      value={editing.order ?? 0}
                      onChange={(e) =>
                        setEditing({ ...editing, order: Number(e.target.value) })
                      }
                      className="mt-1.5 bg-white dark:bg-gray-950"
                    />
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                        checked={editing.published ?? true}
                        onChange={(e) =>
                          setEditing({ ...editing, published: e.target.checked })
                        }
                      />
                      {dict.common.published}
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <Button onClick={handleSaveFaq} disabled={savingFaq}>
                  {savingFaq ? dict.common.saving : dict.common.save}
                </Button>
                <Button variant="ghost" onClick={() => setEditing(null)}>
                  {dict.common.cancel}
                </Button>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            {data.items.map((item) => (
              <Card
                key={item.id}
                className="flex items-start justify-between gap-4 border border-gray-200 bg-white p-5 shadow-sm hover:border-primary/20 hover:shadow transition-all dark:border-gray-800 dark:bg-gray-900 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark">
                      <HelpCircle className="h-3.5 w-3.5" />
                    </span>
                    <p className="font-heading font-bold text-gray-900 group-hover:text-primary dark:text-white transition-colors">{item.question}</p>
                    {!item.published && (
                      <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        {faqDict.draft}
                      </span>
                    )}
                  </div>
                  <p className="mt-3.5 pl-8 text-sm leading-relaxed text-gray-550 dark:text-gray-400 whitespace-pre-line">{item.answer}</p>
                  <p className="mt-2 pl-8 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Display Order: {item.order}</p>
                </div>
                <div className="flex shrink-0 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(item)} title="Edit FAQ">
                    <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} title="Delete FAQ">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
            {data.items.length === 0 && (
              <div className="text-center py-12 text-gray-400 font-medium">
                {faqDict.empty}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
