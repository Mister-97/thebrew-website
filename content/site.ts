/**
 * THE BREW, single source of truth for site content.
 *
 * Anything marked PLACEHOLDER is invented and must be replaced with the
 * real value before launch. Search this file for "PLACEHOLDER" to find them all.
 * Nothing outside this file needs to change when the real details arrive.
 */

export const site = {
  name: "The Brew",
  // Stacked collage headline, mirroring the reference's "A FRESH / TASTE /
  // OF the WORLD", three lines, one word broken out in script mid-line.
  heroLines: [
    { text: "A DAILY", script: "" },
    { text: "POUR OF", script: "the" },
    { text: "GOOD STUFF", script: "" },
  ] as { text: string; script: string }[],
  // PLACEHOLDER, city drives the hero line, the map and all local SEO.
  city: "Chicago",
  state: "IL",
  tagline: "Coffee, all day.",
  description:
    "A neighbourhood coffee bar. Small-batch espresso, bread baked the same morning, and a room you are welcome to sit in for as long as you like.",
  badge: "Locally Roasted",
  ticker: ["Drink Coffee", "Eat Pastry", "Be Happy"],
  about: {
    heading: "Brew",
    script: "the",
    headingEnd: "Story",
    body: "Its The Brew started as a cart on the corner and grew into a room people actually want to sit in. We craft every cup with beans roasted close by, milk steamed to order, and no shortcuts on the bread.\n\nWe hope you'll stop in and stay a while.",
  },
  welcome: {
    heading: "From the",
    script: "farm",
    headingEnd: "to your cup",
    body: "We source our beans direct from the growers who pick them, so every batch is traceable back to the farm it came from. No middlemen, no sitting in a warehouse for a year.",
    subscription:
      "Want it at home? Subscribe and we'll deliver fresh-roasted beans every two weeks or once a month, ground how you like them.",
  },

  address: {
    line1: "Yates & Exchange",
    line2: "Chicago, IL 60649",
    mapsQuery: "Yates & Exchange, Chicago, IL 60649",
  },
  phone: "(773) 437-3906",
  phoneHref: "tel:+17734373906",
  email: "hello@thebrew.cafe",

  hours: [
    { days: "Monday – Friday", time: "7:00am – 3:00pm" },
    { days: "Saturday – Sunday", time: "9:00am – 3:00pm" },
  ],

  socials: [
    // PLACEHOLDER, real handles needed.
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
  ],

  /**
   * PLACEHOLDER, no online ordering platform confirmed yet.
   * When they sign up for Toast / Square / Clover, drop the ordering URL in
   * `href` and flip `enabled` to true. The header and hero buttons follow.
   */
  ordering: {
    enabled: false,
    provider: "TBC",
    href: "#contact",
  },
  // Facts below come from public press (Block Club Chicago, Nov 2024; Fox 32,
  // Apr 2026). PLACEHOLDER: listen links stay empty until the real show URLs
  // are confirmed. A button only renders once its href is filled in.
  podcast: {
    title: "The Brew Podcast",
    blurb:
      "Interviews with thought-changers and community leaders from South Shore, recorded live at the shop.",
    host: "Samuel Sparks",
    instagram: "https://www.instagram.com/the_brewcoffeenpodcast/",
    links: [
      { label: "Spotify", href: "" },
      { label: "Apple Podcasts", href: "" },
      { label: "YouTube", href: "" },
    ],
  },
} as const;

// PLACEHOLDER, all items and prices are invented. Replace with the real board.
export const menuPreview = [
  { name: "Filter", note: "Rotating single origin", price: "4.00" },
  { name: "Flat White", note: "House blend, 6oz", price: "4.75" },
  { name: "Cortado", note: "Double shot, cut short", price: "4.25" },
  { name: "Brown Sugar Latte", note: "House syrup, cinnamon", price: "5.50" },
  { name: "Cold Brew", note: "Steeped twenty hours", price: "5.00" },
  { name: "Butter Croissant", note: "Baked at five", price: "4.50" },
  { name: "Egg & Cheddar Roll", note: "On a milk bun", price: "8.00" },
  { name: "Cinnamon Morning Bun", note: "While they last", price: "5.25" },
] as const;

