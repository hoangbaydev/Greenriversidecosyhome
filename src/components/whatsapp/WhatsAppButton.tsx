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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5">
      {/* Zalo Floating Button */}
      <a
        href={getZaloUrl(phoneNumber)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Zalo"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF] focus-visible:ring-offset-2 animate-pulse-zalo"
      >
        <span className="text-[11px] font-black tracking-tighter uppercase">Zalo</span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={getWhatsAppUrl("general", undefined, phoneNumber)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 animate-pulse-whatsapp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

