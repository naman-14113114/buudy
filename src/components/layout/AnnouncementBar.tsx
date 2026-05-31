import { announcementItems } from "@/data/navigation";

export function AnnouncementBar() {
  const items = [...announcementItems, ...announcementItems, ...announcementItems];

  return (
    <div className="overflow-hidden bg-[var(--plum)] py-3 text-[var(--cream)]">
      <div className="buudy-marquee buudy-marquee-slow flex items-center gap-6">
        {items.map((item, index) => (
          <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap flex items-center gap-6" key={`${item}-${index}`}>
            {item}
            <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
