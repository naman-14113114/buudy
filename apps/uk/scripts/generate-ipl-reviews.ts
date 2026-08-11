import fs from 'fs';
import path from 'path';

const TOTAL_REVIEWS = 2000;
const RATING_DISTR = {
  1: 2,
  2: 2,
  3: 3,
  4: 250,
  5: 1743,
}; // Total: 2000

const UK_NAMES = [
  'Kelly', 'Joanne', 'Charlotte', 'Amanda', 'Rachel', 'Victoria', 'Yvonne', 'Rebecca', 'Kerry', 'Leanne',
  'Julie', 'Laura', 'Jane', 'Caroline', 'Gemma', 'Louise', 'Anne', 'Hannah', 'Dawn', 'Sophie',
  'Emma', 'Chloe', 'Mia', 'Grace', 'Lily', 'Ella', 'Isabella', 'Jessica', 'Amelia', 'Olivia',
  'Ava', 'Isla', 'Sophia', 'Freya', 'Evelyn', 'Alice', 'Florence', 'Sienna', 'Harper', 'Matilda',
  'Ruby', 'Erica', 'Fiona', 'Diane', 'Paula', 'Tracey', 'Karen', 'Susan', 'Linda', 'Margaret',
  'Sarah', 'Nicola', 'Clare', 'Lisa', 'Emma', 'Michelle', 'Alison', 'Helen', 'Sally', 'Angela',
  'Rachel', 'Gemma', 'Louise', 'Anne', 'Hannah', 'Dawn', 'Sophie', 'Kelly', 'Joanne', 'Charlotte'
];

const ONE_STAR = [
  "I didn’t see any noticeable results even after using it for 2 weeks, which was disappointing.",
  "Delivery took over a week. The product might be okay but the shipping speed was terrible.",
  "I didn't receive the protective goggles in my package. Really disappointed with the quality control.",
  "The device is too bulky for my hands. I expected it to be lighter."
];

const TWO_STAR = [
  "Item stopped working after the third use. It turns on but won't flash. Very disappointed.",
  "It takes too long to do my whole legs. I don't have 30 minutes to spend on this.",
  "The cooling feature is nice but the flashes still sting a little on the higher settings.",
  "Not sure if it's working yet. It's been 3 weeks and the hair is still growing back."
];

const THREE_STAR = [
  "It's okay. Definitely slows down growth but I wouldn't call it permanent yet.",
  "Good product but the cord is a bit short. Wish it was battery operated.",
  "Works well on my legs but hasn't done much for my underarms so far.",
  "The cooling head is great, but the auto-flash mode is a bit too fast for me to keep up with."
];

const FOUR_STAR = [
  "Really impressed so far. Week 4 and I'm shaving half as much.",
  "The ice cooling feature is a lifesaver. I tried laser at a salon and it hurt so much, this is virtually painless.",
  "Great results on my legs. Dropped a star because it's a bit awkward to use around the ankles.",
  "Much better than waxing. The hair is growing back much softer and sparser.",
  "Worth the money. Easy to use and the instructions are very clear.",
  "I was skeptical but it actually works. My bikini line is finally clear of ingrown hairs.",
  "Solid device. The flashes are bright so definitely wear the goggles provided."
];

const FIVE_STAR = [
  "Best investment I ever made. The hair on my legs is completely gone after 6 weeks.",
  "The ice cooling technology is incredible. It literally feels like gliding an ice cube over your skin.",
  "I cancelled my laser clinic package for this. It gives the exact same results for a fraction of the cost.",
  "No more strawberry legs! My skin has never looked this smooth. I'm obsessed.",
  "I use it on the max setting (9) and thanks to the cooling head, I feel zero pain. Amazing engineering.",
  "I have PCOS and struggle with facial hair. This device has given me my confidence back. Highly recommend.",
  "Fast shipping, premium packaging, and a device that actually does what it claims. 5 stars all the way.",
  "The auto mode makes doing my legs so fast. I can do my whole body in under 20 minutes.",
  "If you're on the fence, just buy it. It's saved me so much money on waxing appointments.",
  "Absolutely painless. The sapphire cooling head is a game changer compared to older IPL devices I've tried.",
  "My underarms are completely hair-free. It took about 5 weeks of consistent use. Very happy.",
  "I love that it has 999,999 flashes. I'll literally never need to buy a replacement cartridge.",
  "Customer service is fantastic and the product is top tier. The cooling effect is instantly noticeable."
];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const reviews: { date: string; [key: string]: unknown }[] = [];
let currentIndex = 4275; // Start index

const startDate = new Date('2024-01-01');
const endDate = new Date('2026-06-24');

// Generate reviews
[
  { rating: 1, arr: ONE_STAR, count: RATING_DISTR[1] },
  { rating: 2, arr: TWO_STAR, count: RATING_DISTR[2] },
  { rating: 3, arr: THREE_STAR, count: RATING_DISTR[3] },
  { rating: 4, arr: FOUR_STAR, count: RATING_DISTR[4] },
  { rating: 5, arr: FIVE_STAR, count: RATING_DISTR[5] },
].forEach(({ rating, arr, count }) => {
  for (let i = 0; i < count; i++) {
    const name = getRandomItem(UK_NAMES);
    const date = getRandomDate(startDate, endDate);
    const displayDate = date.toISOString().split('T')[0];
    
    reviews.push({
      id: `1000000611225890_ipl_${currentIndex++}`,
      sourceIndex: currentIndex,
      productHandle: "buudy-ipl-device",
      customerName: name,
      rating,
      title: "",
      body: getRandomItem(arr),
      date: date.toUTCString(),
      displayDate,
      images: []
    });
  }
});

// Sort by date descending
reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const outputPath = path.join('C:', 'Users', 'NAMAN KHARBANDA', 'OneDrive', 'Desktop', 'trustpilot', 'uk-buudy', 'src', 'data', 'reviews', 'buudy-ipl-hair-removal-device-reviews.json');

fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2));

console.log(`Successfully generated ${reviews.length} reviews and saved to ${outputPath}`);
