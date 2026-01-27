export type CoffeeCategory = "Capuccino" | "Macchiatto" | "Hot coffee";

export type CoffeeSize = "S" | "M" | "L";

export type CoffeeProduct = {
  id: string;
  title: string;
  category: CoffeeCategory;
  image: any;
  description: string;
  prices: Record<CoffeeSize, number>;
};

const IMAGES = {
  coffee1: require("../assets/images/coffee/coffee1.png"),
  coffee2: require("../assets/images/coffee/coffee2.png"),
  coffee3: require("../assets/images/coffee/coffee3.png"),
  coffee4: require("../assets/images/coffee/coffee4.png"),
};

export const CATEGORIES: CoffeeCategory[] = [
  "Capuccino",
  "Macchiatto",
  "Hot coffee",
];

export const PRODUCTS: CoffeeProduct[] = [
  {
    id: "1",
    title: "Iced Latte",
    category: "Capuccino",
    image: IMAGES.coffee1,
    description:
      "A refreshing iced latte made with espresso, cold milk, and ice cubes, perfect for a hot day.",
    prices: {
      S: 5.0,
      M: 6.0,
      L: 7.0,
    },
  },
  {
    id: "2",
    title: "Latte",
    category: "Macchiatto",
    image: IMAGES.coffee2,
    description:
      "A creamy latte made with rich espresso and steamed milk, topped with a light layer of foam.",
    prices: {
      S: 4.5,
      M: 5.5,
      L: 6.5,
    },
  },
  {
    id: "3",
    title: "Mocha",
    category: "Hot coffee",
    image: IMAGES.coffee3,
    description:
      "A delicious mocha combining espresso, steamed milk, and chocolate syrup, topped with whipped cream.",
    prices: {
      S: 6.0,
      M: 7.0,
      L: 8.0,
    },
  },

  {
    id: "4",
    title: "Espresso",
    category: "Hot coffee",
    image: IMAGES.coffee4,
    description:
      "A strong and bold espresso shot, perfect for a quick caffeine boost.",
    prices: {
      S: 3.0,
      M: 4.0,
      L: 5.0,
    },
  },
];

export const SPECIAL = {
  label: "Special for you",
  title: "Hot coffee",
  price: {
    S: 3.5,
    M: 4.5,
    L: 5.5,
  },
  image: IMAGES.coffee1,
};
