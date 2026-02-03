const defaultConfig = {
  background_color: "#faf9f7",
  surface_color: "#ffffff",
  text_color: "#2c2c2c",
  primary_action_color: "#d4af37",
  secondary_action_color: "#8b7355",
  font_family: "Inter",
  font_size: 16,
  brand_name: "LunaSol",
  tagline: "Handmade with Love",
  hero_title: "VALENTINE'S DAY SALE",
  hero_subtitle: "Up to 50% Off • Limited Time Only",
  cta_button: "Shop Sale",
};

const themePalettes = {
  light: {
    background_color: "#faf9f7",
    surface_color: "#ffffff",
    text_color: "#2c2c2c",
    primary_action_color: "#d4af37",
    secondary_action_color: "#8b7355",
  },
  dark: {
    background_color: "#14120f",
    surface_color: "#1d1a15",
    text_color: "#f3efe6",
    primary_action_color: "#d4af37",
    secondary_action_color: "#b9985a",
  },
};

const THEME_STORAGE_KEY = "lunasol-theme";
const valentineHeroColor = "#e11d48";
const valentineGlowColor = "rgba(225, 29, 72, 0.45)";

let config = { ...defaultConfig };
let wishlistItems = new Map();
let cartItems = new Map();
let currentView = "home";
let galleryOpen = false;
let currentGalleryProduct = null;
let currentGalleryImage = 0;
let sortByPerCategory = {};
let filterThemePerCategory = {};
let filtersVisiblePerCategory = {};
let selectedVariants = {}; // Tracks selected variant for each product
let themeMode = "light";
let hasStoredTheme = false;

function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      hasStoredTheme = true;
      return saved;
    }
  } catch (error) {
    // Ignore storage errors (privacy mode, blocked storage, etc.)
  }
  return null;
}

function applyThemeToConfig() {
  const palette = themePalettes[themeMode] || themePalettes.light;
  config = { ...config, ...palette };
}

function setTheme(mode, options = {}) {
  const { persist = true, render = true } = options;
  themeMode = mode === "dark" ? "dark" : "light";

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
      hasStoredTheme = true;
    } catch (error) {
      // Ignore storage errors
    }
  }

  applyThemeToConfig();
  if (render) {
    updateUI();
  }
}

function toggleTheme() {
  setTheme(themeMode === "dark" ? "light" : "dark");
}

function syncThemeUI() {
  document.documentElement.dataset.theme = themeMode;
  document.documentElement.style.colorScheme = themeMode;
  document.body.style.background = config.background_color;
  document.body.style.color = config.text_color;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", config.background_color);
  }
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    themeMode = stored;
  } else if (window.matchMedia) {
    themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  applyThemeToConfig();

  if (window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event) => {
      if (!hasStoredTheme) {
        setTheme(event.matches ? "dark" : "light", { persist: false });
      }
    };

    if (media.addEventListener) {
      media.addEventListener("change", handler);
    } else if (media.addListener) {
      media.addListener(handler);
    }
  }
}

