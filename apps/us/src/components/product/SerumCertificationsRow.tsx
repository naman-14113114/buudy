const CERTIFICATIONS = [
  {
    title: "FDA Registered",
    icon: "/images/certifications/fda-registered.svg",
  },
  {
    title: "B Corporation",
    icon: "/images/certifications/b-corp.svg",
  },
  {
    title: "Good Manufacturing Practice",
    icon: "/images/certifications/gmp-certified.svg",
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
              className="flex items-center justify-center w-full h-14 sm:h-16 md:h-20"
            >
              <img
                src={badge.icon}
                alt={badge.title}
                className="max-h-full max-w-full object-contain opacity-90 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
