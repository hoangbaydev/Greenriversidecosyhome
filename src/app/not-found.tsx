import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 font-heading text-h2 text-text">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/en"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90"
        >
          Go Home
        </Link>
        <WhatsAppButton messageType="general" label="Contact Us" variant="secondary" />
      </div>
    </div>
  );
}
