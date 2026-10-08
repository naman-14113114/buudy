export interface CarouselSlide {
  id: string;
  publication: string;
  date?: string;
  image: string;
  alt: string;
}

export const pressHero = {
  eyebrow: "MEDIA SPOTLIGHT",
  title: "IN THE PRESS",
  description:
    "Various publications where we've been spotted! Also please note some might state our former name/product the Cleopatra Mask but notice they all link to our site once tapping/clicking through!",
  carouselTitle: "Discover elevated design",
};

export const pressCarouselSlides: CarouselSlide[] = [
  {
    id: "vanity-fair",
    publication: "Vanity Fair",
    date: "September 2023",
    image: "/images/press/vanity-fair-sept23.png",
    alt: "Vanity Fair September 2023 Press Feature",
  },
  {
    id: "people-mag-1",
    publication: "People Magazine",
    image: "/images/press/people-magazine.png",
    alt: "People Magazine Press Feature",
  },
  {
    id: "vogue",
    publication: "Vogue",
    date: "August 2023",
    image: "/images/press/vogue-aug23.png",
    alt: "Vogue August 2023 Press Feature",
  },
  {
    id: "elle",
    publication: "Elle",
    date: "August 2023",
    image: "/images/press/elle-aug23.png",
    alt: "Elle August 2023 Press Feature",
  },
  {
    id: "cosmopolitan",
    publication: "Cosmopolitan",
    date: "September 2023",
    image: "/images/press/cosmopolitan-sept23.png",
    alt: "Cosmopolitan September 2023 Press Feature",
  },
  {
    id: "harpers-bazaar",
    publication: "Harper's Bazaar",
    date: "September 2023",
    image: "/images/press/harpers-bazaar-sept23.png",
    alt: "Harper's Bazaar September 2023 Press Feature",
  },
  {
    id: "people-mag-2",
    publication: "People",
    date: "August 2023",
    image: "/images/press/people-aug23.png",
    alt: "People August 2023 Press Feature",
  },
];
