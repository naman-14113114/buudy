const CERTIFICATIONS = [
  {
    title: "FDA Registered",
    icon: "/images/certifications/fda-registered.svg",
    className: "h-11 sm:h-13 md:h-15 w-auto max-w-[140px]",
  },
  {
    title: "B Corporation",
    icon: "/images/certifications/b-corp.svg",
    className: "h-16 sm:h-20 md:h-24 w-auto",
  },
  {
    title: "Good Manufacturing Practice",
    icon: "/images/certifications/gmp-certified.svg",
    className: "h-16 sm:h-18 md:h-22 w-auto",
  },
];

export function SerumCertificationsRow() {
  return (
    <section className="bg-[#f6ede2] py-8 md:py-12">
      <div className="buudy-wrap">
        <div className="grid grid-cols-3 items-center justify-items-center gap-6 md:gap-12 max-w-3xl mx-auto">
          {CERTIFICATIONS.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-full"
            >
              <img
                src={badge.icon}
                alt={badge.title}
                className={`${badge.className} object-contain opacity-100 transition-transform duration-200 hover:scale-105`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
