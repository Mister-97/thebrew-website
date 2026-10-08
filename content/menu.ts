/**
 * The real menu, transcribed from the owner's menu board (2026-10-09). Prices
 * are USD. Two prices mean small / large. Check against the printed board
 * before launch: it was read from a screenshot.
 */

export type MenuItem = {
  name: string;
  desc?: string;
  /** "5 / 6" for small / large, a single price otherwise */
  price: string;
  /** a generated single-cup photo in /public/images/menu, if there is one */
  image?: string;
};

export type MenuCategory = {
  slug: string;
  name: string;
  /** the three-drink image shown on the menu page */
  image: string;
  alt: string;
  intro?: string;
  priceKey?: string;
  note?: string;
  items: MenuItem[];
};

const FLAVORS =
  "Add a flavor: French Vanilla, Hazelnut, Caramel, Mocha, Lavender, Butter Pecan or Mushroom Powder (.50)";

export const menuCategories: MenuCategory[] = [
  {
    slug: "hot-coffee",
    name: "Hot Coffee",
    image: "/images/menu/category-hot-coffee.png",
    alt: "Three hot coffees in black cups and mugs with The Brew logo",
    priceKey: "Small / Large",
    note: FLAVORS,
    items: [
      { name: "Espresso", price: "5 / 6" },
      { name: "Black Coffee", price: "4.50 / 6" },
      { name: "Latte", price: "6.50 / 7.50", image: "/images/menu/latte.png" },
      { name: "Cappuccino", price: "6 / 7" },
      { name: "Macchiato", price: "6.50 / 7.50" },
      { name: "Flat White", price: "6 / 6.50" },
      { name: "Mushroom", price: "6 / 6.50" },
    ],
  },
  {
    slug: "iced-coffee",
    name: "Iced Coffee",
    image: "/images/menu/category-iced-coffee.png",
    alt: "Three iced coffees in clear cups with The Brew logo",
    priceKey: "Small / Large",
    note: FLAVORS,
    items: [
      { name: "Cold Brew", price: "5 / 6", image: "/images/menu/cold-brew.png" },
      { name: "Iced Latte", price: "5 / 6" },
      { name: "Iced Mocha", price: "5.50 / 6.50", image: "/images/menu/iced-mocha.png" },
      { name: "Iced Americano", price: "5 / 6" },
      { name: "Frozen Latte", price: "6 / 7" },
      { name: "Frozen White Mocha", price: "6 / 7" },
      { name: "Mushroom", price: "6 / 6.50" },
    ],
  },
  {
    slug: "non-coffee",
    name: "Non-Coffee",
    image: "/images/menu/category-non-coffee.png",
    alt: "Three tea drinks in clear cups with The Brew logo",
    intro: "Served hot or iced.",
    items: [
      { name: "English Breakfast", price: "4.50" },
      { name: "Matcha Shroom Milk Tea", price: "6.50", image: "/images/menu/matcha-shroom-milk-tea.png" },
      { name: "Chai Milk Tea", price: "6.50" },
      { name: "Jasmine Milk Tea", price: "6.50" },
      { name: "Healthy Juice", price: "4.50" },
      { name: "Hibiscus", price: "4.50" },
      { name: "Green Tea", price: "4.50" },
      { name: "Dandelion", price: "4.50" },
      { name: "Hot Cocoa", price: "5" },
    ],
  },
  {
    slug: "smoothies",
    name: "Smoothies",
    image: "/images/menu/category-smoothies.png",
    alt: "Three smoothies in clear cups with The Brew logo",
    intro: "Real ingredients. Real energy.",
    items: [
      { name: "Sunrise", desc: "Mango, pineapple, banana, coconut water", price: "11", image: "/images/menu/sunrise-smoothie.png" },
      { name: "Berry Blast", desc: "Mixed berries, Greek yogurt, oats, honey, almond milk", price: "11", image: "/images/menu/berry-blast-smoothie.png" },
      { name: "Nutty ’Nana", desc: "Banana, peanut butter, oats, honey, almond milk", price: "11" },
      { name: "Green Detox", desc: "Spinach, kale, green apples, banana, chia seeds, almond milk", price: "11" },
    ],
  },
  {
    slug: "signature-drinks",
    name: "Signature Drinks",
    image: "/images/menu/category-signature.png",
    alt: "Three signature drinks in clear cups with The Brew logo",
    intro: "Crafted with purpose.",
    items: [
      { name: "Kyro Peach Latte", desc: "Espresso, peach syrup, milk", price: "9", image: "/images/menu/kyro-peach-latte.png" },
      { name: "Honey Lavender Brew", desc: "Espresso, milk, lavender syrup, honey", price: "9" },
      { name: "The Maple Brew", desc: "Espresso, maple syrup, milk, butter pecan", price: "9" },
      { name: "Berry Lemonade Tea", desc: "Hibiscus tea, berry syrup, berries, lime", price: "9", image: "/images/menu/berry-lemonade-tea.png" },
      { name: "Sweet Citrus Mint Tea", desc: "Green or white tea, lemon, honey, mint", price: "9" },
    ],
  },
  {
    slug: "meals",
    name: "The Brew Meals",
    image: "/images/menu/category-meals.png",
    alt: "A waffle, a breakfast sandwich and a bagel sandwich",
    intro: "Good food. Stronger people.",
    items: [
      { name: "Classic Egg & Cheese", desc: "Scrambled eggs, cheddar cheese on a brioche bun", price: "6", image: "/images/menu/classic-egg-and-cheese.png" },
      { name: "Build Your Own Omelette", desc: "Two eggs or egg whites, additions, choice of cheese, topped with chives or microgreens", price: "9" },
      { name: "Festive Chicken Salad", desc: "Chicken, greens, cranberries, feta, almonds", price: "10" },
      { name: "Avocado & Egg White", desc: "Egg whites, sliced avocado, tomato, spinach on a whole-grain English muffin", price: "8" },
      { name: "Bacon, Egg & Cheddar Bagel", price: "8" },
      { name: "Kids Mini Waffles", price: "8" },
      { name: "Sausage, Egg & Cheese Waffle", price: "8" },
      { name: "Salmon BLT Salad", price: "10" },
      { name: "Veggie Breakfast Wrap", price: "8" },
      { name: "Giant Waffle", desc: "With your choice of topping", price: "8" },
    ],
  },
  {
    slug: "paninis",
    name: "Paninis Plus",
    image: "/images/menu/category-paninis.png",
    alt: "Three grilled panini sandwiches cut in half",
    note: "Value Duets, $14. Lunch special, 10:30am to 4pm. Any sandwich and a soup, or any sandwich and a pastry or snack. May not be substituted with other items.",
    items: [
      { name: "Caprese", price: "10", image: "/images/menu/caprese-panini.png" },
      { name: "Turkey & Swiss", price: "11" },
      { name: "Chicken Pesto", price: "11" },
      { name: "Cheesy Kale Grilled Cheese", price: "11" },
      { name: "Tuna Provolone Melt", price: "11" },
      { name: "Spicy Avocado Honey Toast", price: "10" },
    ],
  },
  {
    slug: "pastries",
    name: "Pastries & Snacks",
    image: "/images/menu/category-pastries.png",
    alt: "A brownie, a croissant and a slice of cheesecake",
    items: [
      { name: "Brownie", price: "5.50" },
      { name: "Croissant", price: "5" },
      { name: "Cheesecake", price: "6" },
      { name: "Fresh Fruit Cup", price: "6" },
      { name: "Berry Parfait", price: "7" },
    ],
  },
  {
    slug: "soups",
    name: "Soups",
    image: "/images/menu/category-soups.png",
    alt: "Three bowls of soup: tomato basil, lentil and chicken noodle",
    note: "Pair any soup with a sandwich in a Value Duet, $14.",
    items: [
      { name: "Lentil", price: "6" },
      { name: "Tomato Basil", price: "5" },
      { name: "Motherland", price: "6" },
      { name: "Cheddar Broccoli", price: "6" },
      { name: "Chicken Noodle", price: "6" },
    ],
  },
];
