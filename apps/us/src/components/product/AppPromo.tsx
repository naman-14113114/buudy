
import { StoreText, StoreButton, StoreAnchor } from '@/components/international/StoreLocale';
import { StoreImage as Image } from '@/components/international/StoreLocale';
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
            <StoreButton
              aria-label="Play how Buudy works"
              className="relative grid h-20 w-20 place-items-center rounded-full bg-[var(--cream)] text-[var(--plum)]"
              type="button"
            >
              <span className="absolute inset-0 rounded-full bg-[var(--cream)] [animation:buudy-ping_1.8s_infinite]" />
              <Play className="relative ml-1" fill="currentColor" size={24} />
            </StoreButton>
          </div>
          <p className="buudy-mono absolute bottom-5 left-5 text-[var(--cream)]"><StoreText>
            How Buudy works - 0:48
          </StoreText></p>
        </div>
        <div>
          <p className="buudy-eyebrow"><StoreText>New to Buudy?</StoreText></p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl"><StoreText>
            Discover how </StoreText><em className="buudy-italic"><StoreText>10 minutes</StoreText></em><StoreText> become a
            ritual.
          </StoreText></h2>
          <p className="buudy-copy mt-5"><StoreText>
            Discover how Buudy&apos;s 7 wavelengths plus 830nm near-infrared,
            flexible silicone fit, and simple 10-minute routine make at-home
            light therapy feel easy, consistent, and beautifully wearable.
          </StoreText></p>
          <Button className="mt-7" variant="ghost"><StoreText>
            Learn more
          </StoreText></Button>
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
          <p className="buudy-mono text-[var(--gold)]"><StoreText>Intuitive Touch</StoreText></p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--cream)] md:text-5xl"><StoreText>
            Skincare should be </StoreText><em className="buudy-italic"><StoreText>an escape</StoreText></em><StoreText>, not a
            hassle.
          </StoreText></h2>
          <p className="mt-5 max-w-lg leading-7 text-[rgba(247,241,232,.72)]"><StoreText>
            We engineered the Buudy LED Mask to be as smart as it is effective,
            replacing frustrating wires and heavy controllers with a sleek,
            wearable design.
          </StoreText></p>
          <ul className="mt-10 grid gap-6">
            {touchTech.map((item) => (
              <li className="border-l border-[rgba(184,149,86,.42)] pl-6" key={item.title}>
                <p className="buudy-display text-2xl text-[var(--cream)]"><StoreText>{item.title}</StoreText></p>
                <p className="mt-1 text-sm leading-6 text-[rgba(247,241,232,.72)]">
                  <StoreText>{item.body}</StoreText>
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
            <p className="buudy-mono"><StoreText>Tap to cycle</StoreText></p>
            <p className="buudy-display mt-1 text-xl"><StoreText>7 LED Colours + NIR - 1 gesture</StoreText></p>
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
          <span className="buudy-mono absolute left-5 top-5 rounded-full bg-[rgba(247,241,232,.9)] px-4 py-2 text-[var(--plum)] backdrop-blur"><StoreText>
            Free with Buudy
          </StoreText></span>
        </div>
        <div>
          <p className="buudy-eyebrow"><StoreText>Companion App</StoreText></p>
          <h2 className="buudy-display mt-2 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl"><StoreText>
            Buudy </StoreText><span className="text-[var(--gold)]"><StoreText>AI App</StoreText></span>.
          </h2>
          <p className="buudy-copy mt-3 text-sm leading-6"><StoreText>
            Buudy Glow Coach is the AI Skincare app for Buudy LED Mask
            customers. It helps customers plan, time, and track their
            personalised LED mask sessions using the 7 wavelengths plus
            near-infrared available on the mask.
          </StoreText></p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Plan", "Time", "Track"].map((step) => (
              <div
                className="rounded-lg border border-[rgba(58,31,61,.12)] bg-[var(--card)] px-3 py-2 text-center"
                key={step}
              >
                <p className="buudy-mono text-[var(--plum)] font-semibold"><StoreText>{step}</StoreText></p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center md:justify-start">
            <Button asChild>
              <StoreAnchor href="https://app.buudy.com" target="_blank" rel="noopener noreferrer">
                <Smartphone size={17} /><StoreText>
                Try the app now
              </StoreText></StoreAnchor>
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
          <p className="buudy-mono text-[var(--gold)]"><StoreText>Expert insight</StoreText></p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--cream)] md:text-5xl"><StoreText>
            Blue light therapy.
          </StoreText></h2>
          <blockquote className="buudy-display mt-8 text-2xl italic leading-snug text-[var(--cream)] md:text-3xl"><StoreText>
            &quot;One of my other favourite LED colours as you can see here is going
            to be the blue light therapy. Blue light specifically is going to be
            for combatting acne, killing any bacteria that&apos;s going to be sitting
            on the surface of the skin contributing to that acne breakout.&quot;
          </StoreText></blockquote>
          <div className="mt-8 border-t border-[rgba(247,241,232,.15)] pt-5">
            <p className="buudy-display text-xl text-[var(--cream)]"><StoreText>Shannon</StoreText></p>
            <p className="buudy-mono mt-1 text-[var(--gold)]"><StoreText>
              Licensed Medical Aesthetician
            </StoreText></p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[rgba(247,241,232,.72)]"><StoreText>
              Expert insight on how blue light therapy supports clearer-looking
              skin when breakouts are part of the concern.
            </StoreText></p>
          </div>
        </div>
      </div>
    </section>
  );
}
