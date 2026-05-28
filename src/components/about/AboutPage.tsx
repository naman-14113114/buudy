import Image from "next/image";
import { aboutHero, aboutSections } from "@/data/about";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-24 md:py-36 text-center bg-black">
        {/* Desktop Hero Image */}
        <div className="absolute inset-0 hidden md:block select-none pointer-events-none">
          <Image
            alt="Buudy Storefront Desktop Banner"
            src={aboutHero.imageDesktop}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
        
        {/* Mobile Hero Image */}
        <div className="absolute inset-0 block md:hidden select-none pointer-events-none">
          <Image
            alt="Buudy Storefront Mobile Banner"
            src={aboutHero.imageMobile}
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        </div>

        {/* Hero Content Wrapper */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <p className="buudy-mono text-[var(--gold)] tracking-[0.2em] uppercase text-xs sm:text-sm font-semibold">
            {aboutHero.eyebrow}
          </p>
          <h1 className="buudy-display mt-4 text-[2.8rem] leading-[1.05] text-[var(--cream)] sm:text-[3.5rem] md:text-7xl font-light">
            Welcome to <em className="buudy-italic">Buudy.com</em>
          </h1>
          <p className="mt-8 text-base sm:text-lg leading-8 text-[rgba(247,241,232,0.85)] max-w-2xl mx-auto font-light">
            {aboutHero.copy}
          </p>
        </div>
        
        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--cream)] to-transparent pointer-events-none" />
      </section>

      {/* Main Alternating Sections */}
      <div className="relative z-10 space-y-12 py-16 md:py-24">
        {aboutSections.map((section, index) => {
          const isRight = section.align === "right";
          
          return (
            <section
              key={section.id}
              className="buudy-section py-8 md:py-16 transition-all duration-300"
            >
              <div className="buudy-wrap grid gap-12 lg:grid-cols-2 lg:items-center">
                {/* Image Column */}
                <div 
                  className={`relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--blush)] shadow-[0_16px_40px_-24px_rgba(58,31,61,0.12)] ${
                    isRight ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    alt={section.image.alt}
                    src={section.image.src}
                    fill
                    sizes="(min-width: 1024px) 45vw, 95vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Text Content Column */}
                <div className={isRight ? "lg:order-1" : ""}>
                  <SectionHeading
                    eyebrow={section.eyebrow}
                    title={
                      <>
                        {section.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <em className="buudy-italic">
                          {section.title.split(" ").slice(-1).join(" ")}
                        </em>
                      </>
                    }
                    align="left"
                  />
                  <div className="mt-6 space-y-4 text-sm sm:text-base leading-7 text-[var(--muted)] whitespace-pre-line font-light">
                    {section.copy.split("\n\n").map((paragraph, pIdx) => {
                      // Format bullet lists beautifully
                      if (paragraph.startsWith("•")) {
                        return (
                          <ul key={pIdx} className="space-y-3 mt-4">
                            {paragraph.split("\n").map((bullet, bIdx) => {
                              const cleanBullet = bullet.replace("•", "").trim();
                              const [boldPart, rest] = cleanBullet.split(":");
                              
                              return (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <span className="text-[var(--gold)] mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                                  <span className="text-sm sm:text-base leading-6 text-[var(--muted)]">
                                    {rest ? (
                                      <>
                                        <strong className="text-[var(--plum)] font-semibold">{boldPart}:</strong>
                                        {rest}
                                      </>
                                    ) : (
                                      cleanBullet
                                    )}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }
                      
                      return (
                        <p key={pIdx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
