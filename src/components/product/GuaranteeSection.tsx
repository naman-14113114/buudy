export function GuaranteeSection() {
  return (
    <section className="buudy-section relative overflow-hidden py-24 pb-36 text-center">
      {/* Background Autoplay Video (Highly visible) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
        src="/media/products/buudy-led-mask/videos/buudy-goddess-bg.mp4"
      />

      {/* Premium dark ink overlay: highly transparent to make video completely visible */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: "oklch(17% 0.03 318 / 42%)" }} // 42% opacity of var(--ink) deep plum
      />

      <div className="buudy-wrap relative z-20 max-w-5xl">
        <p className="buudy-eyebrow">Promise</p>
        <h2 className="buudy-display mx-auto mt-4 max-w-4xl text-[2.5rem] leading-[1.06] text-[var(--cream)] md:text-6xl">
          Our <em className="buudy-italic text-[var(--gold)]">90-Day Goddess</em>
          <br />
          money back guarantee.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white font-medium text-sm sm:text-base leading-7">
          Bring clinical-inspired skincare into your daily routine with Buudy. Designed for visible glow, smoother-looking skin, and effortless at-home use, Buudy gives you a premium treatment experience you can trust every time.
        </p>
        {/* <div className="mx-auto mt-10 inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-[rgba(247,241,232,0.25)] bg-[rgba(18,9,20,0.52)] px-7 py-4 backdrop-blur-md">
          {["90 days", "Free returns", "Full refund"].map((item, index) => (
            <span className="contents" key={item}>
              {index > 0 ? (
                <span className="hidden h-4 w-px bg-[rgba(247,241,232,0.3)] sm:block" />
              ) : null}
              <span className="buudy-mono text-[var(--cream)]">{item}</span>
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
}