const products = {
  keychains: [
    {
      id: "keychain1",
      name: "Letter Keychains",
      price: 100,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/k1.png"],
      description:
        "Personalize your style with these cute letter keychains. Perfect for gifting or treating yourself.",
      hasVariants: true,
      multiVariantTypes: true,
      variantGroups: [
        {
          variantType: "letter",
          variants: [
            { value: "A", inStock: true },
            { value: "B", inStock: true },
            { value: "C", inStock: true },
            { value: "D", inStock: true },
            { value: "E", inStock: true },
            { value: "F", inStock: true },
            { value: "G", inStock: true },
            { value: "H", inStock: true },
            { value: "I", inStock: true },
            { value: "J", inStock: true },
            { value: "K", inStock: true },
            { value: "L", inStock: true },
            { value: "M", inStock: true },
            { value: "N", inStock: true },
            { value: "O", inStock: true },
            { value: "P", inStock: true },
            { value: "Q", inStock: false },
            { value: "R", inStock: true },
            { value: "S", inStock: false },
            { value: "T", inStock: true },
            { value: "U", inStock: false },
            { value: "V", inStock: true },
            { value: "W", inStock: false },
            { value: "X", inStock: false },
            { value: "Y", inStock: true },
            { value: "Z", inStock: true },
          ]
        },
        {
          variantType: "color",
          variants: [
            { value: 'Baby Pink', color: '#f2b7ed', inStock: true },
            { value: 'Ocean Blue', color: '#4682B4', inStock: true },
            { value: 'Emerald Green', color: '#50C878', inStock: true },
            { value: 'Amber Gold', color: '#FFBF00', inStock: true },
            { value: 'Amethyst Purple', color: '#9966CC', inStock: true },
            { value: 'Ruby Red', color: '#E0115F', inStock: false },
            { value: 'Dark Blue', color: '#1d0166', inStock: true },
            { value: 'Pearl White', color: '#F0EAD6', inStock: false },
            { value: 'Onyx Black', color: '#353535', inStock: false },
            { value: 'Coral', color: '#db6a7b', inStock: true },
            { value: 'Lavender', color: '#e6c0ff', inStock: false },
            { value: 'Cyan', color: '#72fffd', inStock: true }

          ]
        }
      ]
    },
    {
      id: "keychain2",
      name: "Lipbalm Keychain with Lipbalm",
      price: 150,
      category: "Keychains",
      theme: "Trendy",
      sale: true,
      originalPrice: 180,
      inStock: true,
      isNew: false,
      images: ["images/k2.png", "images/k2.2.png", "images/k2.3.png"],
      description:
        "Lipbalm charm keychain with color details and matching beads.",
      hasVariants: true,
      variantType: "lipbalm",
      variants: [
        { value: "Himalaya", inStock: true },
        { value: "Vaseline", inStock: false },
        { value: "Lip Lite", inStock: false },
      ],
    },
    {
      id: "keychain3",
      name: "Cute Hen Keychain",
      price: 100,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/k3.png", "images/k3.2.png"],
      description:
        "Cute small keychain with lots of colorful beads and a hen charm.",
    },
    {
      id: "keychain4",
      name: "Cute Cat Keychain",
      price: 100,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/k4.png", "images/k4.2.png"],
      description:
        "Adorable cat charm keychain with pastel beads and a playful design.",
    },
    {
      id: "keychain5",
      name: "Adorable Teddy Bear Keychain",
      price: 100,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/k5.png", "images/k5.2.jpeg"],
      description:
        "Bright colored beaded keychain with matching teddy bear charm.",
    },

    {
      id: "keychain6",
      name: "Watermelon themed Keychain with Letter Variants",
      price: 100,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/k9.png"],
      description:
        "Vibrant watermelon themed keychain with colorful beads and a fresh design.",
      hasVariants: true,
      variantType: "letter",
      variants: [
        { value: "A", inStock: true },
        { value: "B", inStock: true },
        { value: "C", inStock: true },
        { value: "D", inStock: true },
        { value: "E", inStock: true },
        { value: "F", inStock: true },
        { value: "G", inStock: true },
        { value: "H", inStock: true },
        { value: "I", inStock: true },
        { value: "J", inStock: true },
        { value: "K", inStock: true },
        { value: "L", inStock: true },
        { value: "M", inStock: true },
        { value: "N", inStock: true },
        { value: "O", inStock: true },
        { value: "P", inStock: true },
        { value: "Q", inStock: false },
        { value: "R", inStock: true },
        { value: "S", inStock: false },
        { value: "T", inStock: true },
        { value: "U", inStock: false },
        { value: "V", inStock: true },
        { value: "W", inStock: false },
        { value: "X", inStock: false },
        { value: "Y", inStock: true },
        { value: "Z", inStock: true },
      ],
    },

    {
      id: "keychain7",
      name: "Rapunzel Keychain",
      price: 250,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: false,
      images: ["images/k8.jpeg", "images/k8.2.png"],
      description:
        "Matching colored keychain with cute rapunzel doll. Perfect for disney lovers.",
    },

    {
      id: "keychain8",
      name: "Jasmine Keychain",
      price: 230,
      category: "Keychains",
      theme: "Cute",
      sale: false,
      inStock: false,
      images: ["images/k10.png", "images/k10.2.png"],
      description:
        "Cute jasmine doll keychain with matching colorful beads. Perfect for disney lovers.",
    },

  ],
  necklaces: [
    {
      id: "necklace1",
      name: "Cute Fruit Charm Necklace",
      price: 200,
      category: "Necklaces",
      theme: "Trendy",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/n1.png", "images/n1.2.png"],
      description:
        "Personalize your style with this cute fruit charm necklace. Perfect for a girly get-together.",
      hasVariants: true,
      variantType: "fruit",
      variants: [
        { value: "Apple", inStock: true },
        { value: "Strawberry", inStock: true },

      ],
    },
    {
      id: "necklace2",
      name: "Beachy Shell Necklace",
      price: 180,
      category: "Necklaces",
      theme: "Beachy",
      sale: true,
      originalPrice: 200,
      inStock: true,
      isNew: false,
      images: ["images/n2.png"],
      description:
        "Perfect for beach lovers! Features a delicate shell pendant with white beads.",
    },
    {
      id: "necklace3",
      name: "Clay Beaded Beachy Shell Necklace",
      price: 230,
      category: "Necklaces",
      theme: "Beachy",
      sale: true,
      originalPrice: 250,
      inStock: false,
      isNew: false,
      images: ["images/n4.png"],
      description:
        "Handmade clay beaded necklace with a beachy shell pendant. Ideal for summer vibes.",
    },
    {
      id: "necklace4",
      name: "Colored Necklaces",
      price: 180,
      category: "Necklaces",
      theme: "Minimalist",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/n3.png"],
      description:
        "Simple and elegant colored necklace with a sleek design. Perfect for everyday wear.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "white with varients of blue", inStock: false },
        { value: "white and light blue", inStock: true },
        { value: "All yellow", inStock: true },
        { value: "pastel multi-colored", inStock: false },
        { value: "sunset colored", inStock: true },
        { value: "shades of blue", inStock: false },
        { value: "white and pink", inStock: true },
      ],
    },

  ],
  earrings: [
    {
      id: "earring1",
      name: "Beachy shell Vibes",
      price: 50,
      category: "Earrings",
      theme: "Beachy",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/e1.png"],
      description:
        "Bring the beach wherever you go with these shell earrings.Perfect for summer days and ocean lovers.",
    },
    {
      id: "earring2",
      name: "Clay beaded Shell Hoops",
      price: 70,
      category: "Earrings",
      theme: "Beachy",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/e2.png"],
      description:
        "Handcrafted clay beaded hoop earrings with cute shell. Beautiful blue colors for a beachy look.",
    },
    {
      id: "earring3",
      name: "Pink Earrings",
      price: 70,
      category: "Earrings",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/e3.png"],
      description:
        "Charming circular pink clay beaded earrings. Perfect for adding a pop of color to any outfit.",
    },
    {
      id: "earring4",
      name: "Two shaded Hoops",
      price: 60,
      category: "Earrings",
      theme: "Trendy",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/e4.png"],
      description:
        "Stylish hoop earrings with two shades of colored clay beads. Great for a trendy and chic look.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "pink and purple", inStock: false },
        { value: "cyan and light blue", inStock: true },
        { value: "light blue and dark blue", inStock: true },
        { value: "red and orange", inStock: false },
        { value: "baby pink and light pink", inStock: false }
      ]
    },
  ],
  rings: [
    {
      id: "ring1",
      name: "Cute Minimalist Ring",
      price: 30,
      category: "Rings",
      theme: "Minimalist",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/r1.png"],
      description:
        "Sleek and simple minimalist ring in different finish. Perfect for everyday elegance.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "pink and purple", inStock: false },
        { value: "Shades of green", inStock: true },
        { value: "Sunset", inStock: true },]
    },
    {
      id: "ring2",
      name: "Monochromatic minimalist rings",
      price: 30,
      category: "Rings",
      theme: "Minimalist",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/r2.png"],
      description:
        "Set of monochromatic minimalist rings in different finishes. Stack them up for a chic look.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "black", inStock: true },
        { value: "light green", inStock: true },
        { value: "yellow", inStock: true },
        { value: "white", inStock: true },
        { value: "orange", inStock: true },
        { value: "red", inStock: true },
        { value: "baby pink", inStock: false },
        { value: "light blue", inStock: true },]
    },

    {
      id: "ring3",
      name: "Set of three minimalist rings",
      price: 80,
      category: "Rings",
      theme: "Minimalist",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/r3.png"],
      description:
        "Elegant set of three minimalist rings. Perfect for stacking and mixing.",
    },

    {
      id: "ring4",
      name: "minimalist rings",
      price: 30,
      category: "Rings",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/r4.png"],
      description:
        "Charming minimalist rings in different finishes. Ideal for everyday wear.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "black, green and white", inStock: true },
        { value: "black, blue and white", inStock: true },
        { value: "blue, pink and white", inStock: true },
        { value: "red, pink and white", inStock: true },
        { value: "yellow, glass and white", inStock: false },
      ]
    },

  ],
  bracelets: [
    {
      id: "bracelet1",
      name: "Kuromi Bracelet",
      price: 120,
      category: "Bracelets",
      theme: "Fandom",
      sale: true,
      originalPrice: 150,
      inStock: true,
      isNew: false,
      images: ["images/b1.png", "images/b1.2.png"],
      description:
        "Cute dark colored beaded bracelet with big pearls in between. Perfect for kuromi lovers.",
    },
    {
      id: "bracelet2",
      name: "Strawberry Magic",
      price: 120,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 150,
      inStock: false,
      isNew: false,
      images: ["images/b2.png"],
      description:
        "Adorable strawberry charm bracelet with pastel beads and big pearls. A sweet accessory for any outfit.",
    },
    {
      id: "bracelet3",
      name: "Ladybug charm Bracelet",
      price: 130,
      category: "Bracelets",
      theme: "Fandom",
      sale: true,
      originalPrice: 150,
      inStock: true,
      isNew: false,
      images: ["images/b3.png", "images/b3.2.png"],
      description:
        "Charming ladybug bracelet with red and black beads. With star, small pearls, and ladybug charm.",
    },
    {
      id: "bracelet4",
      name: "Cute Cat Charm Bracelets",
      price: 120,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 150,
      inStock: true,
      isNew: true,
      images: ["images/b5.png", "images/b4.png", "images/b4.2.png"],
      description:
        "Delightful pink beaded bracelets with big pearls and a cute cat charm. Perfect for cat lovers.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "hot pink", inStock: true },
        { value: "light pink", inStock: true },]
    },
    {
      id: "bracelet5",
      name: "Real Madrid Bracelet",
      price: 80,
      category: "Bracelets",
      theme: "Fandom",
      sale: true,
      originalPrice: 100,
      inStock: true,
      isNew: false,
      images: ["images/b7.png", "images/b7.2.png"],
      description:
        "Show your team spirit with this Real Madrid themed bracelet. Perfect for football fans.",
    },

    {
      id: "bracelet6",
      name: "Minion Bracelet",
      price: 80,
      category: "Bracelets",
      theme: "Fandom",
      sale: true,
      originalPrice: 100,
      inStock: true,
      isNew: false,
      images: ["images/b8.png", "images/b8.2.png"],
      description:
        "Bright and fun minion-themed bracelet with yellow and blue beads. Great for Despicable Me fans.",
    },

    {
      id: "bracelet7",
      name: "Weeknd Bracelet",
      price: 110,
      category: "Bracelets",
      theme: "Fandom",
      sale: true,
      originalPrice: 120,
      inStock: true,
      isNew: false,
      images: ["images/b9.png", "images/b9.2.png"],
      description:
        "Bright and fun minion-themed bracelet with yellow and blue beads. Great for Despicable Me fans.",
    },
    {
      id: "bracelet8",
      name: "Stitch and Lilo Bracelet",
      price: 210,
      category: "Bracelets",
      theme: "Combo",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/b11.png", "images/b11.2.png"],
      description:
        "Combo set for besties! Cute stitch and lilo themed bracelets with colorful clay beads",
    },

    {
      id: "bracelet9",
      name: "Cute Orange Charm Bracelets",
      price: 110,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 130,
      inStock: true,
      isNew: true,
      images: ["images/b12.1.png", "images/b12.2.png"],
      description:
        "Cute orange charm bracelet with matching clay beads. Perfect for a fresh and vibrant look.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "Bright colors", inStock: true },
        { value: "Pastel colors", inStock: true },]

    },

    {
      id: "bracelet10",
      name: "Cute heart Charm Bracelets",
      price: 100,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 120,
      inStock: true,
      isNew: true,
      images: ["images/b13.1.png", "images/b13.2.png"],
      description:
        "Adorable heart charm bracelet with matching clay beads. Perfect for a sweet and lovely look.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "Bright colors", inStock: true },
        { value: "Pastel colors", inStock: true },]

    },

    {
      id: "bracelet11",
      name: "Cute matching teddy bear charm Bracelets",
      price: 210,
      category: "Bracelets",
      theme: "Combo",
      sale: false,
      inStock: false,
      isNew: false,
      images: ["images/b10.png", "images/b10.2.png"],
      description:
        "Bestie combo set! Cute matching teddy bear charm bracelets with colorful clay beads for you and your BFF.",
    },

    {
      id: "bracelet12",
      name: "mickey mouse and minnie mouse bracelet set ",
      price: 170,
      category: "Bracelets",
      theme: "Combo",
      sale: true,
      originalPrice: 200,
      inStock: true,
      isNew: true,
      images: ["images/b14.png", "images/b14.2.png"],
      description:
        "Adorable mickey and minnie mouse themed bracelet set. Cute to match with your loved one!",
    },

    {
      id: "bracelet13",
      name: "nemo and dory bracelet set ",
      price: 170,
      category: "Bracelets",
      theme: "Combo",
      sale: true,
      originalPrice: 200,
      inStock: true,
      isNew: true,
      images: ["images/b15.png", "images/b15.2.png"],
      description:
        "Cute nemo and dory themed bracelet set. Perfect for best friends to match!",
    },

    {
      id: "bracelet14",
      name: "Powerpuff girls bracelet set ",
      price: 320,
      category: "Bracelets",
      theme: "Combo",
      sale: true,
      originalPrice: 350,
      inStock: true,
      isNew: true,
      images: ["images/b16.png", "images/b16.2.png"],
      description:
        "Set of three matching powerpuff girls themed bracelets. Perfect for best friends to match!",
    },

    {
      id: "bracelet15",
      name: "Smiley Bracelet",
      price: 110,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 120,
      inStock: true,
      isNew: false,
      images: ["images/b17.png", "images/b17.2.png"],
      description:
        "Sunset themed bracelet with smiley charm and colorful beads. Bring positive vibes wherever you go.",
    },

    {
      id: "bracelet16",
      name: "Cute matching set of two Bracelets",
      price: 320,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 360,
      inStock: false,
      isNew: false,
      images: ["images/b18.png"],
      description:
        "Adorable matching set of two bracelets with colorful beads. Perfect for besties to share!",
    },

    {
      id: "bracelet17",
      name: "Cute Matching smiley Bracelets",
      price: 110,
      category: "Bracelets",
      theme: "Cute",
      sale: true,
      originalPrice: 130,
      inStock: true,
      isNew: true,
      images: ["images/b19.png"],
      description:
        "Cute orange charm bracelet with matching clay beads. Perfect for a fresh and vibrant look.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "Dark blue", inStock: true },
        { value: "Purple", inStock: true },
        { value: "Light blue", inStock: true },
        { value: "Pink", inStock: true },
        { value: "Yellow", inStock: true },
        { value: "Orange", inStock: false },
        { value: "Red", inStock: true },
        { value: "Green", inStock: true },
      ]
    },

  ],
  combo_sets: [
    {
      id: "comboset1",
      name: "Beachy set Combo",
      category: "Combo sets",
      theme: "Beachy",
      inStock: false,
      isNew: false,
      images: ["images/c4.png", "images/c8.png", "images/c5.png", "images/c7.png"],
      description:
        "Complete beachy combo set with shell necklace, shell earrings, and beach-themed ring and bracelet. Perfect for ocean lovers.",

      hasVariants: true,
      variantType: "color",

      variants: [
        {
          value: "With pearl bracelet and hoop earrings",
          price: 470,
          sale: true,
          originalPrice: 500,
          inStock: false
        },
        {
          value: "Without pearl bracelet and hoop earrings",
          price: 410,
          sale: true,
          originalPrice: 450,
          inStock: false
        },
        {
          value: "With pearl bracelet and shell earrings",
          price: 450,
          sale: true,
          originalPrice: 480,
          inStock: false
        },
        {
          value: "Without pearl bracelet and shell necklace",
          price: 400,
          sale: true,
          originalPrice: 440,
          inStock: false
        }
      ]
    },
    {
      id: "comboset2",
      name: "Purple Combo Set",
      price: 450,
      category: "Combo sets",
      theme: "Cute",
      sale: false,
      inStock: false,
      isNew: true,
      images: ["images/c11.png"],
      description:
        "Adorable purple-themed combo set with matching necklace, bracelet, earrings, and ring. Perfect for a coordinated look.",
    },
    {
      id: "comboset3",
      name: "Brown and green set",
      price: 250,
      category: "Combo sets",
      theme: "Trendy",
      sale: true,
      originalPrice: 300,
      inStock: true,
      isNew: false,
      images: ["images/c15.png"],
      description:
        "Charming brown and green-themed combo set with necklace and a pair of rings. Perfect for nature lovers.",
    },

  ],
  anklets: [
    {
      id: "anklet1",
      name: "Harry Styles Anklet",
      price: 100,
      category: "Anklets",
      theme: "Fandom",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/a1.png", "images/a1.2.png"],
      description:
        "Inspired by harry styles' iconic song Watermelon sugar. Features beads that match the song cover.",
    },
    {
      id: "anklet2",
      name: "Monochromatic Anklets",
      price: 100,
      category: "Anklets",
      theme: "Minimalist",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/a2.png"],
      description:
        "Simple and elegant monochromatic anklets in different finishes. Perfect for everyday wear.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: 'Baby Pink', color: '#f2b7ed', inStock: true },
        { value: 'Ocean Blue', color: '#4682B4', inStock: true },
        { value: 'Emerald Green', color: '#50C878', inStock: true },
        { value: 'Amber Gold', color: '#FFBF00', inStock: true },
        { value: 'Amethyst Purple', color: '#9966CC', inStock: true },
        { value: 'Ruby Red', color: '#E0115F', inStock: false },
        { value: 'Dark Blue', color: '#1d0166', inStock: true },
        { value: 'Pearl White', color: '#F0EAD6', inStock: false },
        { value: 'Onyx Black', color: '#353535', inStock: false },
        { value: 'Coral', color: '#db6a7b', inStock: true },
        { value: 'Lavender', color: '#e6c0ff', inStock: false },
        { value: 'Cyan', color: '#72fffd', inStock: true }

      ]
    },
    {
      id: "anklet3",
      name: "Black and White Anklets",
      price: 100,
      category: "Anklets",
      theme: "Trendy",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/a3.png"],
      description:
        "Chic black and white anklet set with minimalist design. Perfect for everyday elegance.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: 'Black', color: '#090709', inStock: true },
        { value: 'White', color: '#f1f6fa', inStock: true },
        { value: 'Black and White', inStock: true },]
    },
    {
      id: "anklet4",
      name: "Beach Inspired Anklet",
      price: 100,
      category: "Anklets",
      theme: "Beachy",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/a4.png"],
      description:
        "Delicate beach-inspired anklet with beautiful shades of blue. Perfect for ocean lovers.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: 'dark blue and light blue ', inStock: false },
        { value: 'blue and White', inStock: true },]
    },

    {
      id: "anklet5",
      name: "Barbie inspired Anklet",
      price: 100,
      category: "Anklets",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/a5.png"],
      description:
        "Pink and fun barbie inspired anklet with colorful beads. Perfect for barbie lovers.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: 'dark pink', inStock: true },
        { value: 'dark pink and blue ', inStock: true },
        { value: 'blue', inStock: true },]
    },

    {
      id: "anklet6",
      name: "Blue beaded Anklet with heart charm",
      price: 100,
      category: "Anklets",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/a6.png"],
      description:
        "Beautiful blue beaded anklet with a cute heart charm. Perfect for adding a pop of color to your look.",
    },

    {
      id: "anklet7",
      name: "Pink and White Anklets",
      price: 100,
      category: "Anklets",
      theme: "Trendy",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/a7.png"],
      description:
        "Chic pink and white anklet set with minimalist design. Perfect for everyday elegance.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: 'Pink', color: '#e786e7', inStock: false },
        { value: 'White', color: '#f1f6fa', inStock: true },
        { value: 'Pink and White', inStock: false },]
    },

  ],
  knitting_and_crochet: [
    {
      id: "knitting1",
      name: "Cute potli with flower design",
      price: 750,
      category: "Knitting and Crochet",
      theme: "Cute",
      sale: false,
      inStock: false,
      isNew: true,
      images: ["images/kc6.png"],
      description:
        "Adorable handcrafted potli bag with beautiful flower design. Perfect for carrying small essentials in style.",
    },
    {
      id: "knitting2",
      name: "Cherry Keychains",
      price: 230,
      category: "Knitting and Crochet",
      theme: "Trendy",
      sale: true,
      originalPrice: 250,
      inStock: true,
      isNew: false,
      images: ["images/kc3.png"],
      description:
        "Vibrant cherry-themed keychain with detailed crochet work. A perfect accessory for fruit lovers.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "Light Pink", inStock: true },
        { value: "Dark Pink", inStock: false },
        { value: "Red", inStock: true },
        { value: "Blue", inStock: false },
        { value: "Black", inStock: true },
      ]
    },
    {
      id: "crochet1",
      name: "Bow keychain",
      price: 200,
      category: "Knitting and Crochet",
      theme: "Trendy",
      sale: false,
      inStock: false,
      isNew: true,
      images: ["images/kc4.png"],
      description:
        "Charming bow-shaped keychain with intricate crochet details. A stylish accessory for your keys or bags.",
    },
      {
      id: "crochet3",
      name: "Flower Bookmark",
      price: 250,
      category: "Knitting and Crochet",
      theme: "Cute",
      sale: false,
      inStock: false,
      isNew: true,
      images: ["images/kc5.png"],
      description:
        "Beautiful handcrafted flower bookmark. Perfect for adding a touch of charm to your reading experience.",
    },
      {
      id: "crochet4",
      name: "Tulip Bookmarks",
      price: 180,
      category: "Knitting and Crochet",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: true,
      images: ["images/kc1.png"],
      description:
        "Adorable handcrafted amigurumi toy. Perfect as a cute gift or collectable for amigurumi lovers.",
        hasVariants: true,
      variantType: "color",
      variants: [
        { value: "lavender", inStock: false },
        { value: "pink", inStock: true },
        { value: "red", inStock: true },
        { value: "blue", inStock: false },
        { value: "yellow", inStock: false },
        { value: "orange", inStock: true },
        { value: "white", inStock: false },
      ]
    },
    {
      id: "crochet2",
      name: "Flower with leaf Bookmark",
      price: 180,
      category: "Knitting and Crochet",
      theme: "Cute",
      sale: false,
      inStock: true,
      isNew: false,
      images: ["images/kc2.png"],
      description:
        "Delightful handcrafted flower bookmark with leaf detail. A charming accessory for book lovers.",
      hasVariants: true,
      variantType: "color",
      variants: [
        { value: "lavender", inStock: false },
        { value: "pink", inStock: true },
        { value: "red", inStock: true },
        { value: "blue", inStock: true },
        { value: "yellow", inStock: true },
      ]
    },
    
  ],
};

