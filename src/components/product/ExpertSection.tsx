import { expertVideo } from "@/data/productSections";

export function ExpertSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24" id="expert">
      <div className="buudy-wrap grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="relative">
          <div className="overflow-hidden rounded-[18px] border border-[rgba(58,31,61,.12)] bg-[var(--ink)] shadow-[0_24px_48px_-28px_rgba(0,0,0,.4)]">
            <video
              className="aspect-[1/1.785] w-full object-cover"
              controls
              playsInline
              poster={expertVideo.poster}
              preload="none"
            >
              <source src={expertVideo.src} type="video/mp4" />
            </video>
          </div>
          <div className="absolute -bottom-4 right-2 rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-4 shadow-[0_16px_34px_-24px_rgba(0,0,0,.5)] md:-bottom-6 md:-right-6">
            <p className="buudy-mono text-[var(--gold)]">Endorsed by</p>
            <p className="buudy-display mt-1 text-lg text-[var(--plum)]">
              Board-Certified Dermatology
            </p>
          </div>
        </div>

        <div>
          <p className="buudy-eyebrow">Expert</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl">
            Dr. Gabriella <em className="buudy-italic">Vasili</em>, MD
          </h2>
          <p className="buudy-display mt-4 text-xl italic text-[var(--plum-soft)]">
            Double Board-Certified Dermatologist
          </p>
          <div className="buudy-copy mt-5 space-y-4">
            <p>
              Dr. Gabriella Vasili is an esteemed, double board-certified
              dermatologist based in Atlanta, Georgia. With an expert focus on
              enhancing the efficacy of modern skincare, Dr. Vasili is a strong
              advocate for integrating clinical-grade technologies into daily
              routines.
            </p>
            <p>
              She is particularly recognized for her expertise in Light Emitting
              Diode (LED) therapy. Dr. Vasili&apos;s commitment to skin health extends
              beyond the face to often-neglected areas like the neck, ensuring
              her patients achieve a comprehensive and rejuvenated glow.
            </p>
            <p>
              Her professional mission is to bridge the gap between professional
              dermatological treatments and accessible, high-performance skincare
              at home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
