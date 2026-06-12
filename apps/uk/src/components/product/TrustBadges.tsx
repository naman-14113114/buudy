import Image from "next/image";

export function TrustBadges() {
  const badges = [
    {
      title: "Free Shipping all over UK",
      icon: "/media/products/buudy-led-mask/images/i3.png", // Truck
    },
    {
      title: "Dermatologist Reviewed",
      icon: "/media/products/buudy-led-mask/images/i4.png", // Shield
    },
    {
      title: "Buy Now, Pay Later Options Available",
      icon: "/media/products/buudy-led-mask/images/i2.png", // Drop with $
    },
    {
      title: "Proven Results, Backed By Science",
      icon: "/media/products/buudy-led-mask/images/i1.png", // Atom
    },
  ];

  return (
    <section className="hidden md:block bg-[#f6ede2] pt-2 md:pt-4 pb-14 md:pb-24">
      <div className="buudy-wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left justify-center mx-auto w-full">
              <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 flex-none opacity-90">
                <img
                  src={badge.icon}
                  alt={badge.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-medium text-[var(--plum)] leading-snug text-sm md:text-base max-w-[180px]">
                {badge.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