const allProducts = Object.values(products).flat();

const dataHandler = {
  onDataChanged(data) {
    wishlistItems.clear();
    cartItems.clear();

    data.forEach((record) => {
      if (record.action_type === "wishlist") {
        const key = buildItemKey(record.item_id, record.variant);
        wishlistItems.set(key, {
          key,
          productId: record.item_id,
          variant: cloneVariant(record.variant),
        });
      } else if (record.action_type === "cart") {
        const key = buildItemKey(record.item_id, record.variant);
        const existing = cartItems.get(key);
        if (existing) {
          existing.quantity += 1;
        } else {
          cartItems.set(key, {
            key,
            productId: record.item_id,
            variant: cloneVariant(record.variant),
            quantity: 1,
          });
        }
      }
    });

    updateUI();
  },
};

async function toggleWishlist(productId, variantOverride) {
  const existingRecords = Array.from(
    document.querySelectorAll(`[data-wishlist-record="${productId}"]`)
  );
  const product = allProducts.find((p) => p.id === productId);
  const variantSelection =
    variantOverride !== undefined ? variantOverride : selectedVariants[productId];

  if (product && product.hasVariants) {
    if (product.multiVariantTypes) {
      if (
        !variantSelection ||
        !product.variantGroups.every(
          (group) => variantSelection[group.variantType]
        )
      ) {
        showNotification("Please select all variant options", "error");
        return;
      }
    } else if (!variantSelection) {
      showNotification("Please select a " + product.variantType, "error");
      return;
    }
  }

  const itemKey = buildItemKey(productId, variantSelection);
  const wasInWishlist = wishlistItems.has(itemKey);

  if (wasInWishlist) {
    wishlistItems.delete(itemKey);
    
    // Try to delete records if dataSdk is available
    if (window.dataSdk) {
      try {
        const recordsToDelete = existingRecords.map((el) =>
          JSON.parse(el.dataset.record)
        );
        for (const record of recordsToDelete) {
          await window.dataSdk.delete(record);
        }
      } catch (error) {
        // In local mode, just proceed
      }
    }
    
    showNotification("Removed from wishlist", "success");
  } else {
    wishlistItems.set(itemKey, {
      key: itemKey,
      productId,
      variant: cloneVariant(variantSelection),
    });
    
    // Try to create record if dataSdk is available
    if (window.dataSdk) {
      try {
        const result = await window.dataSdk.create({
          item_id: productId,
          item_type:
            product?.category || "Unknown",
          action_type: "wishlist",
          variant: cloneVariant(variantSelection),
          timestamp: Date.now(),
        });

        if (!result.isOk) {
          wishlistItems.delete(itemKey);
          showNotification("Failed to add to wishlist", "error");
          updateUI();
          return;
        }
      } catch (error) {
        // In local mode, keep the change
      }
    }
    
    showNotification("Added to wishlist", "success");
  }

  updateUI();
}

async function addToCart(productId, variantOverride) {
  const product = allProducts.find((p) => p.id === productId);
  const variantSelection =
    variantOverride !== undefined ? variantOverride : selectedVariants[productId];

  // Check if product has variants and one is selected
  if (product && product.hasVariants) {
    if (product.multiVariantTypes) {
      // Check if all variant types are selected
      if (
        !variantSelection ||
        !product.variantGroups.every(
          (group) => variantSelection[group.variantType]
        )
      ) {
        showNotification("Please select all variant options", "error");
        return;
      }
    } else {
      if (!variantSelection) {
        showNotification("Please select a " + product.variantType, "error");
        return;
      }
    }
  }

  const itemKey = buildItemKey(productId, variantSelection);
  const existing = cartItems.get(itemKey);
  const currentCount = existing ? existing.quantity : 0;
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.set(itemKey, {
      key: itemKey,
      productId,
      variant: cloneVariant(variantSelection),
      quantity: 1,
    });
  }

  const itemData = {
    item_id: productId,
    item_type: product?.category || "Unknown",
    action_type: "cart",
    timestamp: Date.now(),
  };

  // Add variant info if product has variants
  if (product && product.hasVariants && variantSelection) {
    itemData.variant = cloneVariant(variantSelection);
  }

  // Try to persist if dataSdk is available
  if (window.dataSdk) {
    try {
      const result = await window.dataSdk.create(itemData);
      if (result.isOk) {
        showNotification("Added to cart", "success");
      } else {
        if (currentCount > 0) {
          const rollback = cartItems.get(itemKey);
          if (rollback) {
            rollback.quantity = currentCount;
          }
        } else {
          cartItems.delete(itemKey);
        }
        showNotification("Failed to add to cart", "error");
      }
    } catch (error) {
      // In local mode, keep the change
      showNotification("Added to cart", "success");
    }
  } else {
    // Local mode - just show success
    showNotification("Added to cart", "success");
  }

  updateUI();
}

async function removeFromCart(itemKey) {
  const existingRecords = Array.from(
    document.querySelectorAll(`[data-cart-record="${itemKey}"]`)
  );

  if (existingRecords.length > 0) {
    const recordToDelete = JSON.parse(existingRecords[0].dataset.record);
    await window.dataSdk.delete(recordToDelete);
  }

  let keyToUpdate = itemKey;
  if (!cartItems.has(keyToUpdate)) {
    const fallback = Array.from(cartItems.values()).find(
      (item) => item.productId === itemKey
    );
    keyToUpdate = fallback ? fallback.key : null;
  }

  if (keyToUpdate && cartItems.has(keyToUpdate)) {
    const item = cartItems.get(keyToUpdate);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cartItems.delete(keyToUpdate);
    }
    updateUI();
  }
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 px-6 py-3 rounded-lg shadow-2xl z-50 fade-in";
  notification.style.background =
    type === "success" ? config.surface_color : "#3a0000";
  notification.style.border = `1px solid ${type === "success" ? config.primary_action_color : "#ff0000"
    }`;
  notification.style.color = config.text_color;
  notification.style.fontSize = `${config.font_size * 0.875}px`;
  notification.style.fontFamily = `${config.font_family}, sans-serif`;
  notification.style.fontWeight = "400";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100px)";
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

function incrementCartItem(itemKey) {
  const item = cartItems.get(itemKey);
  if (item) {
    item.quantity += 1;
  }
  updateUI();
}

function decrementCartItem(itemKey) {
  const item = cartItems.get(itemKey);
  if (!item) {
    return;
  }
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cartItems.delete(itemKey);
  }
  updateUI();
}

function removeCartItem(itemKey) {
  cartItems.delete(itemKey);
  updateUI();
}

function removeFromWishlist(itemKey) {
  if (wishlistItems.has(itemKey)) {
    wishlistItems.delete(itemKey);
  } else {
    const keysToDelete = Array.from(wishlistItems.keys()).filter(
      (key) => key === itemKey || key.startsWith(itemKey + "::")
    );
    keysToDelete.forEach((key) => wishlistItems.delete(key));
  }
  updateUI();
}

function moveToWishlist(itemKey) {
  const item = cartItems.get(itemKey);
  if (!item) {
    return;
  }
  cartItems.delete(itemKey);
  const wishlistKey = buildItemKey(item.productId, item.variant);
  wishlistItems.set(wishlistKey, {
    key: wishlistKey,
    productId: item.productId,
    variant: cloneVariant(item.variant),
  });
  updateUI();
}

function addToCartFromWishlist(itemKey) {
  const item = wishlistItems.get(itemKey);
  if (!item) {
    return;
  }
  addToCart(item.productId, item.variant);
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Basic validation
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'pincode'];
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!formData.get(field)) {
      isValid = false;
    }
  });
  
  const paymentMethod = formData.get('paymentMethod');
  if (paymentMethod === 'card') {
    if (!formData.get('cardNumber') || !formData.get('expiry') || !formData.get('cvv')) {
      isValid = false;
    }
  }
  
  if (!isValid) {
    showNotification("Please fill in all required fields", "error");
    return;
  }
  
  // Simulate order placement
  showNotification("Order placed successfully!", "success");
  
  // Clear cart
  cartItems.clear();
  
  // Navigate to home
  setTimeout(() => {
    navigate('home');
  }, 2000);
}

function navigate(view) {
  currentView = view;
  updateUI();
}

function openGallery(productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (product) {
    currentGalleryProduct = product;
    currentGalleryImage = 0;
    galleryOpen = true;
    document.body.style.overflow = "hidden";
    updateUI();
  }
}

function closeGallery() {
  galleryOpen = false;
  currentGalleryProduct = null;
  currentGalleryImage = 0;
  document.body.style.overflow = "";
  updateUI();
}

function toggleFilters(category) {
  filtersVisiblePerCategory[category] =
    !filtersVisiblePerCategory[category];
  updateUI();
}

function setSortBy(category, sort) {
  sortByPerCategory[category] = sort;
  updateUI();
}

function setFilterTheme(category, theme) {
  filterThemePerCategory[category] = theme;
  updateUI();
}

function selectVariant(productId, variantValue) {
  selectedVariants[productId] = variantValue;
  updateUI();
}

function selectVariantMulti(productId, variantType, variantValue) {
  if (!selectedVariants[productId]) {
    selectedVariants[productId] = {};
  }
  selectedVariants[productId][variantType] = variantValue;
  updateUI();
}

