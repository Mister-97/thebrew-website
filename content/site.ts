/**
 * THE BREW — single source of truth for site content.
 *
 * Anything marked PLACEHOLDER is invented and must be replaced with the
 * real value before launch. Search this file for "PLACEHOLDER" to find them all.
 * Nothing outside this file needs to change when the real details arrive.
 */

export const site = {
  name: "The Brew",
  // Stacked collage headline, mirroring the reference's "A FRESH / TASTE /
  // OF the WORLD" — three lines, one word broken out in script mid-line.
  heroLines: [
    { text: "A DAILY", script: "" },
    { text: "POUR OF", script: "the" },
    { text: "GOOD STUFF", script: "" },
  ] as { text: string; script: string }[],
  // PLACEHOLDER — city drives the hero line, the map and all local SEO.
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
    // PLACEHOLDER — real handles needed.
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
  ],

  /**
   * PLACEHOLDER — no online ordering platform confirmed yet.
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

/**
 * "Signature" three-card section, mirroring the reference's Banh Mi / Café /
 * Vietnam Street Food trio: one card per category, short tag list, one photo.
 */
export const features = [
  {
    eyebrow: "Dubai Chocolate",
    tags: ["Gourmet medium roast", "Whole bean"],
    body: "A gourmet medium roast finished with rich Dubai chocolate notes.",
    image: "/images/coffee-dubai.png",
    alt: "A bag of Dubai Chocolate gourmet medium roast coffee",
  },
  {
    eyebrow: "Peruvian",
    tags: ["Single origin", "Drip ground"],
    body: "Single-origin Peruvian beans, gourmet medium roast, drip ground.",
    image: "/images/coffee-peru.png",
    alt: "A bag of Peruvian single origin gourmet medium roast coffee",
  },
  {
    eyebrow: "Kopi Safari",
    tags: ["Gourmet medium roast", "Whole bean"],
    body: "Our Kopi Safari blend, a gourmet medium roast whole bean coffee.",
    image: "/images/coffee-kopi.png",
    alt: "A bag of Kopi Safari gourmet medium roast coffee",
  },
] as const;

// PLACEHOLDER — all items and prices are invented. Replace with the real board.
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

/**
 * The full menu — one tile per category, a trio of drinks shown together,
 * name below. Swap `image` for real drink photography per category before
 * launch; these point at existing placeholder art in the meantime.
 */
export const menuCategories = [
  {
    slug: "featured",
    name: "Featured Drinks",
    image: "/images/cup-hot.png",
    items: ["Brown Sugar Latte", "Salted Caramel Cortado", "Honey Cinnamon Cold Brew"],
  },
  {
    slug: "espresso",
    name: "Espresso Classics",
    image: "/images/cup-hot.png",
    items: ["Cortado", "Flat White", "Cappuccino", "Americano"],
  },
  {
    slug: "cold-brew",
    name: "Cold Brew & Iced Coffee",
    image: "/images/cup-iced.png",
    items: ["Cold Brew", "Iced Latte", "Iced Mocha", "Nitro"],
  },
  {
    slug: "specialty",
    name: "Specialty Coffee",
    image: "/images/coffee-dubai.png",
    items: ["Dubai Chocolate", "Peruvian", "Kopi Safari"],
  },
  {
    slug: "teas",
    name: "Teas & Chai",
    image: "/images/cup-iced.png",
    items: ["Chai Latte", "Matcha Latte", "London Fog"],
  },
  {
    slug: "pastries",
    name: "Bakery",
    image: "/images/cup-dubai-chocolate.png",
    items: ["Butter Croissant", "Egg & Cheddar Roll", "Cinnamon Morning Bun"],
  },
] as const;

export const menuCustomize = [
  { label: "Extra shot", note: "" },
  { label: "Flavor", note: "add one or a few" },
  { label: "Sweetness", note: "1/4, 1/2, regular, extra" },
  { label: "Milk", note: "oat, coconut or almond" },
  { label: "Topping", note: "whipped cream or cold foam" },
  { label: "Drizzle", note: "chocolate or caramel" },
] as const;

export const gallery = [
  { src: "/images/gallery-lounge.webp", alt: "The Brew's lounge seating against the orange logo wall" },
  { src: "/images/gallery-pour.webp", alt: "Espresso dripping into a cup" },
  { src: "/images/gallery-pastry-case.webp", alt: "Pastry case and signature drink bottles at the counter" },
  { src: "/images/gallery-window-decal.webp", alt: "The Brew logo decal on the front window" },
  { src: "/images/gallery-storefront.webp", alt: "The Brew's storefront on E 71st St" },
  { src: "/images/gallery-menu-board.webp", alt: "Menu board behind the counter" },
] as const;