export const gallery = [
  { src: "/images/gallery-lounge.webp", alt: "The Brew's lounge seating against the orange logo wall" },
  { src: "/images/gallery-pour.webp", alt: "Espresso dripping into a cup" },
  { src: "/images/gallery-pastry-case.webp", alt: "Pastry case and signature drink bottles at the counter" },
  { src: "/images/gallery-window-decal.webp", alt: "The Brew logo decal on the front window" },
  { src: "/images/gallery-storefront.webp", alt: "The Brew's storefront on E 71st St" },
  { src: "/images/gallery-menu-board.webp", alt: "Menu board behind the counter" },
] as const;

/**
 * Machine-readable version of site.hours, used for the live "Open now" badge.
 * Days are 0 = Sunday to 6 = Saturday, hours are 24h in Chicago time.
 * Keep in step with site.hours.
 */
export const hoursSchedule = [
  { days: [1, 2, 3, 4, 5], open: 7, close: 15 },
  { days: [0, 6], open: 9, close: 15 },
] as const;

/**
 * Open roles on /careers. DRAFT copy: the duties are typical for each role and
 * need the owner's review. No pay, hours or requirements are stated because
 * none were provided.
 */
export const jobs = [
  {
    slug: "barista",
    title: "Barista",
    blurb: "Pull the shots, steam the milk, and be the face people see first.",
    duties: [
      "Make espresso drinks, cold brew, teas and smoothies to our recipes",
      "Take orders, run the register and keep the line moving",
      "Keep the bar, floor and restrooms clean and stocked",
      "Know the menu well enough to help guests choose",
    ],
  },
  {
    slug: "manager",
    title: "Manager",
    blurb: "Run the floor, lead the team and keep every shift on track.",
    duties: [
      "Lead shifts and coach baristas on the floor",
      "Open and close the shop, count the drawer and handle deposits",
      "Check inventory and place daily orders",
      "Handle guest concerns and keep quality high",
    ],
  },
  {
    slug: "general-manager",
    title: "General Manager",
    blurb: "Own the shop: the team, the numbers and the neighborhood.",
    duties: [
      "Hire, train, schedule and develop the whole team",
      "Own the budget, labor, ordering and vendor relationships",
      "Keep the shop clean, safe and up to health code",
      "Work with the owner on events, the podcast and growth",
    ],
  },
] as const;

/**
 * Rewards club on /members. DRAFT: the perks and the punch count are
 * placeholders for the owner to confirm. Nothing here has been promised to
 * customers yet.
 */
export const membership = {
  name: "The Brew Club",
  punches: 10,
  perks: [
    { title: "Every tenth drink is free", body: "Every drink you buy earns a stamp. Fill the card and the next one is on us." },
    { title: "First to know", body: "New roasts, seasonal drinks and specials land in your inbox before anyone else." },
    { title: "Come to the tapings", body: "Members get first word on live podcast tapings and events at the shop." },
  ],
} as const;

/**
 * Words that rotate in the homepage hero, one pair every 3 seconds. `lead` goes
 * left of the cup, `item` right of it. Every item is on the real menu. Keep the two
 * halves a similar length so the pair looks balanced, and each item to about 11
 * characters or fewer so it fits beside the cup.
 */
export const heroWords = [
  { lead: "Start With", item: "Breakfast" },
  { lead: "Enjoy A", item: "Hot Coffee" },
  { lead: "Cool Down", item: "Iced Coffee" },
  { lead: "Feel Good", item: "Smoothies" },
  { lead: "Sip", item: "Tea" },
  { lead: "Grab A", item: "Panini" },
] as const;