function renderValentineEffects() {
  return `
    <div class="valentine-float" aria-hidden="true">
      <span class="valentine-heart" style="left: 6%; --scale: 0.8; animation-delay: 0s; animation-duration: 12s;"></span>
      <span class="valentine-heart" style="left: 18%; --scale: 1; animation-delay: 2s; animation-duration: 14s;"></span>
      <span class="valentine-heart" style="left: 30%; --scale: 0.7; animation-delay: 1s; animation-duration: 11s;"></span>
      <span class="valentine-heart" style="left: 42%; --scale: 1.1; animation-delay: 3s; animation-duration: 15s;"></span>
      <span class="valentine-heart" style="left: 58%; --scale: 0.9; animation-delay: 0.5s; animation-duration: 13s;"></span>
      <span class="valentine-heart" style="left: 72%; --scale: 1.05; animation-delay: 2.5s; animation-duration: 16s;"></span>
      <span class="valentine-heart" style="left: 86%; --scale: 0.8; animation-delay: 1.5s; animation-duration: 12s;"></span>
      <span class="valentine-bloom" style="left: 12%; --scale: 0.8; animation-delay: 0.8s; animation-duration: 10s;"></span>
      <span class="valentine-bloom" style="left: 36%; --scale: 1; animation-delay: 2.2s; animation-duration: 12s;"></span>
      <span class="valentine-bloom" style="left: 64%; --scale: 0.9; animation-delay: 1.2s; animation-duration: 11s;"></span>
      <span class="valentine-bloom" style="left: 90%; --scale: 1.1; animation-delay: 2.8s; animation-duration: 13s;"></span>
    </div>
  `;
}

function cloneVariant(variant) {
  if (!variant || typeof variant !== "object") {
    return variant;
  }
  return { ...variant };
}

function buildVariantKey(variant) {
  if (variant === undefined || variant === null || variant === "") {
    return "";
  }
  if (typeof variant !== "object") {
    return String(variant);
  }
  return Object.keys(variant)
    .sort()
    .map((key) => `${key}:${variant[key]}`)
    .join("|");
}

function buildItemKey(productId, variant) {
  const variantKey = buildVariantKey(variant);
  return variantKey ? `${productId}::${variantKey}` : productId;
}

function formatVariantLabel(label) {
  return String(label)
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getVariantDisplayText(product, variant) {
  if (!product || !product.hasVariants || !variant) {
    return "";
  }

  const parts = [];
  if (product.multiVariantTypes && typeof variant === "object") {
    const groups = product.variantGroups || [];
    groups.forEach((group) => {
      const value = variant[group.variantType];
      if (value) {
        parts.push(`${formatVariantLabel(group.variantType)}: ${value}`);
      }
    });
  }

  if (parts.length === 0) {
    if (typeof variant === "object") {
      Object.keys(variant)
        .sort()
        .forEach((key) => {
          const value = variant[key];
          if (value) {
            parts.push(`${formatVariantLabel(key)}: ${value}`);
          }
        });
    } else {
      const label = product.variantType
        ? formatVariantLabel(product.variantType)
        : "Variant";
      parts.push(`${label}: ${variant}`);
    }
  }

  return parts.join(", ");
}

function getCartCount() {
  return Array.from(cartItems.values()).reduce(
    (sum, item) =>
      sum + (typeof item === "number" ? item : item.quantity || 0),
    0
  );
}

function getWishlistCount() {
  return wishlistItems.size;
}

function isProductInWishlist(productId) {
  for (const item of wishlistItems.values()) {
    if (item.productId === productId) {
      return true;
    }
  }
  return false;
}

function isVariantInWishlist(productId, variant) {
  const key = buildItemKey(productId, variant);
  return wishlistItems.has(key);
}

function getWishlistEntries() {
  return Array.from(wishlistItems.values())
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      ...item,
      product: allProducts.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product);
}

function getCartEntries() {
  return Array.from(cartItems.values())
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      ...item,
      product: allProducts.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product);
}

function sortAndFilterProducts(productsList, category) {
  let filtered = [...productsList];

  const currentFilter = filterThemePerCategory[category] || "all";
  const currentSort = sortByPerCategory[category] || "default";

  if (currentFilter !== "all") {
    filtered = filtered.filter((p) => p.theme === currentFilter);
  }

  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "name-az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === "name-za") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (currentSort === "newest") {
    filtered.reverse();
  }

  return filtered;
}

function updateGalleryImage() {
  const galleryImg = document.getElementById("gallery-image");
  const galleryLabel = document.getElementById("gallery-label");
  if (galleryImg && galleryLabel && currentGalleryProduct) {
    galleryImg.src = currentGalleryProduct.images[currentGalleryImage];
    galleryLabel.textContent = "";
  }
}

