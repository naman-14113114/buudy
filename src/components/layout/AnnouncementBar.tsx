import { announcementItems } from "@/data/navigation";

export function AnnouncementBar() {
  const items = [...announcementItems, ...announcementItems, ...announcementItems];

  return (
    <div className="overflow-hidden bg-[var(--plum)] py-3 text-[var(--cream)]">
      <div className="buudy-marquee">
        {items.map((item, index) => (
          <span className="buudy-mono whitespace-nowrap" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
