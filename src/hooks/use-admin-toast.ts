"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { useAdminDict } from "@/components/admin/AdminI18nProvider";

export function useAdminToast() {
  const { common: c } = useAdminDict();

  return useMemo(
    () => ({
      saved: () => toast.success(c.saved),
      deleted: () => toast.success(c.deleted),
      failedToLoad: () => toast.error(c.failedToLoad),
      failedToSave: () => toast.error(c.failedToSave),
      failedToDelete: () => toast.error(c.failedToDelete),
      titleRequired: () => toast.error(c.titleRequired),
      authorRequired: () => toast.error(c.authorRequired),
      uploadRequired: () => toast.error(c.uploadRequired),
      confirmDelete: (itemLabel?: string) =>
        window.confirm(itemLabel ? `${c.confirmDelete} ${itemLabel}?` : c.confirmDelete),
    }),
    [c]
  );
}