function renderHeader() {
  const wishlistCount = getWishlistCount();
  const cartCount = getCartCount();
  const isDarkMode = themeMode === "dark";
  const themeLabel = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  const themeIcon = isDarkMode
    ? `<svg class="w-6 h-6" fill="none" stroke="${config.text_color}" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4"></circle>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>`
    : `<svg class="w-6 h-6" fill="none" stroke="${config.text_color}" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"></path>
        </svg>`;

  return `
        <header class="sticky top-0 z-40" style="background: ${config.background_color
    }; border-bottom: 1px solid rgba(212, 175, 55, 0.1); backdrop-filter: blur(20px);">
          <div class="max-w-7xl mx-auto px-6 py-6">
            <div class="flex items-center justify-between">
              <button onclick="navigate('home')" class="flex flex-col items-start">
                <h1 class="font-heading" style="font-size: ${config.font_size * 2
    }px; color: ${config.text_color
    }; font-weight: 400; letter-spacing: 4px;">
                  ${config.brand_name}
                </h1>
                <p class="font-body" style="font-size: ${config.font_size * 0.75
    }px; color: ${config.primary_action_color
    }; opacity: 0.7; letter-spacing: 2px; margin-top: 4px;">
                  ${config.tagline}
                </p>
              </button>
              
              <div class="flex items-center gap-6">
                <button onclick="toggleTheme()" class="transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); padding: 6px; border-radius: 9999px;" aria-label="${themeLabel}" title="${themeLabel}">
                  ${themeIcon}
                </button>
                <button onclick="navigate('wishlist')" class="relative transition-opacity hover:opacity-70">
                  <svg class="w-6 h-6" fill="${wishlistCount > 0 ? config.primary_action_color : "none"
    }" stroke="${config.text_color
    }" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  ${wishlistCount > 0
      ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size * 0.625
      }px; font-weight: 500;">${wishlistCount}</span>`
      : ""
    }
                </button>
                
                <button onclick="navigate('cart')" class="relative transition-opacity hover:opacity-70">
                  <svg class="w-6 h-6" fill="none" stroke="${config.text_color
    }" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  ${cartCount > 0
      ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size * 0.625
      }px; font-weight: 500;">${cartCount}</span>`
      : ""
    }
                </button>
              </div>
            </div>
            
            <nav class="mt-8">
              <div class="flex items-center justify-center gap-8">
                ${[
      "home",
      "sale",
      "keychains",
      "necklaces",
      "earrings",
      "rings",
      "bracelets",
      "combo_sets",
      "anklets",
      "knitting_and_crochet",
    ]
      .map((view) => {
        const labels = {
          home: "All",
          sale: "🔥 Sale",
          keychains: "Keychains",
          necklaces: "Necklaces",
          earrings: "Earrings",
          rings: "Rings",
          bracelets: "Bracelets",
          combo_sets: "Combo sets",
          anklets: "Anklets",
          knitting_and_crochet: "Knitting & Crochet",
        };
        const isActive = currentView === view;
        return `
                    <button onclick="navigate('${view}')" class="relative transition-opacity hover:opacity-70" style="color: ${isActive ? config.primary_action_color : config.text_color
          }; font-size: ${config.font_size * 0.875}px; font-weight: ${isActive ? "500" : "300"
          }; letter-spacing: 1px;">
                      ${labels[view]}
                      ${isActive
            ? `<div class="absolute -bottom-2 left-0 right-0 h-px" style="background: ${config.primary_action_color};"></div>`
            : ""
          }
                    </button>
                  `;
      })
      .join("")}
              </div>
            </nav>
          </div>
        </header>
      `;
}

function renderProductCard(product) {
  const isInWishlist = isProductInWishlist(product.id);

  return `
        <div class="product-card" style="background: ${config.surface_color
    }; border: 1px solid rgba(212, 175, 55, 0.1); position: relative;">
          <div class="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
            ${product.sale
      ? `<div class="px-3 py-1" style="background: #dc2626; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);">SALE</div>`
      : ""
    }
            ${product.isNew
      ? `<div class="px-3 py-1" style="background: #16a34a; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(22, 163, 74, 0.4);">NEW</div>`
      : ""
    }
            ${!product.inStock
      ? `<div class="px-3 py-1" style="background: #6b7280; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(107, 114, 128, 0.4);">OUT OF STOCK</div>`
      : ""
    }
          </div>
          
          <button onclick="openGallery('${product.id
    }')" class="aspect-square relative w-full cursor-pointer group overflow-hidden" style="background: ${config.background_color
    };">
            <img src="${product.images[0]}" alt="${product.name
    }" class="w-full h-full object-cover" onerror="this.style.display='none';">
            ${!product.inStock
      ? `<div class="absolute inset-0" style="background: rgba(0,0,0,0.5);"></div>`
      : ""
    }
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style="background: rgba(0,0,0,0.4);">
              <span style="color: ${config.text_color}; font-size: ${config.font_size
    }px; font-weight: 300; letter-spacing: 2px;">VIEW</span>
            </div>
          </button>
          
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-grow">
                <h3 class="font-heading" style="font-size: ${config.font_size * 1.125
    }px; color: ${config.text_color
    }; font-weight: 400; line-height: 1.4; ${!product.inStock ? "opacity: 0.5;" : ""
    }">
                  ${product.name}
                </h3>
                <span class="inline-block mt-2 capitalize" style="font-size: ${config.font_size * 0.75
    }px; color: ${config.text_color
    }; opacity: 0.5; font-weight: 300; letter-spacing: 1px;">
                  ${product.theme.replace("-", " ")}
                </span>
              </div>
              
              <button onclick="toggleWishlist('${product.id
    }')" class="transition-opacity hover:opacity-70">
                <svg class="w-5 h-5" fill="${isInWishlist ? config.primary_action_color : "none"
    }" stroke="${isInWishlist ? config.primary_action_color : config.text_color
    }" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center justify-between mt-4 pt-4" style="border-top: 1px solid rgba(212, 175, 55, 0.1);">
              <div>
                <span class="font-heading" style="font-size: ${config.font_size * 1.25
    }px; color: ${config.primary_action_color}; font-weight: 400; ${!product.inStock ? "opacity: 0.5;" : ""
    }">
                  ₹${product.price}
                </span>
                ${product.sale
      ? `<span style="font-size: ${config.font_size * 0.875
      }px; color: ${config.text_color
      }; opacity: 0.4; text-decoration: line-through; margin-left: 8px;">₹${product.originalPrice
      }</span>`
      : ""
    }
              </div>
              
              <button onclick="addToCart('${product.id}')" ${!product.inStock ? "disabled" : ""
    } class="btn-primary px-6 py-2 transition-opacity ${product.inStock ? "hover:opacity-80" : ""
    }" style="background: ${product.inStock ? config.primary_action_color : "#9ca3af"
    }; color: ${config.background_color}; font-size: ${config.font_size * 0.875
    }px; font-weight: 400; letter-spacing: 1px; cursor: ${product.inStock ? "pointer" : "not-allowed"
    }; opacity: ${product.inStock ? "1" : "0.6"};">
                ${product.inStock ? "ADD" : "OUT"}
              </button>
            </div>
          </div>
        </div>
      `;
}

function renderHome() {
  const saleProducts = allProducts.filter((p) => p.sale);
  
  // Extract all unique themes from products (case-insensitive)
  const uniqueThemes = [...new Set(allProducts.map(p => p.theme.toLowerCase()))];
  const sortedThemes = uniqueThemes.sort();

  // Theme colors and descriptions for better presentation
  const themeConfig = {
    cute: {
      color: '#f2b7ed',
      description: 'Adorable and charming pieces perfect for spreading joy',
      icon: '✨'
    },
    trendy: {
      color: '#FFBF00',
      description: 'Modern and fashionable designs for the style-conscious',
      icon: '⚡'
    },
    beachy: {
      color: '#4682B4',
      description: 'Coastal vibes and ocean-inspired jewelry',
      icon: '🌊'
    },
    minimalist: {
      color: '#F0EAD6',
      description: 'Simple elegance with clean, timeless designs',
      icon: '◆'
    },
    anime: {
      color: '#9966CC',
      description: 'Anime and pop-culture inspired jewelry',
      icon: '🎨'
    },
    boho: {
      color: '#8b7355',
      description: 'Free-spirited bohemian style and craftsmanship',
      icon: '🌿'
    },
    'pop-culture': {
      color: '#dc2626',
      description: 'Express your fandom with pop-culture jewelry',
      icon: '🎭'
    }
  };

  return `
        <div>
          <section class="relative valentine-hero" style="background: linear-gradient(135deg, ${config.surface_color
    } 0%, ${config.background_color
    } 100%); min-height: 60%; display: flex; align-items: center; border-bottom: 2px solid ${config.primary_action_color
    }; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);">
            ${renderValentineEffects()}
            <div class="max-w-7xl mx-auto px-6 py-32 text-center valentine-content">
              <div class="fade-in pulse-sale">
                <h2 class="font-heading mb-4" style="font-size: ${config.font_size * 5
    }px; color: ${valentineHeroColor
    }; font-weight: 700; letter-spacing: 8px; line-height: 1.1; text-shadow: 0 8px 30px ${valentineGlowColor}; text-transform: uppercase;">
                  ${config.hero_title}
                </h2>
                <p class="mb-12" style="font-size: ${config.font_size * 1.5
    }px; color: ${config.text_color
    }; opacity: 0.8; font-weight: 500; letter-spacing: 2px;">
                  ${config.hero_subtitle}
                </p>
                <button onclick="navigate('sale')" class="btn-primary px-10 py-4" style="background: ${config.primary_action_color
    }; color: ${config.background_color}; font-size: ${config.font_size
    }px; font-weight: 400; letter-spacing: 2px;">
                  ${config.cta_button}
                </button>
              </div>
            </div>
          </section>

          ${saleProducts.length > 0
      ? `
          <section class="py-20" style="background: ${config.surface_color};">
            <div class="max-w-7xl mx-auto px-6">
              <h2 class="font-heading text-center mb-12" style="font-size: ${config.font_size * 2
      }px; color: ${config.text_color
      }; font-weight: 300; letter-spacing: 3px;">
                Sale Items
              </h2>
              <div class="carousel-container flex gap-6 overflow-x-auto pb-4">
                ${saleProducts
        .map(
          (product) => `
                  <div class="carousel-slide flex-shrink-0 w-80 fade-in">
                    ${renderProductCard(product)}
                  </div>
                `
        )
        .join("")}
              </div>
            </div>
          </section>
          `
      : ""
    }

          <section id="collections" class="py-24" style="background: ${config.background_color
    };">
            <div class="max-w-7xl mx-auto px-6">
              <div class="text-center mb-24">
                <h2 class="font-heading mb-4" style="font-size: ${config.font_size * 2.5
    }px; color: ${config.text_color
    }; font-weight: 300; letter-spacing: 3px;">
                  Themed Collections
                </h2>
                <p style="font-size: ${config.font_size}px; color: ${config.text_color
    }; opacity: 0.6; max-width: 600px; margin: 0 auto;">
                  Explore our curated collections, each with its own unique style and personality
                </p>
              </div>
              
              ${sortedThemes
      .map((theme) => {
        const themeProducts = allProducts.filter(
          (p) => p.theme.toLowerCase() === theme
        );
        if (themeProducts.length === 0) return "";
        
        const config_theme = themeConfig[theme] || {
          color: config.primary_action_color,
          description: 'Discover our ' + theme + ' collection',
          icon: '◆'
        };

        return `
                  <div class="mb-24 fade-in" style="padding: 24px; border-radius: 4px; background: ${config_theme.color}15; border-left: 4px solid ${config_theme.color};">
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                          <span style="font-size: 28px;">${config_theme.icon}</span>
                          <h3 class="font-heading capitalize" style="font-size: ${config.font_size * 1.75
          }px; color: ${config.text_color
          }; font-weight: 400; letter-spacing: 2px; margin: 0;">
                            ${theme.replace("-", " ")}
                          </h3>
                        </div>
                        <p style="font-size: ${config.font_size * 0.875
          }px; color: ${config.text_color
          }; opacity: 0.7; font-weight: 300; margin: 0;">
                          ${config_theme.description}
                        </p>
                      </div>
                      <div style="text-align: right;">
                        <span style="display: inline-block; padding: 8px 16px; background: ${config_theme.color}; color: ${config.background_color}; border-radius: 20px; font-size: ${config.font_size * 0.75
          }px; font-weight: 600; letter-spacing: 1px;">
                          ${themeProducts.length} ${themeProducts.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </div>
                    <div class="carousel-container flex gap-6 overflow-x-auto pb-4 mt-6">
                      ${themeProducts
            .map(
              (product) => `
                        <div class="carousel-slide flex-shrink-0 w-80">
                          ${renderProductCard(product)}
                        </div>
                      `
            )
            .join("")}
                    </div>
                  </div>
                `;
      })
      .join("")}
            </div>
          </section>

          <footer class="py-16" style="background: ${config.surface_color
    }; border-top: 1px solid rgba(212, 175, 55, 0.1);">
            <div class="max-w-7xl mx-auto px-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                  <h4 class="font-heading mb-4" style="font-size: ${config.font_size * 1.25
    }px; color: ${config.text_color
    }; font-weight: 400; letter-spacing: 2px;">
                    ${config.brand_name}
                  </h4>
                  <p style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color
    }; opacity: 0.6; line-height: 1.8; font-weight: 300;">
                    ${config.tagline
    }. Each piece is handcrafted with attention to detail.
                  </p>
                </div>
                
                <div>
                  <h4 class="font-heading mb-4" style="font-size: ${config.font_size
    }px; color: ${config.primary_action_color
    }; font-weight: 400; letter-spacing: 2px;">
                    Quick Links
                  </h4>
                  <div class="space-y-2">
                    ${["home", "sale", "keychains", "necklaces"]
      .map(
        (view) => `
                      <button onclick="navigate('${view}')" class="block transition-opacity hover:opacity-70" style="font-size: ${config.font_size * 0.875
          }px; color: ${config.text_color
          }; opacity: 0.6; text-align: left; font-weight: 300;">
                        ${view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    `
      )
      .join("")}
                  </div>
                </div>
                
                <div>
                  <h4 class="font-heading mb-4" style="font-size: ${config.font_size
    }px; color: ${config.primary_action_color
    }; font-weight: 400; letter-spacing: 2px;">
                    Connect
                  </h4>
                  <p style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color
    }; opacity: 0.6; margin-bottom: 12px; font-weight: 300;">
                    Follow us for updates
                  </p>
                </div>
              </div>
              
              <div class="divider mb-8"></div>
              
              <div class="text-center">
                <p style="font-size: ${config.font_size * 0.75}px; color: ${config.text_color
    }; opacity: 0.4; font-weight: 300; letter-spacing: 1px;">
                  © 2026 ${config.brand_name}. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      `;
}

function renderSale() {
  const saleProducts = allProducts.filter((p) => p.sale);

  return `
        <div class="py-20" style="background: ${config.background_color
    }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-12 fade-in valentine-hero">
              ${renderValentineEffects()}
              <div class="valentine-content">
              <h2 class="font-heading mb-4 pulse-sale" style="font-size: ${config.font_size * 3
    }px; color: ${valentineHeroColor
    }; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; text-shadow: 0 6px 22px ${valentineGlowColor};">
                ${config.hero_title}
              </h2>
              <p class="mb-6" style="font-size: ${config.font_size * 1.25
    }px; color: ${config.text_color
    }; opacity: 0.7; font-weight: 400; letter-spacing: 1px;">
                ${config.hero_subtitle}
              </p>
              </div>
            </div>
            
            ${saleProducts.length === 0
      ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${config.text_color
      }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  No sale items available at the moment
                </p>
                <button onclick="navigate('home')" class="btn-primary px-8 py-3" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size * 0.875
      }px; font-weight: 400; letter-spacing: 2px;">
                  BROWSE ALL PRODUCTS
                </button>
              </div>
            `
      : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${saleProducts
        .map((product) => renderProductCard(product))
        .join("")}
              </div>
            `
    }
          </div>
        </div>
      `;
}

function renderWishlist() {
  const wishlistEntries = getWishlistEntries();

  return `
        <div class="py-20" style="background: ${config.background_color
    }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <h2 class="font-heading mb-12" style="font-size: ${config.font_size * 2
    }px; color: ${config.text_color
    }; font-weight: 300; letter-spacing: 3px;">
              Wishlist
            </h2>
            
            ${wishlistEntries.length === 0
      ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${config.text_color
      }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  Your wishlist is empty
                </p>
                <button onclick="navigate('home')" class="btn-primary px-8 py-3" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size * 0.875
      }px; font-weight: 400; letter-spacing: 2px;">
                  START SHOPPING
                </button>
              </div>
            `
      : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${wishlistEntries
        .map((entry) => {
          const product = entry.product;
          const variantText = getVariantDisplayText(product, entry.variant);
          return `
        <div class="product-card" style="background: ${config.surface_color
    }; border: 1px solid rgba(212, 175, 55, 0.1); position: relative;">
          <div class="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
            ${product.sale
      ? `<div class="px-3 py-1" style="background: #dc2626; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);">SALE</div>`
      : ""
    }
            ${product.isNew
      ? `<div class="px-3 py-1" style="background: #16a34a; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(22, 163, 74, 0.4);">NEW</div>`
      : ""
    }
            ${!product.inStock
      ? `<div class="px-3 py-1" style="background: #6b7280; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(107, 114, 128, 0.4);">OUT OF STOCK</div>`
      : ""
    }
          </div>
          
          <button onclick="openGallery('${product.id
    }')" class="aspect-square relative w-full cursor-pointer group overflow-hidden" style="background: ${config.background_color
    };">
            <img src="${product.images[0]}" alt="${product.name
    }" class="w-full h-full object-cover" onerror="this.style.display='none';">
            ${!product.inStock
      ? `<div class="absolute inset-0" style="background: rgba(0,0,0,0.5);"></div>`
      : ""
    }
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style="background: rgba(0,0,0,0.4);">
              <span style="color: ${config.text_color}; font-size: ${config.font_size
    }px; font-weight: 300; letter-spacing: 2px;">VIEW</span>
            </div>
          </button>
          
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-grow">
                <h3 class="font-heading" style="font-size: ${config.font_size * 1.125
    }px; color: ${config.text_color
    }; font-weight: 400; line-height: 1.4; ${!product.inStock ? "opacity: 0.5;" : ""
    }">
                  ${product.name}
                </h3>
                <span class="inline-block mt-2 capitalize" style="font-size: ${config.font_size * 0.75
    }px; color: ${config.text_color
    }; opacity: 0.5; font-weight: 300; letter-spacing: 1px;">
                  ${product.theme.replace("-", " ")}
                </span>
                ${variantText
      ? `<p style="font-size: ${config.font_size * 0.75
      }px; color: ${config.text_color
      }; opacity: 0.6; font-weight: 300; margin-top: 6px; letter-spacing: 0.5px;">
                  ${variantText}
                </p>`
      : ""
    }
              </div>
              
              <button onclick="removeFromWishlist('${entry.key}')" class="transition-opacity hover:opacity-70">
                <svg class="w-5 h-5" fill="${config.primary_action_color}" stroke="${config.primary_action_color}" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center justify-between mt-4 pt-4" style="border-top: 1px solid rgba(212, 175, 55, 0.1);">
              <div>
                <span class="font-heading" style="font-size: ${config.font_size * 1.25
    }px; color: ${config.primary_action_color}; font-weight: 400; ${!product.inStock ? "opacity: 0.5;" : ""
    }">
                  ₹${product.price}
                </span>
                ${product.sale
      ? `<span style="font-size: ${config.font_size * 0.875
      }px; color: ${config.text_color
      }; opacity: 0.4; text-decoration: line-through; margin-left: 8px;">₹${product.originalPrice
      }</span>`
      : ""
    }
              </div>
              
              <div class="flex flex-col gap-2">
                <button onclick="addToCartFromWishlist('${entry.key}')" ${!product.inStock ? "disabled" : ""
    } class="btn-primary px-6 py-2 transition-opacity ${product.inStock ? "hover:opacity-80" : ""
    }" style="background: ${product.inStock ? config.primary_action_color : "#9ca3af"
    }; color: ${config.background_color}; font-size: ${config.font_size * 0.875
    }px; font-weight: 400; letter-spacing: 1px; cursor: ${product.inStock ? "pointer" : "not-allowed"
    }; opacity: ${product.inStock ? "1" : "0.6"};">
                  ${product.inStock ? "ADD" : "OUT"}
                </button>
                
                <button onclick="removeFromWishlist('${entry.key}')" class="px-4 py-1 transition-opacity hover:opacity-80" style="border: 1px solid #ff0000; color: #ff0000; font-size: ${config.font_size * 0.75}px; font-weight: 400; letter-spacing: 1px; background: transparent;">
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
        })
        .join("")}
              </div>
            `
    }
          </div>
        </div>
      `;
}

