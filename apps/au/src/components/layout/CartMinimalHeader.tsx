"use client";

import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export function CartMinimalHeader() {
  return (
    <header className="border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.96)]">
      <AnnouncementBar />

      <div className="buudy-wrap grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
        <span aria-hidden="true" />
        <Link
          aria-label="Buudy home"
          className="inline-flex shrink-0 items-center justify-self-center"
          href="/"
        >
          <Image
            alt="Buudy Logo"
            className="h-auto w-[132px] object-contain sm:w-[160px]"
            height={74}
            priority
            sizes="(min-width: 640px) 160px, 132px"
            src="/media/products/buudy-led-mask/images/ChatGPT Image May 31, 2026, 12_10_21 AM.png"
            width={220}
          />
        </Link>

        <span aria-hidden="true" />
      </div>
    </header>
  );
}
