export function GuaranteeSection() {
  return (
    <section className="buudy-section bg-[var(--blush)] py-24 text-center">
      <div className="buudy-wrap max-w-5xl">
        <p className="buudy-eyebrow">Promise</p>
        <h2 className="buudy-display mx-auto mt-4 max-w-4xl text-[2.5rem] leading-[1.06] text-[var(--plum)] md:text-6xl">
          Our <em className="buudy-italic">90-Day Goddess</em>
          <br />
          money back guarantee.
        </h2>
        <p className="buudy-copy mx-auto mt-6 max-w-xl">
          Try Buudy at home for 90 days. If you do not fall in love with the
          ritual, or your reflection, send it back for a full refund. No
          questions, no hassle.
        </p>
        <div className="mx-auto mt-10 inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-[rgba(58,31,61,.2)] bg-[rgba(247,241,232,.72)] px-7 py-4 backdrop-blur">
          {["90 days", "Free returns", "Full refund"].map((item, index) => (
            <span className="contents" key={item}>
              {index > 0 ? (
                <span className="hidden h-4 w-px bg-[rgba(58,31,61,.3)] sm:block" />
              ) : null}
              <span className="buudy-mono text-[var(--plum)]">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