function renderCart() {
  const cartEntries = getCartEntries();
  const subtotal = cartEntries.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return `
        <div class="py-20" style="background: ${config.background_color
    }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <h2 class="font-heading mb-12" style="font-size: ${config.font_size * 2
    }px; color: ${config.text_color
    }; font-weight: 300; letter-spacing: 3px;">
              Cart
            </h2>
            
            ${cartEntries.length === 0
      ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${config.text_color
      }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  Your cart is empty
                </p>
                <button onclick="navigate('home')" class="btn-primary px-8 py-3" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size * 0.875
      }px; font-weight: 400; letter-spacing: 2px;">
                  START SHOPPING
                </button>
              </div>
            `
      : `
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-4">
                  ${cartEntries
        .map((item) => {
          const product = item.product;
          const quantity = item.quantity || 0;
          const variantText = getVariantDisplayText(product, item.variant);
          return `
                      <div class="flex gap-6 p-6 fade-in" style="background: ${config.surface_color
            }; border: 1px solid rgba(212, 175, 55, 0.1);">
                        <div class="w-24 h-24 flex-shrink-0 overflow-hidden" style="background: ${config.background_color
            };">
                          <img src="${product.images[0]}" alt="${product.name
            }" class="w-full h-full object-cover" onerror="this.style.display='none';">
                        </div>
                        
                        <div class="flex-grow">
                          <h3 class="font-heading mb-1" style="font-size: ${config.font_size * 1.125
            }px; color: ${config.text_color}; font-weight: 400;">
                            ${product.name}
                          </h3>
                          <p style="font-size: ${config.font_size * 0.875
            }px; color: ${config.text_color
            }; opacity: 0.5; font-weight: 300;">
                            ${product.category}
                          </p>
                          ${variantText
            ? `<p style="font-size: ${config.font_size * 0.75
            }px; color: ${config.text_color
            }; opacity: 0.6; font-weight: 300; margin-top: 4px;">
                            ${variantText}
                          </p>`
            : ""
          }
                          
                          <div class="flex items-center gap-6 mt-4">
                            <div class="flex items-center gap-3">
                              <button onclick="decrementCartItem('${item.key
            }')" class="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color
            }; font-weight: 300;">
                                −
                              </button>
                              <span style="font-size: ${config.font_size
            }px; color: ${config.text_color
            }; font-weight: 400; width: 2rem; text-align: center;">
                                ${quantity}
                              </span>
                              <button onclick="incrementCartItem('${item.key
            }')" class="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color
            }; font-weight: 300;">
                                +
                              </button>
                            </div>
                            
                            <div class="flex items-center gap-2 ml-4">
                              <button onclick="moveToWishlist('${item.key
            }')" class="px-3 py-1 text-xs transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color
            }; font-weight: 300; border-radius: 4px;">
                                ♡ Wishlist
                              </button>
                              <button onclick="removeCartItem('${item.key
            }')" class="px-3 py-1 text-xs transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: #ff0000; font-weight: 300; border-radius: 4px;">
                                ✕ Remove
                              </button>
                            </div>
                            
                            <span class="font-heading ml-auto" style="font-size: ${config.font_size * 1.125
            }px; color: ${config.primary_action_color
            }; font-weight: 400;">
                              ₹${(product.price * quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    `;
        })
        .join("")}
                </div>
                
                <div class="lg:col-span-1">
                  <div class="p-8 sticky top-24 fade-in" style="background: ${config.surface_color
      }; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <h3 class="font-heading mb-8" style="font-size: ${config.font_size * 1.5
      }px; color: ${config.text_color
      }; font-weight: 300; letter-spacing: 2px;">
                      Summary
                    </h3>
                    
                    <div class="space-y-4 mb-8">
                      <div class="flex justify-between" style="font-size: ${config.font_size
      }px; color: ${config.text_color}; font-weight: 300;">
                        <span>Subtotal</span>
                        <span style="color: ${config.primary_action_color
      };">₹${subtotal.toFixed(2)}</span>
                      </div>
                      <div class="flex justify-between" style="font-size: ${config.font_size * 0.875
      }px; color: ${config.text_color
      }; opacity: 0.5; font-weight: 300;">
                        <span>Shipping</span>
                        <span>At checkout</span>
                      </div>
                      <div class="divider my-4"></div>
                      <div class="flex justify-between font-heading" style="font-size: ${config.font_size * 1.25
      }px; color: ${config.primary_action_color
      }; font-weight: 400;">
                        <span>Total</span>
                        <span>₹${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button onclick="navigate('checkout')" class="btn-primary w-full py-4 mb-4" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size
      }px; font-weight: 400; letter-spacing: 2px;">
                      CHECKOUT
                    </button>
                    
                    <button onclick="navigate('home')" class="w-full py-3 transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color
      }; font-size: ${config.font_size * 0.875
      }px; font-weight: 300; letter-spacing: 1px;">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            `
    }
          </div>
        </div>
      `;
}

function renderCheckout() {
  const cartEntries = getCartEntries();
  
  if (cartEntries.length === 0) {
    navigate('cart');
    return '';
  }
  
  const subtotal = cartEntries.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 50; // Fixed shipping for demo
  const total = subtotal + shipping;

  return `
        <div class="py-20" style="background: ${config.background_color}; min-height: 100%;">
          <div class="max-w-6xl mx-auto px-6">
            <h2 class="font-heading mb-12" style="font-size: ${config.font_size * 2}px; color: ${config.text_color}; font-weight: 300; letter-spacing: 3px;">
              Checkout
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <!-- Order Summary -->
              <div class="order-2 lg:order-1">
                <div class="p-8 fade-in" style="background: ${config.surface_color}; border: 1px solid rgba(212, 175, 55, 0.1);">
                  <h3 class="font-heading mb-6" style="font-size: ${config.font_size * 1.25}px; color: ${config.text_color}; font-weight: 400;">
                    Order Summary
                  </h3>
                  
                  <div class="space-y-4 mb-6">
                    ${cartEntries.map((item) => {
                      const product = item.product;
                      const quantity = item.quantity || 0;
                      const variantText = getVariantDisplayText(product, item.variant);
                      return `
                        <div class="flex items-center gap-4">
                          <div class="w-16 h-16 flex-shrink-0 overflow-hidden" style="background: ${config.background_color};">
                            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.style.display='none';">
                          </div>
                          <div class="flex-grow">
                            <h4 style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 400;">${product.name}</h4>
                            ${variantText
            ? `<p style="font-size: ${config.font_size * 0.75}px; color: ${config.text_color}; opacity: 0.6; margin-top: 4px;">${variantText}</p>`
            : ""
          }
                            <p style="font-size: ${config.font_size * 0.75}px; color: ${config.text_color}; opacity: 0.5;">Qty: ${quantity}</p>
                          </div>
                          <span style="font-size: ${config.font_size * 0.875}px; color: ${config.primary_action_color}; font-weight: 400;">₹${(product.price * quantity).toFixed(2)}</span>
                        </div>
                      `;
                    }).join("")}
                  </div>
                  
                  <div class="divider my-4"></div>
                  
                  <div class="space-y-2">
                    <div class="flex justify-between" style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; opacity: 0.7;">
                      <span>Subtotal</span>
                      <span>₹${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between" style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; opacity: 0.7;">
                      <span>Shipping</span>
                      <span>₹${shipping.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between font-heading" style="font-size: ${config.font_size * 1.125}px; color: ${config.primary_action_color}; font-weight: 400;">
                      <span>Total</span>
                      <span>₹${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Checkout Form -->
              <div class="order-1 lg:order-2">
                <form id="checkoutForm" class="space-y-8">
                  <!-- Customer Details -->
                  <div class="p-8 fade-in" style="background: ${config.surface_color}; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <h3 class="font-heading mb-6" style="font-size: ${config.font_size * 1.25}px; color: ${config.text_color}; font-weight: 400;">
                      Customer Details
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">First Name</label>
                        <input type="text" name="firstName" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                      </div>
                      <div>
                        <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Last Name</label>
                        <input type="text" name="lastName" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                      </div>
                    </div>
                    
                    <div class="mt-4">
                      <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Email</label>
                      <input type="email" name="email" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                    </div>
                    
                    <div class="mt-4">
                      <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Phone</label>
                      <input type="tel" name="phone" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                    </div>
                  </div>
                  
                  <!-- Shipping Address -->
                  <div class="p-8 fade-in" style="background: ${config.surface_color}; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <h3 class="font-heading mb-6" style="font-size: ${config.font_size * 1.25}px; color: ${config.text_color}; font-weight: 400;">
                      Shipping Address
                    </h3>
                    
                    <div class="space-y-4">
                      <div>
                        <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Address Line 1</label>
                        <input type="text" name="address1" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                      </div>
                      
                      <div>
                        <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Address Line 2 (Optional)</label>
                        <input type="text" name="address2" class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                      </div>
                      
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">City</label>
                          <input type="text" name="city" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                        </div>
                        <div>
                          <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">State</label>
                          <input type="text" name="state" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                        </div>
                        <div>
                          <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">PIN Code</label>
                          <input type="text" name="pincode" required class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Payment Method -->
                  <div class="p-8 fade-in" style="background: ${config.surface_color}; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <h3 class="font-heading mb-6" style="font-size: ${config.font_size * 1.25}px; color: ${config.text_color}; font-weight: 400;">
                      Payment Method
                    </h3>
                    
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input type="radio" id="card" name="paymentMethod" value="card" checked class="mr-3">
                        <label for="card" style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; cursor: pointer;">Credit/Debit Card</label>
                      </div>
                      
                      <div id="cardDetails" class="ml-6 space-y-4">
                        <div>
                          <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Card Number</label>
                          <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">Expiry Date</label>
                            <input type="text" name="expiry" placeholder="MM/YY" class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                          </div>
                          <div>
                            <label style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; display: block; margin-bottom: 4px;">CVV</label>
                            <input type="text" name="cvv" placeholder="123" class="w-full px-4 py-3" style="background: ${config.background_color}; border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color}; font-size: ${config.font_size * 0.875}px; border-radius: 4px;">
                          </div>
                        </div>
                      </div>
                      
                      <div class="flex items-center">
                        <input type="radio" id="paypal" name="paymentMethod" value="paypal" class="mr-3">
                        <label for="paypal" style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; cursor: pointer;">PayPal</label>
                      </div>
                      
                      <div class="flex items-center">
                        <input type="radio" id="cod" name="paymentMethod" value="cod" class="mr-3">
                        <label for="cod" style="font-size: ${config.font_size * 0.875}px; color: ${config.text_color}; font-weight: 300; cursor: pointer;">Cash on Delivery</label>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Place Order Button -->
                  <button type="submit" class="btn-primary w-full py-4" style="background: ${config.primary_action_color}; color: ${config.background_color}; font-size: ${config.font_size}px; font-weight: 400; letter-spacing: 2px;">
                    PLACE ORDER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      `;
}

function renderCategoryPage(category) {
  const categoryProducts = products[category];
  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);
  const filteredProducts = sortAndFilterProducts(
    categoryProducts,
    category
  );
  const themes = ["Cute", "Trendy", "Beachy", "Minimalist", "Fandom", "Combo"];

  const currentSort = sortByPerCategory[category] || "default";
  const currentFilter = filterThemePerCategory[category] || "all";
  const filtersVisible = filtersVisiblePerCategory[category] || false;

  return `
        <div class="py-20" style="background: ${config.background_color
    }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center justify-between mb-12">
              <h2 class="font-heading capitalize" style="font-size: ${config.font_size * 2
    }px; color: ${config.text_color
    }; font-weight: 300; letter-spacing: 3px;">
                ${categoryName}
              </h2>
              
              <button onclick="toggleFilters('${category}')" class="flex items-center gap-2 px-6 py-2 transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${config.text_color
    }; font-size: ${config.font_size * 0.875
    }px; font-weight: 300; letter-spacing: 1px;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                FILTER
              </button>
            </div>
            
            ${filtersVisible
      ? `
              <div class="mb-12 p-8 fade-in" style="background: ${config.surface_color
      }; border: 1px solid rgba(212, 175, 55, 0.1);">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 class="mb-6" style="font-size: ${config.font_size
      }px; color: ${config.primary_action_color
      }; font-weight: 400; letter-spacing: 2px;">
                      Sort
                    </h3>
                    <div class="space-y-2">
                      ${[
        ["default", "Default"],
        ["price-low", "Price: Low to High"],
        ["price-high", "Price: High to Low"],
        ["name-az", "Name: A to Z"],
        ["name-za", "Name: Z to A"],
        ["newest", "Newest"],
      ]
        .map(
          ([value, label]) => `
                        <button onclick="setSortBy('${category}', '${value}')" class="w-full text-left px-4 py-3 transition-opacity hover:opacity-70" style="background: ${currentSort === value
              ? config.primary_action_color + "20"
              : "transparent"
            }; border: 1px solid ${currentSort === value
              ? config.primary_action_color
              : "transparent"
            }; color: ${config.text_color}; font-size: ${config.font_size * 0.875
            }px; font-weight: 300;">
                          ${label}
                        </button>
                      `
        )
        .join("")}
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="mb-6" style="font-size: ${config.font_size
      }px; color: ${config.primary_action_color
      }; font-weight: 400; letter-spacing: 2px;">
                      Theme
                    </h3>
                    <div class="space-y-2">
                      <button onclick="setFilterTheme('${category}', 'all')" class="w-full text-left px-4 py-3 transition-opacity hover:opacity-70" style="background: ${currentFilter === "all"
        ? config.primary_action_color + "20"
        : "transparent"
      }; border: 1px solid ${currentFilter === "all"
        ? config.primary_action_color
        : "transparent"
      }; color: ${config.text_color}; font-size: ${config.font_size * 0.875
      }px; font-weight: 300;">
                        All
                      </button>
                      ${themes
        .map(
          (theme) => `
                        <button onclick="setFilterTheme('${category}', '${theme}')" class="w-full text-left px-4 py-3 capitalize transition-opacity hover:opacity-70" style="background: ${currentFilter === theme
              ? config.primary_action_color + "20"
              : "transparent"
            }; border: 1px solid ${currentFilter === theme
              ? config.primary_action_color
              : "transparent"
            }; color: ${config.text_color}; font-size: ${config.font_size * 0.875
            }px; font-weight: 300;">
                          ${theme.replace("-", " ")}
                        </button>
                      `
        )
        .join("")}
                    </div>
                  </div>
                </div>
              </div>
            `
      : ""
    }
            
            ${filteredProducts.length === 0
      ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${config.text_color
      }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  No products found
                </p>
                <button onclick="setFilterTheme('${category}', 'all'); setSortBy('${category}', 'default')" class="btn-primary px-8 py-3" style="background: ${config.primary_action_color
      }; color: ${config.background_color}; font-size: ${config.font_size * 0.875
      }px; font-weight: 400; letter-spacing: 2px;">
                  CLEAR FILTERS
                </button>
              </div>
            `
      : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${filteredProducts
        .map((product) => renderProductCard(product))
        .join("")}
              </div>
            `
    }
          </div>
        </div>
      `;
}

function renderGalleryModal() {
  if (!currentGalleryProduct) return "";
  const galleryVariant = selectedVariants[currentGalleryProduct.id];
  const isGalleryWishlisted =
    currentGalleryProduct.hasVariants && galleryVariant
      ? isVariantInWishlist(currentGalleryProduct.id, galleryVariant)
      : isProductInWishlist(currentGalleryProduct.id);

  return `
        <div class="modal-overlay" onclick="if(event.target === this) closeGallery()">
          <div class="modal-content relative" style="max-width: 1000px; width: 90%; margin: auto;">
            <button onclick="closeGallery()" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10 transition-opacity hover:opacity-70" style="background: ${config.surface_color
    }; border: 1px solid rgba(212, 175, 55, 0.3);">
              <svg class="w-5 h-5" fill="none" stroke="${config.text_color
    }" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div style="background: ${config.surface_color
    }; border: 1px solid rgba(212, 175, 55, 0.1);">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div>
                  <div class="relative mb-6 overflow-hidden" style="background: ${config.background_color
    }; height: 400px;">
                    <img id="gallery-image" src="${currentGalleryProduct.images[currentGalleryImage]}" alt="${currentGalleryProduct.name
    }" class="w-full h-full object-cover" onerror="this.style.display='none';">
                    ${!currentGalleryProduct.inStock
      ? `<div class="absolute inset-0" style="background: rgba(0,0,0,0.5);"></div>`
      : ""
    }
                    <div class="absolute bottom-0 left-0 right-0 p-3" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);">
                      <p id="gallery-label" class="font-heading" style="font-size: ${config.font_size * 0.875
    }px; color: #ffffff; font-weight: 300;"></p>
                    </div>
                  </div>
                  
                  <div class="flex gap-3">
                    ${currentGalleryProduct.images
      .map(
        (img, index) => `
                      <button onclick="currentGalleryImage = ${index}; updateGalleryImage();" class="flex-1 transition-opacity hover:opacity-70 overflow-hidden" style="background: ${config.background_color
          }; height: 80px; border: 1px solid ${currentGalleryImage === index
            ? config.primary_action_color
            : "rgba(212, 175, 55, 0.1)"
          };">
                        <img src="${currentGalleryProduct.images[index]}" alt="${currentGalleryProduct.name
          } thumbnail ${index + 1
          }" class="w-full h-full object-cover" onerror="this.style.display='none';">
                      </button>
                    `
      )
      .join("")}
                  </div>
                </div>
                
                <div class="flex flex-col">
                  <div class="flex-grow">
                    <div class="flex gap-2 mb-4">
                      ${currentGalleryProduct.sale
      ? `<div class="px-3 py-1" style="background: #dc2626; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px;">SALE</div>`
      : ""
    }
                      ${currentGalleryProduct.isNew
      ? `<div class="px-3 py-1" style="background: #16a34a; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px;">NEW</div>`
      : ""
    }
                      ${!currentGalleryProduct.inStock
      ? `<div class="px-3 py-1" style="background: #6b7280; color: #ffffff; font-size: ${config.font_size * 0.75
      }px; font-weight: 600; letter-spacing: 1px;">OUT OF STOCK</div>`
      : ""
    }
                    </div>
                    
                    <h3 class="font-heading mb-3" style="font-size: ${config.font_size * 1.75
    }px; color: ${config.text_color
    }; font-weight: 400; line-height: 1.3; ${!currentGalleryProduct.inStock ? "opacity: 0.6;" : ""
    }">
                      ${currentGalleryProduct.name}
                    </h3>
                    
                    <div class="mb-6">
                      <span class="inline-block px-3 py-1 mr-2" style="border: 1px solid rgba(212, 175, 55, 0.3); font-size: ${config.font_size * 0.75
    }px; color: ${config.text_color
    }; opacity: 0.7; font-weight: 300; letter-spacing: 1px;">
                        ${currentGalleryProduct.category}
                      </span>
                      <span class="inline-block px-3 py-1 capitalize" style="border: 1px solid rgba(212, 175, 55, 0.3); font-size: ${config.font_size * 0.75
    }px; color: ${config.text_color
    }; opacity: 0.7; font-weight: 300; letter-spacing: 1px;">
                        ${currentGalleryProduct.theme.replace("-", " ")}
                      </span>
                    </div>
                    
                    <div class="mb-8">
                      <div class="flex items-baseline gap-3">
                        ${(() => {
      let priceDisplay = '';

      if (currentGalleryProduct.hasVariants && selectedVariants[currentGalleryProduct.id]) {
        const selectedVariantValue = selectedVariants[currentGalleryProduct.id];
        let selectedVariantObj = null;

        if (currentGalleryProduct.multiVariantTypes) {
          // For multivariant products, find the variant that matches
          currentGalleryProduct.variantGroups.forEach(group => {
            if (group.variantType !== 'letter') {
              const matchValue = selectedVariantValue[group.variantType] || Object.values(selectedVariantValue)[0];
              const variant = group.variants.find(v => v.value === matchValue);
              if (variant && !selectedVariantObj) {
                selectedVariantObj = variant;
              }
            }
          });
        } else {
          // For single variant products, find by value
          selectedVariantObj = currentGalleryProduct.variants.find(v => v.value === selectedVariantValue);
        }

        if (selectedVariantObj) {
          // Check if variant has its own price property
          const variantPrice = selectedVariantObj.price !== undefined ? selectedVariantObj.price : currentGalleryProduct.price;
          const variantOriginalPrice = selectedVariantObj.originalPrice !== undefined ? selectedVariantObj.originalPrice : currentGalleryProduct.originalPrice;
          const variantSale = selectedVariantObj.sale !== undefined ? selectedVariantObj.sale : currentGalleryProduct.sale;
          
          priceDisplay = '<span class="font-heading" style="font-size: ' + (config.font_size * 2) + 'px; color: ' + config.primary_action_color + '; font-weight: 400; ' + (!currentGalleryProduct.inStock ? 'opacity: 0.6;' : '') + '">₹' + variantPrice + '</span>';
          if (variantSale && variantOriginalPrice) {
            priceDisplay += '<span style="font-size: ' + config.font_size + 'px; color: ' + config.text_color + '; opacity: 0.4; text-decoration: line-through; font-weight: 300; margin-left: 8px;">₹' + variantOriginalPrice + '</span>';
          }
        } else {
          priceDisplay = '<span class="font-heading" style="font-size: ' + (config.font_size * 2) + 'px; color: ' + config.primary_action_color + '; font-weight: 400; opacity: 0.5;">Select a variant to see price</span>';
        }
      } else if (currentGalleryProduct.hasVariants) {
        // Product has variants but none selected yet
        priceDisplay = '<span class="font-heading" style="font-size: ' + (config.font_size * 2) + 'px; color: ' + config.primary_action_color + '; font-weight: 400; opacity: 0.5;">Select a variant to see price</span>';
      } else {
        // No variants, use product price directly
        priceDisplay = '<span class="font-heading" style="font-size: ' + (config.font_size * 2) + 'px; color: ' + config.primary_action_color + '; font-weight: 400; ' + (!currentGalleryProduct.inStock ? 'opacity: 0.6;' : '') + '">₹' + (currentGalleryProduct.price || 0) + '</span>';
        if (currentGalleryProduct.sale && currentGalleryProduct.originalPrice) {
          priceDisplay += '<span style="font-size: ' + config.font_size + 'px; color: ' + config.text_color + '; opacity: 0.4; text-decoration: line-through; font-weight: 300; margin-left: 8px;">₹' + currentGalleryProduct.originalPrice + '</span>';
        }
      }

      return priceDisplay;
    })()
    }
                      </div>
                    </div>
                    
                    <div class="mb-8">
                      <p style="font-size: ${config.font_size * 0.875
    }px; color: ${config.text_color
    }; line-height: 1.8; font-weight: 300; opacity: 0.7;">
                        ${currentGalleryProduct.description ||
    "Handcrafted with attention to detail. Each piece is unique and made to order."
    }
                      </p>
                    </div>
                    
                    ${currentGalleryProduct.hasVariants &&
      currentGalleryProduct.inStock
      ? `
                      <div class="mb-8 p-4" style="border: 1px solid rgba(212, 175, 55, 0.1); background: ${config.background_color
      };">
                        ${currentGalleryProduct.multiVariantTypes
        ? currentGalleryProduct.variantGroups
          .map(
            (group) => `
                            <div style="margin-bottom: 16px;">
                              <p style="font-size: ${config.font_size * 0.875
              }px; color: ${config.text_color
              }; opacity: 0.6; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                                Select ${group.variantType}
                              </p>
                              ${group.variantType === "letter"
                ? `
                                <div class="grid grid-cols-9 gap-2">
                                  ${group.variants
                  .map(
                    (variant) => `
                                    <button 
                                      onclick="selectVariantMulti('${currentGalleryProduct.id
                      }', '${group.variantType}', '${variant.value}')" 
                                      ${!variant.inStock ? "disabled" : ""}
                                      class="aspect-square flex items-center justify-center transition-opacity ${variant.inStock ? "hover:opacity-70" : ""
                      }"
                                      style="
                                        border: 1px solid ${selectedVariants[
                        currentGalleryProduct.id
                      ] && selectedVariants[
                      currentGalleryProduct.id
                      ][group.variantType] === variant.value
                        ? config.primary_action_color
                        : "rgba(212, 175, 55, 0.2)"
                      };
                                        background: ${selectedVariants[
                        currentGalleryProduct.id
                      ] && selectedVariants[
                      currentGalleryProduct.id
                      ][group.variantType] === variant.value
                        ? config.primary_action_color + "20"
                        : "transparent"
                      };
                                        color: ${variant.inStock
                        ? config.text_color
                        : config.text_color
                      };
                                        opacity: ${variant.inStock ? "1" : "0.3"};
                                        font-size: ${config.font_size * 0.875}px;
                                        font-weight: 400;
                                        cursor: ${variant.inStock ? "pointer" : "not-allowed"
                      };
                                      "
                                    >
                                      ${variant.value}
                                    </button>
                                  `
                  )
                  .join("")}
                                </div>
                              `
                : ""
              }
                              ${group.variantType === "color"
                ? `
                                <div class="grid grid-cols-2 gap-3">
                                  ${group.variants
                  .map(
                    (variant) => `
                                    <button 
                                      onclick="selectVariantMulti('${currentGalleryProduct.id
                      }', '${group.variantType}', '${variant.value}')" 
                                      ${!variant.inStock ? "disabled" : ""}
                                      class="flex items-center gap-3 px-3 py-3 transition-opacity ${variant.inStock ? "hover:opacity-70" : ""
                      }"
                                      style="
                                        border: 1px solid ${selectedVariants[
                        currentGalleryProduct.id
                      ] && selectedVariants[
                      currentGalleryProduct.id
                      ][group.variantType] === variant.value
                        ? config.primary_action_color
                        : "rgba(212, 175, 55, 0.2)"
                      };
                                        background: ${selectedVariants[
                        currentGalleryProduct.id
                      ] && selectedVariants[
                      currentGalleryProduct.id
                      ][group.variantType] === variant.value
                        ? config.primary_action_color + "20"
                        : "transparent"
                      };
                                        opacity: ${variant.inStock ? "1" : "0.4"};
                                        cursor: ${variant.inStock ? "pointer" : "not-allowed"
                      };
                                      "
                                    >
                                      <div style="width: 20px; height: 20px; border-radius: 50%; background: ${variant.color
                      }; border: 1px solid rgba(255,255,255,0.2);"></div>
                                      <span style="font-size: ${config.font_size * 0.875
                      }px; color: ${config.text_color};">${variant.value
                      }</span>
                                    </button>
                                  `
                  )
                  .join("")}
                                </div>
                              `
                : ""
              }
                            </div>
                          `
          )
          .join("")
        : `
                            <p style="font-size: ${config.font_size * 0.875
        }px; color: ${config.text_color
        }; opacity: 0.6; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                              Select ${currentGalleryProduct.variantType}
                            </p>
                            ${currentGalleryProduct.variantType === "letter"
          ? `
                              <div class="grid grid-cols-9 gap-2">
                                ${currentGalleryProduct.variants
            .map(
              (variant) => `
                                  <button 
                                    onclick="selectVariant('${currentGalleryProduct.id
                }', '${variant.value}')" 
                                    ${!variant.inStock ? "disabled" : ""}
                                    class="aspect-square flex items-center justify-center transition-opacity ${variant.inStock ? "hover:opacity-70" : ""
                }"
                                    style="
                                      border: 1px solid ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color
                  : "rgba(212, 175, 55, 0.2)"
                };
                                      background: ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color + "20"
                  : "transparent"
                };
                                      color: ${variant.inStock
                  ? config.text_color
                  : config.text_color
                };
                                      opacity: ${variant.inStock ? "1" : "0.3"};
                                      font-size: ${config.font_size * 0.875}px;
                                      font-weight: 400;
                                      cursor: ${variant.inStock ? "pointer" : "not-allowed"
                };
                                    "
                                  >
                                    ${variant.value}
                                  </button>
                                `
            )
            .join("")}
                              </div>
                            `
          : ""
        }
                            ${currentGalleryProduct.variantType === "color"
          ? `
                              <div class="grid grid-cols-2 gap-3">
                                ${currentGalleryProduct.variants
            .map(
              (variant) => `
                                  <button 
                                    onclick="selectVariant('${currentGalleryProduct.id
                }', '${variant.value}')" 
                                    ${!variant.inStock ? "disabled" : ""}
                                    class="flex items-center gap-3 px-3 py-3 transition-opacity ${variant.inStock ? "hover:opacity-70" : ""
                }"
                                    style="
                                      border: 1px solid ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color
                  : "rgba(212, 175, 55, 0.2)"
                };
                                      background: ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color + "20"
                  : "transparent"
                };
                                      opacity: ${variant.inStock ? "1" : "0.4"};
                                      cursor: ${variant.inStock ? "pointer" : "not-allowed"
                };
                                    "
                                  >
                                    <div style="width: 20px; height: 20px; border-radius: 50%; background: ${variant.color
                }; border: 1px solid rgba(255,255,255,0.2);"></div>
                                    <span style="font-size: ${config.font_size * 0.875
                }px; color: ${config.text_color};">${variant.value
                }</span>
                                  </button>
                                `
            )
            .join("")}
                              </div>
                            `
          : ""
        }
                            ${currentGalleryProduct.variantType === "lipbalm"
          ? `
                              <div class="grid grid-cols-2 gap-3">
                                ${currentGalleryProduct.variants
            .map(
              (variant) => `
                                  <button 
                                    onclick="selectVariant('${currentGalleryProduct.id
                }', '${variant.value}')" 
                                    ${!variant.inStock ? "disabled" : ""}
                                    class="px-3 py-3 text-left transition-opacity ${variant.inStock ? "hover:opacity-70" : ""
                }"
                                    style="
                                      border: 1px solid ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color
                  : "rgba(212, 175, 55, 0.2)"
                };
                                      background: ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color + "20"
                  : "transparent"
                };
                                      opacity: ${variant.inStock ? "1" : "0.4"};
                                      cursor: ${variant.inStock ? "pointer" : "not-allowed"
                };
                                      color: ${config.text_color};
                                      font-size: ${config.font_size * 0.875}px;
                                    "
                                  >
                                    ${variant.value}
                                  </button>
                                `
            )
            .join("")}
                              </div>
                            `
          : ""
        }
                            ${currentGalleryProduct.variantType === "fruit"
          ? `
                              <div class="grid grid-cols-2 gap-3">
                                ${currentGalleryProduct.variants
            .map(
              (variant) => `
                                  <button 
                                    onclick="selectVariant('${currentGalleryProduct.id
                }', '${variant.value}')" 
                                    ${!variant.inStock ? "disabled" : ""}
                                    class="px-3 py-3 text-left transition-opacity ${variant.inStock ? "hover:opacity-70" : ""
                }"
                                    style="
                                      border: 1px solid ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color
                  : "rgba(212, 175, 55, 0.2)"
                };
                                      background: ${selectedVariants[
                  currentGalleryProduct.id
                ] === variant.value
                  ? config.primary_action_color + "20"
                  : "transparent"
                };
                                      opacity: ${variant.inStock ? "1" : "0.4"};
                                      cursor: ${variant.inStock ? "pointer" : "not-allowed"
                };
                                      color: ${config.text_color};
                                      font-size: ${config.font_size * 0.875}px;
                                    "
                                  >
                                    ${variant.value}
                                  </button>
                                `
            )
            .join("")}
                              </div>
                            `
          : ""
        }
                          `
      }
                      </div>
                    `
      : ""
    }
                  </div>
                  
                  <div class="flex gap-4 mt-8">
                    <button onclick="addToCart('${currentGalleryProduct.id
    }')" ${!currentGalleryProduct.inStock ? "disabled" : ""
    } class="btn-primary flex-1 py-4 ${currentGalleryProduct.inStock ? "" : "opacity-50"
    }" style="background: ${currentGalleryProduct.inStock
      ? config.primary_action_color
      : "#9ca3af"
    }; color: ${config.background_color}; font-size: ${config.font_size
    }px; font-weight: 400; letter-spacing: 2px; cursor: ${currentGalleryProduct.inStock ? "pointer" : "not-allowed"
    };">
                      ${currentGalleryProduct.inStock
      ? "ADD TO CART"
      : "OUT OF STOCK"
    }
                    </button>
                    
                    <button onclick="toggleWishlist('${currentGalleryProduct.id
    }')" class="p-4 transition-opacity hover:opacity-70" style="border: 1px solid ${isGalleryWishlisted
      ? config.primary_action_color
      : "rgba(212, 175, 55, 0.3)"
    };">
                      <svg class="w-6 h-6" fill="${isGalleryWishlisted
      ? config.primary_action_color
      : "none"
    }" stroke="${isGalleryWishlisted
      ? config.primary_action_color
      : config.text_color
    }" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
}

