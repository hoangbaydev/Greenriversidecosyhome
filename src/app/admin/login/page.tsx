"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginAdmin } from "@/lib/firebase/auth";
import { Toaster, toast } from "sonner";
import { isEnvValid } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAdminI18n } from "@/components/admin/AdminI18nProvider";
import { AdminLanguageSwitcher } from "@/components/admin/AdminLanguageSwitcher";
import { ShieldAlert, ArrowRight, ShieldCheck } from "lucide-react";

type LoginForm = { email: string; password: string };

export default function AdminLoginPage() {
  const router = useRouter();
  const { dict, locale } = useAdminI18n();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(dict?.login.invalidEmail ?? "Invalid email"),
        password: z
          .string()
          .min(6, dict?.login.passwordMin ?? "Password too short"),
      }),
    [dict]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    if (!dict) return;
    if (!isEnvValid()) {
      setError(dict.login.firebaseNotConfigured);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await loginAdmin(data.email, data.password);
      toast.success(dict.login.welcomeBack);
      router.push("/admin");
    } catch {
      setError(dict.login.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  if (!dict) {
    return null;
  }

  const websiteHref = locale === "vi" ? "/vi" : "/en";

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/4 -h-[350px] -w-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 -h-[300px] -w-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="absolute right-6 top-6 z-10 flex items-center gap-3">
          <AdminLanguageSwitcher />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-200/60 bg-white/85 p-8 shadow-xl backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-900/85">
          <div className="text-center space-y-2.5">
            {/* Shield Logo Wrapper */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary-dark/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dict.login.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500 leading-normal">
                {dict.login.subtitle}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-semibold text-gray-700 dark:text-gray-300">
                {dict.login.email}
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={dict.login.emailPlaceholder}
                autoComplete="email"
                className="bg-white/60 dark:bg-gray-950/60 focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all rounded-xl mt-1"
              />
              {errors.email && (
                <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                  <ShieldAlert className="h-3 w-3" /> {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="font-semibold text-gray-700 dark:text-gray-300">
                {dict.login.password}
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                autoComplete="current-password"
                className="bg-white/60 dark:bg-gray-950/60 focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all rounded-xl mt-1"
              />
              {errors.password && (
                <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                  <ShieldAlert className="h-3 w-3" /> {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="flex gap-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">
                <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full h-11 rounded-xl shadow-md font-semibold text-sm transition-all hover:bg-primary-dark group" disabled={loading}>
              {loading ? (
                dict.login.signingIn
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  {dict.login.signIn} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 border-t border-gray-150/60 pt-6 dark:border-gray-800/60 text-center">
            <Link
              href={websiteHref}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark hover:underline"
            >
              {dict.login.backToWebsite}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
