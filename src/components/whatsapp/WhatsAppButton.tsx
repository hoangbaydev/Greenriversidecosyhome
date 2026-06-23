"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getWhatsAppUrl, getZaloUrl, type WhatsAppMessageType } from "@/lib/whatsapp";
import { useWhatsAppNumber } from "@/hooks/use-whatsapp";
import { cn } from "@/lib/utils";

// Lucide-style Zalo icon
function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M8.5 8.5h7L10 15.5h6" />
    </svg>
  );
}

function WhatsAppAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.6l-.4-.2-3.9.9.9-3.8-.2-.4A10.4 10.4 0 1 1 16 26.1Zm5.8-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2.1-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"
      />
    </svg>
  );
}

interface WhatsAppButtonProps extends Omit<ButtonProps, "onClick"> {
  messageType?: WhatsAppMessageType;
  customMessage?: string;
  label?: string;
  showIcon?: boolean;
}

export function WhatsAppButton({
  messageType = "general",
  customMessage,
  label = "Contact Us on WhatsApp",
  showIcon = true,
  className,
  variant = "default",
  size = "default",
  ...props
}: WhatsAppButtonProps) {
  const phoneNumber = useWhatsAppNumber();
  if (!phoneNumber) return null;

  const handleClick = () => {
    window.open(
      getWhatsAppUrl(messageType, customMessage, phoneNumber),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      onClick={handleClick}
      {...props}
    >
      {showIcon && <MessageCircle className="h-4 w-4" />}
      {label}
    </Button>
  );
}

export function WhatsAppLink({
  messageType = "general",
  customMessage,
  children,
  className,
}: {
  messageType?: WhatsAppMessageType;
  customMessage?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const phoneNumber = useWhatsAppNumber();
  if (!phoneNumber) return <span className={className}>{children}</span>;

  return (
    <a
      href={getWhatsAppUrl(messageType, customMessage, phoneNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

interface ZaloButtonProps extends Omit<ButtonProps, "onClick"> {
  label?: string;
  showIcon?: boolean;
}

export function ZaloButton({
  label = "Chat on Zalo",
  showIcon = true,
  className,
  variant = "default",
  size = "default",
  ...props
}: ZaloButtonProps) {
  const phoneNumber = useWhatsAppNumber();
  if (!phoneNumber) return null;

  const handleClick = () => {
    window.open(
      getZaloUrl(phoneNumber),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-2 bg-[#0068FF] text-white hover:bg-[#0056D2] border-none shadow-sm transition-colors", className)}
      onClick={handleClick}
      {...props}
    >
      {showIcon && <ZaloIcon className="h-4.5 w-4.5" />}
      {label}
    </Button>
  );
}

export function ZaloLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const phoneNumber = useWhatsAppNumber();
  if (!phoneNumber) return <span className={className}>{children}</span>;

  return (
    <a
      href={getZaloUrl(phoneNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const phoneNumber = useWhatsAppNumber();

  if (pathname.startsWith("/admin") || !phoneNumber) return null;

  return (
    <div
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6"
    >
      {/* Zalo Floating Button */}
      <a
        href={getZaloUrl(phoneNumber)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Zalo"
        className="animate-pulse-zalo flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0068FF] text-white shadow-[0_10px_28px_rgba(0,104,255,0.28)] ring-1 ring-white/40 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
      >
        <span className="text-xs font-black tracking-tighter uppercase sm:text-sm">Zalo</span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={getWhatsAppUrl("general", undefined, phoneNumber)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="animate-pulse-whatsapp flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.28)] ring-1 ring-white/40 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
      >
        <WhatsAppAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      </a>
    </div>
  );
}