function updateUI() {
  const app = document.getElementById("app");
  syncThemeUI();
  app.style.background = config.background_color;
  app.style.fontFamily = `${config.font_family}, sans-serif`;
  app.style.color = config.text_color;

  let content = renderHeader();

  if (currentView === "home") {
    content += renderHome();
  } else if (currentView === "sale") {
    content += renderSale();
  } else if (currentView === "wishlist") {
    content += renderWishlist();
  } else if (currentView === "cart") {
    content += renderCart();
  } else if (currentView === "checkout") {
    content += renderCheckout();
  } else if (products[currentView]) {
    content += renderCategoryPage(currentView);
  }

  if (galleryOpen && currentGalleryProduct) {
    content += renderGalleryModal();
  }

  app.innerHTML = content;
  
  // Attach event listeners for dynamic content
  if (currentView === 'checkout') {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    
    // Handle payment method changes
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(radio => {
      radio.addEventListener('change', function() {
        const cardDetails = document.getElementById('cardDetails');
        if (this.value === 'card') {
          cardDetails.style.display = 'block';
        } else {
          cardDetails.style.display = 'none';
        }
      });
    });
  }
}

async function onConfigChange(newConfig) {
  config = { ...config, ...newConfig };
  applyThemeToConfig();
  updateUI();
}

