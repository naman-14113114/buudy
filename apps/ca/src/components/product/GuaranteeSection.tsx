import { LazyAutoplayVideo } from "@/components/ui/LazyAutoplayVideo";

export function GuaranteeSection({ showVideo = true }: { showVideo?: boolean }) {
  return (
    <section className={`buudy-section relative overflow-hidden bg-[var(--ink)] py-14 pb-24 text-center md:py-24 md:pb-36 ${!showVideo ? 'bg-[var(--plum)]' : ''}`}>
      {showVideo && (
        <LazyAutoplayVideo
          ariaLabel="Buudy guarantee lifestyle background"
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
          rootMargin="1400px 0px"
          src="/media/products/buudy-led-mask/videos/buudy-goddess-bg.mp4"
        />
      )}

      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: "oklch(17% 0.03 318 / 42%)" }}
      />

      <div className="buudy-wrap relative z-20 max-w-5xl">
        <p className="buudy-eyebrow">Promise</p>
        <h2 className="buudy-display mx-auto mt-3 max-w-4xl text-[2rem] leading-[1.05] text-[var(--cream)] sm:text-[2.35rem] md:mt-4 md:text-6xl">
          Our <em className="buudy-italic text-[var(--gold)]">Buudy</em>
          <br />
          easy return & refund policy.
        </h2>
        <p className="mx-auto mt-6 hidden max-w-xl text-sm font-medium leading-7 text-white md:block md:text-base">
          Bring clinical-inspired skincare into your daily routine with Buudy. Designed for visible glow, smoother-looking skin, and effortless at-home use, Buudy gives you a premium treatment experience you can trust every time.
        </p>
      </div>
    </section>
  );
}
