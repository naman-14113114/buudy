import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  homeCustomerReviewsGrid,
  homeFeatureCards,
  homeLightTherapy,
  homeMaskSpotlight,
  homeSkincareGuideIntro,
  homeTechnologySpotlight,
  homeTorchSpotlight,
  homeYoungerYou,
} from "@/data/home";
import { productMediaAsset } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { SectionHeading } from "@/components/ui/SectionHeading";

function TorchSpotlight() {
  const data = homeTorchSpotlight;
  return (
    <section className="buudy-section bg-[var(--plum)] py-12 md:py-16 text-[var(--cream)]">
      <div className="buudy-wrap grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
        <div className="lg:order-2">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={
              <>
                {data.title.split(" ").slice(0, -2).join(" ")}{" "}
                <em className="buudy-italic">
                  {data.title.split(" ").slice(-2).join(" ")}
                </em>
              </>
            }
            copy={data.copy}
            invert
          />
          <Button
            asChild
            className="mt-8 !border-[var(--cream)] !text-[var(--cream)] hover:!bg-[var(--blush)] hover:!text-[var(--plum)]"
          >
            <Link href={`/products/${data.product.slug}`}>
              {homeTorchSpotlight.ctaLabel}
              <ArrowRight size={17} />
            </Link>
          </Button>
        </div>
        <div className="relative w-full aspect-square overflow-hidden rounded-[18px] bg-[var(--cream)]">
          <Image
            alt={data.image.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            src={data.image.src}
          />
        </div>
      </div>
    </section>
  );
}

function SkincareGuideIntro() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-24">
      <div className="buudy-wrap flex flex-col items-center text-center">
        <SectionHeading
          eyebrow={homeSkincareGuideIntro.eyebrow}
          title={homeSkincareGuideIntro.title}
          copy={homeSkincareGuideIntro.copy}
          align="center"
        />
        <Button asChild className="mt-8">
          <Link href={homeSkincareGuideIntro.ctaHref}>
            {homeSkincareGuideIntro.ctaLabel}
            <ArrowRight size={17} />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function TechnologySpotlight() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
      <div className="buudy-wrap">
        <div className="grid gap-16 lg:grid-cols-2">

          {/* LEFT — light therapy text + button + mask spotlight image */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center text-center gap-2 mb-8">
              <SectionHeading
                eyebrow=""
                title={homeLightTherapy.title}
                copy={homeLightTherapy.copy}
                align="center"
              />
              <div className="py-6">
                <Button asChild>
                  <Link href={`/products/${homeTechnologySpotlight.ctaHref.split("/").pop()}`}>
                    Buy Now
                    <ArrowRight size={17} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full mt-auto">
              <Image
                alt={homeMaskSpotlight.image.alt}
                className="block h-auto w-full object-cover rounded-[25px] shadow-sm"
                width={544}
                height={544}
                sizes="(min-width: 1024px) 45vw, 90vw"
                src={homeMaskSpotlight.image.src}
              />
            </div>
          </div>

          {/* RIGHT — stats image + REVEAL A YOUNGER YOU + copy stacked */}
          <div className="flex flex-col h-full">
            <div className="w-full mb-8">
              <Image
                alt={homeTechnologySpotlight.image.alt}
                className="block h-auto w-full object-cover rounded-[25px] shadow-sm"
                width={544}
                height={544}
                sizes="(min-width: 1024px) 45vw, 90vw"
                src={homeTechnologySpotlight.image.src}
              />
            </div>
            <div className="flex flex-col items-center text-center mt-auto">
              <SectionHeading
                eyebrow=""
                title={homeYoungerYou.title}
                copy={homeYoungerYou.copy}
                align="center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function HomeFeatureGrid() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24">
      <div className="buudy-wrap">
        <SectionHeading
          eyebrow="Why Buudy"
          title={
            <>
              Light therapy that covers the <em className="buudy-italic">details</em>.
            </>
          }
          copy="Dense LED coverage, flexible treatments, and built-in neck care help the daily ritual feel simple while still feeling complete."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {homeFeatureCards.map((feature) => (
            <article
              className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)]"
              key={feature.title}
            >
              <img
                alt={feature.title}
                className="block h-auto w-full bg-[var(--blush)]"
                src={feature.image}
              />
              <div className="p-5">
                <h2 className="buudy-display text-2xl text-[var(--plum)]">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {feature.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LightTherapyStory() {
  return (
    <section
      className="buudy-section bg-[var(--plum)] py-24 text-[var(--cream)]"
      id="light-therapy"
    >
      <div className="buudy-wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[rgba(247,241,232,.08)]">
          <Image
            alt={homeLightTherapy.image.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 90vw"
            src={homeLightTherapy.image.src}
          />
        </div>
        <SectionHeading
          eyebrow={homeLightTherapy.eyebrow}
          title={
            <>
              What is light therapy and{" "}
              <em className="buudy-italic">where did it come from?</em>
            </>
          }
          copy={homeLightTherapy.copy}
          invert
        />
      </div>
    </section>
  );
}

function RevealYoungerYou() {
  return null;
}

function CustomerReviewsGrid() {
  return (
    <section className="hidden md:block relative w-full overflow-hidden bg-[var(--plum)]">
      <div className="relative w-full">
        <Image
          src={homeCustomerReviewsGrid.image}
          alt={homeCustomerReviewsGrid.title}
          width={1800}
          height={1000}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <SectionHeading
          eyebrow=""
          title={homeCustomerReviewsGrid.title}
          copy={homeCustomerReviewsGrid.copy}
          align="center"
          invert
        />
        <Button asChild className="mt-8 !border-[var(--cream)] !text-[var(--cream)] hover:!bg-[var(--blush)] hover:!text-[var(--plum)]">
          <Link href={homeCustomerReviewsGrid.ctaHref}>
            {homeCustomerReviewsGrid.ctaLabel}
          </Link>
        </Button>
      </div>
    </section>
  );
}

function HomeVideoHero() {
  return (
    <section className="buudy-section relative w-full overflow-hidden bg-[var(--plum)]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="block h-auto w-full"
        src="/media/products/buudy-led-mask/videos/buudy-goddess-bg.mp4"
      />
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HomeVideoHero />
      <SkincareGuideIntro />
      <TechnologySpotlight />
      {/* <LightTherapyStory /> */}
      <HomeFeatureGrid />
      <TorchSpotlight />
      <CustomerReviewsGrid />
    </>
  );
}