async function init() {
  if (!window.dataSdk) {
    console.warn("dataSdk not found — running in local mode");
    updateUI();
    return;
  }

  const initResult = await window.dataSdk.init(dataHandler);
  if (!initResult.isOk) {
    console.error("Failed to initialize data SDK");
    return;
  }

  updateUI();
}

/* ==================== RESPONSIVE FUNCTIONALITY ==================== */

// Handle window resize for responsive behavior
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    updateUI();
  }, 250); // Debounce resize events
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
  setTimeout(function() {
    updateUI();
  }, 100);
});

// Handle touch events for better mobile experience
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  // Swipe left - next page/section
  if (diff > swipeThreshold) {
    // Can be used for pagination if needed
  }
  // Swipe right - previous page/section
  else if (diff < -swipeThreshold) {
    // Can be used for pagination if needed
  }
}

// Add media query listener for viewport changes
if (window.matchMedia) {
  // Mobile (max-width: 640px)
  const mobileQuery = window.matchMedia('(max-width: 640px)');
  mobileQuery.addListener(function(e) {
    if (e.matches) {
      console.log('Mobile viewport activated');
    }
  });

  // Tablet (641px to 1024px)
  const tabletQuery = window.matchMedia('(min-width: 641px) and (max-width: 1024px)');
  tabletQuery.addListener(function(e) {
    if (e.matches) {
      console.log('Tablet viewport activated');
    }
  });

  // Desktop (1025px and above)
  const desktopQuery = window.matchMedia('(min-width: 1025px)');
  desktopQuery.addListener(function(e) {
    if (e.matches) {
      console.log('Desktop viewport activated');
    }
  });
}

// Improve touch scrolling performance
const scrollableElements = document.querySelectorAll('.overflow-x-auto, .carousel-container');
scrollableElements.forEach(element => {
  element.style.webkitOverflowScrolling = 'touch';
});

// Handle viewport meta tag for proper scaling
function setupViewport() {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    // Already set in HTML meta tag
  }
}

// Prevent zoom on double-tap for input fields
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName.toLowerCase() === 'input') {
    event.target.addEventListener('touchend', function(e) {
      e.preventDefault();
    }, { passive: false });
  }
});

// Add support for responsive font sizes
function adjustFontSizes() {
  const width = window.innerWidth;
  const root = document.documentElement;
  
  if (width <= 480) {
    root.style.fontSize = '12px';
  } else if (width <= 640) {
    root.style.fontSize = '14px';
  } else if (width <= 1024) {
    root.style.fontSize = '15px';
  } else {
    root.style.fontSize = '16px';
  }
}

adjustFontSizes();
window.addEventListener('resize', adjustFontSizes);

// Optimize images for different screen sizes
function optimizeImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
  });
}

// Call after each update
const originalUpdateUI = updateUI;
window.updateUI = function() {
  originalUpdateUI.call(this);
  optimizeImages();
};

// Initialize viewport setup
setupViewport();

initTheme();
init();
