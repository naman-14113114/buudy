import Image from "next/image";
import { Play, Smartphone } from "lucide-react";
import { touchTech } from "@/data/productSections";
import { productAsset, productMediaAsset } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { LazyAutoplayVideo } from "@/components/ui/LazyAutoplayVideo";

export function RitualSection() {
  return (
    <section className="buudy-section bg-[rgba(241,223,210,.42)] md: md: py-14 md:py-24">
      <div className="buudy-wrap grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-[var(--ink)]">
          <Image
            alt="Buudy LED Mask lifestyle ritual"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            src={productAsset("08-buudy-led-mask-lifestyle-use.webp")}
          />
          <div className="absolute inset-0 grid place-items-center">
            <button
              aria-label="Play how Buudy works"
              className="relative grid h-20 w-20 place-items-center rounded-full bg-[var(--cream)] text-[var(--plum)]"
              type="button"
            >
              <span className="absolute inset-0 rounded-full bg-[var(--cream)] [animation:buudy-ping_1.8s_infinite]" />
              <Play className="relative ml-1" fill="currentColor" size={24} />
            </button>
          </div>
          <p className="buudy-mono absolute bottom-5 left-5 text-[var(--cream)]">
            How Buudy works - 0:48
          </p>
        </div>
        <div>
          <p className="buudy-eyebrow">New to Buudy?</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl">
            Discover how <em className="buudy-italic">10 minutes</em> become a
            ritual.
          </h2>
          <p className="buudy-copy mt-5">
            Discover how Buudy&apos;s 7 wavelengths plus 830nm near-infrared,
            flexible silicone fit, and simple 10-minute routine make at-home
            light therapy feel easy, consistent, and beautifully wearable.
          </p>
          <Button className="mt-7" variant="ghost">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}

export function TouchTechSection() {
  return (
    <section className="buudy-section border-y border-[var(--border)] bg-[var(--plum)] text-[var(--cream)] md: md: py-14 md:py-24">
      <div className="buudy-wrap grid items-center gap-8 md:gap-14 lg:grid-cols-2">
        <div>
          <p className="buudy-mono text-[var(--gold)]">Intuitive Touch</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--cream)] md:text-5xl">
            Skincare should be <em className="buudy-italic">an escape</em>, not a
            hassle.
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-[rgba(247,241,232,.72)]">
            We engineered the Buudy LED Mask to be as smart as it is effective,
            replacing frustrating wires and heavy controllers with a sleek,
            wearable design.
          </p>
          <ul className="mt-10 grid gap-6">
            {touchTech.map((item) => (
              <li className="border-l border-[rgba(184,149,86,.42)] pl-6" key={item.title}>
                <p className="buudy-display text-2xl text-[var(--cream)]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[rgba(247,241,232,.72)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[var(--ink)]">
          <LazyAutoplayVideo
            ariaLabel="Buudy LED Mask light modes demonstration"
            className="w-full h-full object-cover"
            rootMargin="1400px 0px"
            src={productMediaAsset("7 colors muted.mp4", "buudy-led-mask", "videos")}
          />
          <div className="absolute bottom-6 right-6 rounded-2xl bg-[rgba(247,241,232,.94)] p-4 text-[var(--plum)] backdrop-blur">
            <p className="buudy-mono">Tap to cycle</p>
            <p className="buudy-display mt-1 text-xl">7 LED Colours + NIR - 1 gesture</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AppPromo() {
  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24" id="buudy-ai">
      <div className="buudy-wrap grid items-center gap-8 md:gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative aspect-[1200/799] w-full overflow-hidden rounded-[18px] bg-[var(--blush)] lg:order-last">
          <Image
            alt="Buudy AI companion app"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            src={productMediaAsset("ChatGPT Image May 31, 2026, 11_35_03 PM (2).png")}
          />
          <span className="buudy-mono absolute left-5 top-5 rounded-full bg-[rgba(247,241,232,.9)] px-4 py-2 text-[var(--plum)] backdrop-blur">
            Free with Buudy
          </span>
        </div>
        <div>
          <p className="buudy-eyebrow">Companion App</p>
          <h2 className="buudy-display mt-2 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl">
            Buudy <span className="text-[var(--gold)]">AI App</span>.
          </h2>
          <p className="buudy-copy mt-3 text-sm leading-6">
            Buudy Glow Coach is the AI Skincare app for Buudy LED Mask
            customers. It helps customers plan, time, and track their
            personalised LED mask sessions using the 7 wavelengths plus
            near-infrared available on the mask.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Plan", "Time", "Track"].map((step) => (
              <div
                className="rounded-lg border border-[rgba(58,31,61,.12)] bg-[var(--card)] px-3 py-2 text-center"
                key={step}
              >
                <p className="buudy-mono text-[var(--plum)] font-semibold">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center md:justify-start">
            <Button asChild>
              <a href="https://app.buudy.com" target="_blank" rel="noopener noreferrer">
                <Smartphone size={17} />
                Try the app now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlueLightSection() {
  return (
    <section className="buudy-section border-y border-[var(--border)] bg-[var(--ink)] text-[var(--cream)] py-4 md:py-6">
      <div className="buudy-glow -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 bg-[#4a6acf]" />
      <div className="buudy-wrap relative z-10 grid items-center gap-8 md:gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
          <Image
            alt="Blue light therapy with Buudy LED Mask"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={productMediaAsset("ChatGPT Image May 31, 2026, 03_48_31 PM.png")}
          />
        </div>
        <div>
          <p className="buudy-mono text-[var(--gold)]">Expert insight</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--cream)] md:text-5xl">
            Blue light therapy.
          </h2>
          <blockquote className="buudy-display mt-8 text-2xl italic leading-snug text-[var(--cream)] md:text-3xl">
            &quot;One of my other favourite LED colours as you can see here is going
            to be the blue light therapy. Blue light specifically is going to be
            for combatting acne, killing any bacteria that&apos;s going to be sitting
            on the surface of the skin contributing to that acne breakout.&quot;
          </blockquote>
          <div className="mt-8 border-t border-[rgba(247,241,232,.15)] pt-5">
            <p className="buudy-display text-xl text-[var(--cream)]">Shannon</p>
            <p className="buudy-mono mt-1 text-[var(--gold)]">
              Licensed Medical Aesthetician
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[rgba(247,241,232,.72)]">
              Expert insight on how blue light therapy supports clearer-looking
              skin when breakouts are part of the concern.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
