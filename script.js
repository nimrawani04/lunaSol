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
        hero_title: "Discover Unique Handmade Jewelry",
        hero_subtitle: "Each piece tells a story",
        cta_button: "Shop Collection",
      };

      let config = { ...defaultConfig };
      let wishlistItems = new Set();
      let cartItems = new Map();
      let currentView = "home";
      let galleryOpen = false;
      let currentGalleryProduct = null;
      let currentGalleryImage = 0;
      let sortByPerCategory = {};
      let filterThemePerCategory = {};
      let filtersVisiblePerCategory = {};
      let selectedVariants = {}; // Tracks selected variant for each product

      const products = {
        keychains: [
          {
            id: "keychain1",
            name: "Ocean Breeze",
            price: 12,
            category: "Keychains",
            theme: "beachy",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "A refreshing keychain inspired by ocean waves. Features blue and white beaded design with a starfish charm.",
          },
          {
            id: "keychain2",
            name: "Boho Dreams",
            price: 15,
            category: "Keychains",
            theme: "boho",
            sale: true,
            originalPrice: 20,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Bohemian-style keychain with feather details and earth-toned beads. Perfect for free spirits.",
          },
          {
            id: "keychain3",
            name: "Star Power",
            price: 14,
            category: "Keychains",
            theme: "pop-culture",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Show your pop culture love with this star-themed keychain. Metallic finish with glitter accents.",
          },
          {
            id: "keychain4",
            name: "Anime Spirit",
            price: 13,
            category: "Keychains",
            theme: "anime",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Anime-inspired charm keychain with kawaii elements. Colorful acrylic design.",
          },
        ],
        necklaces: [
          {
            id: "necklace1",
            name: "Letter Pendant",
            price: 35,
            category: "Necklaces",
            theme: "beachy",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Personalize your style with this elegant letter pendant necklace. Gold-plated charm on delicate chain. Perfect for gifting or treating yourself.",
            hasVariants: true,
            variantType: "letter",
            variants: [
              { value: "A", inStock: true },
              { value: "B", inStock: true },
              { value: "C", inStock: false },
              { value: "D", inStock: true },
              { value: "E", inStock: true },
              { value: "F", inStock: true },
              { value: "G", inStock: false },
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
              { value: "S", inStock: true },
              { value: "T", inStock: true },
              { value: "U", inStock: true },
              { value: "V", inStock: true },
              { value: "W", inStock: true },
              { value: "X", inStock: false },
              { value: "Y", inStock: true },
              { value: "Z", inStock: true },
            ],
          },
          {
            id: "necklace2",
            name: "Moon Goddess",
            price: 40,
            category: "Necklaces",
            theme: "boho",
            sale: true,
            originalPrice: 55,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Celestial-inspired necklace featuring a crescent moon pendant with intricate detailing. Perfect for moon lovers and mystic souls.",
          },
          {
            id: "necklace3",
            name: "Kawaii Heart",
            price: 38,
            category: "Necklaces",
            theme: "cartoon",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Adorable heart-shaped pendant with cute cartoon styling. Pastel colors and glossy finish make it irresistibly sweet.",
          },
          {
            id: "necklace4",
            name: "Cherry Blossom",
            price: 42,
            category: "Necklaces",
            theme: "anime",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Delicate cherry blossom design inspired by Japanese anime. Pink enamel petals with golden branches.",
          },
        ],
        earrings: [
          {
            id: "earring1",
            name: "Tropical Vibes",
            price: 25,
            category: "Earrings",
            theme: "beachy",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Bring the beach wherever you go with these tropical earrings. Featuring palm leaf designs and turquoise accents.",
          },
          {
            id: "earring2",
            name: "Feather Dance",
            price: 28,
            category: "Earrings",
            theme: "boho",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Long, flowing feather earrings with beaded details. Perfect for festival season and bohemian looks.",
          },
          {
            id: "earring3",
            name: "Music Notes",
            price: 22,
            category: "Earrings",
            theme: "pop-culture",
            sale: true,
            originalPrice: 30,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "For music lovers! Dangling treble clef and music note charms. Show your passion for melodies.",
          },
          {
            id: "earring4",
            name: "Rainbow Pop",
            price: 26,
            category: "Earrings",
            theme: "cartoon",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Colorful rainbow stud earrings with glossy enamel finish. Spread joy and positivity with every wear.",
          },
        ],
        rings: [
          {
            id: "ring1",
            name: "Pearl Band",
            price: 32,
            category: "Rings",
            theme: "beachy",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Elegant freshwater pearl set on a gold band. Timeless design that complements any outfit.",
          },
          {
            id: "ring2",
            name: "Moon Phase",
            price: 38,
            category: "Rings",
            theme: "boho",
            sale: true,
            originalPrice: 45,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Mystical moon phase ring with oxidized silver finish. Connect with lunar energy and celestial beauty.",
          },
          {
            id: "ring3",
            name: "Gamer Ring",
            price: 30,
            category: "Rings",
            theme: "pop-culture",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Level up your style with this pixel heart ring. Perfect for gamers and retro enthusiasts.",
          },
          {
            id: "ring4",
            name: "Sakura Ring",
            price: 35,
            category: "Rings",
            theme: "anime",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Delicate sakura blossom ring with pink stone center. Inspired by Japanese cherry blossom season.",
          },
        ],
        bracelets: [
          {
            id: "bracelet1",
            name: "Gemstone Bracelet",
            price: 20,
            category: "Bracelets",
            theme: "beachy",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Beautiful beaded bracelet featuring natural gemstones. Available in multiple colors to match your energy and style.",
            hasVariants: true,
            variantType: "color",
            variants: [
              { value: "Rose Pink", color: "#FFB6C1", inStock: true },
              { value: "Ocean Blue", color: "#4682B4", inStock: true },
              { value: "Emerald Green", color: "#50C878", inStock: false },
              { value: "Amber Gold", color: "#FFBF00", inStock: true },
              { value: "Amethyst Purple", color: "#9966CC", inStock: true },
              { value: "Ruby Red", color: "#E0115F", inStock: false },
              { value: "Pearl White", color: "#F0EAD6", inStock: true },
              { value: "Onyx Black", color: "#353535", inStock: true },
            ],
          },
          {
            id: "bracelet2",
            name: "Stardust Magic",
            price: 24,
            category: "Bracelets",
            theme: "boho",
            sale: true,
            originalPrice: 32,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Layered chain bracelet with star charms and crystal accents. Captures the magic of the night sky.",
          },
          {
            id: "bracelet3",
            name: "Lightning Strike",
            price: 22,
            category: "Bracelets",
            theme: "anime",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Bold lightning bolt charm bracelet with metallic finish. Channel your inner power and strength.",
          },
          {
            id: "bracelet4",
            name: "Pixel Perfect",
            price: 21,
            category: "Bracelets",
            theme: "pop-culture",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Retro pixel art inspired bracelet with colorful beads. A nostalgic nod to 8-bit gaming era.",
          },
        ],
        crochet: [
          {
            id: "crochet1",
            name: "Cozy Companion",
            price: 30,
            category: "Crochet",
            theme: "boho",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Handcrafted crochet plushie in soft pastel yarn. Perfect cuddle buddy for all ages.",
          },
          {
            id: "crochet2",
            name: "Teddy Love",
            price: 35,
            category: "Crochet",
            theme: "cartoon",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Adorable crochet teddy bear with button eyes and bow tie. Made with love, one stitch at a time.",
          },
          {
            id: "crochet3",
            name: "Wave Rider",
            price: 28,
            category: "Crochet",
            theme: "beachy",
            sale: true,
            originalPrice: 40,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Ocean-themed crochet turtle in blue and turquoise shades. Brings beachy vibes to your space.",
          },
          {
            id: "crochet4",
            name: "Galaxy Guardian",
            price: 33,
            category: "Crochet",
            theme: "anime",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Cosmic-inspired crochet character with sparkly details. Perfect for anime and space enthusiasts.",
          },
        ],
        stickers: [
          {
            id: "sticker1",
            name: "Beach Sticker Pack",
            price: 8,
            category: "Stickers",
            theme: "beachy",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Waterproof vinyl stickers featuring surfboards, palm trees, and ocean waves. Set of 10 stickers.",
          },
          {
            id: "sticker2",
            name: "Boho Collection",
            price: 10,
            category: "Stickers",
            theme: "boho",
            sale: true,
            originalPrice: 14,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Mystical sticker set with moons, crystals, and mandala designs. Perfect for journals and laptops.",
          },
          {
            id: "sticker3",
            name: "Pop Icons",
            price: 9,
            category: "Stickers",
            theme: "pop-culture",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Trendy pop culture references and memes in sticker form. Express yourself with these fun designs.",
          },
          {
            id: "sticker4",
            name: "Anime Vibes",
            price: 11,
            category: "Stickers",
            theme: "anime",
            sale: false,
            images: ["Main View", "Detail Shot", "Lifestyle"],
            description:
              "Kawaii anime-style stickers with cute characters and expressions. Weather-resistant and glossy finish.",
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
              wishlistItems.add(record.item_id);
            } else if (record.action_type === "cart") {
              const count = cartItems.get(record.item_id) || 0;
              cartItems.set(record.item_id, count + 1);
            }
          });

          updateUI();
        },
      };

      async function toggleWishlist(productId) {
        const existingRecords = Array.from(
          document.querySelectorAll(`[data-wishlist-record="${productId}"]`)
        );

        if (wishlistItems.has(productId)) {
          wishlistItems.delete(productId);
          const recordsToDelete = existingRecords.map((el) =>
            JSON.parse(el.dataset.record)
          );
          for (const record of recordsToDelete) {
            await window.dataSdk.delete(record);
          }
        } else {
          wishlistItems.add(productId);
          const result = await window.dataSdk.create({
            item_id: productId,
            item_type:
              allProducts.find((p) => p.id === productId)?.category ||
              "Unknown",
            action_type: "wishlist",
            timestamp: Date.now(),
          });

          if (!result.isOk) {
            wishlistItems.delete(productId);
            showNotification("Failed to add to wishlist", "error");
          }
        }

        updateUI();
      }

      async function addToCart(productId) {
        const product = allProducts.find((p) => p.id === productId);

        // Check if product has variants and one is selected
        if (product && product.hasVariants) {
          const selectedVariant = selectedVariants[productId];
          if (!selectedVariant) {
            showNotification("Please select a " + product.variantType, "error");
            return;
          }
        }

        const currentCount = cartItems.get(productId) || 0;
        cartItems.set(productId, currentCount + 1);

        const itemData = {
          item_id: productId,
          item_type: product?.category || "Unknown",
          action_type: "cart",
          timestamp: Date.now(),
        };

        // Add variant info if product has variants
        if (product && product.hasVariants && selectedVariants[productId]) {
          itemData.variant = selectedVariants[productId];
        }

        const result = await window.dataSdk.create(itemData);

        if (result.isOk) {
          showNotification("Added to cart", "success");
          updateUI();
        } else {
          cartItems.set(productId, currentCount);
          showNotification("Failed to add to cart", "error");
          updateUI();
        }
      }

      async function removeFromCart(productId) {
        const existingRecords = Array.from(
          document.querySelectorAll(`[data-cart-record="${productId}"]`)
        );

        if (existingRecords.length > 0) {
          const recordToDelete = JSON.parse(existingRecords[0].dataset.record);
          await window.dataSdk.delete(recordToDelete);

          const currentCount = cartItems.get(productId) || 0;
          if (currentCount > 1) {
            cartItems.set(productId, currentCount - 1);
          } else {
            cartItems.delete(productId);
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
        notification.style.border = `1px solid ${
          type === "success" ? config.primary_action_color : "#ff0000"
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
          updateUI();
        }
      }

      function closeGallery() {
        galleryOpen = false;
        currentGalleryProduct = null;
        currentGalleryImage = 0;
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
          galleryLabel.textContent =
            currentGalleryProduct.images[currentGalleryImage];
        }
      }

      function renderHeader() {
        const wishlistCount = wishlistItems.size;
        const cartCount = Array.from(cartItems.values()).reduce(
          (a, b) => a + b,
          0
        );

        return `
        <header class="sticky top-0 z-40" style="background: ${
          config.background_color
        }; border-bottom: 1px solid rgba(212, 175, 55, 0.1); backdrop-filter: blur(20px);">
          <div class="max-w-7xl mx-auto px-6 py-6">
            <div class="flex items-center justify-between">
              <button onclick="navigate('home')" class="flex flex-col items-start">
                <h1 class="font-heading" style="font-size: ${
                  config.font_size * 2
                }px; color: ${
          config.text_color
        }; font-weight: 400; letter-spacing: 4px;">
                  ${config.brand_name}
                </h1>
                <p class="font-body" style="font-size: ${
                  config.font_size * 0.75
                }px; color: ${
          config.primary_action_color
        }; opacity: 0.7; letter-spacing: 2px; margin-top: 4px;">
                  ${config.tagline}
                </p>
              </button>
              
              <div class="flex items-center gap-6">
                <button onclick="navigate('wishlist')" class="relative transition-opacity hover:opacity-70">
                  <svg class="w-6 h-6" fill="${
                    wishlistCount > 0 ? config.primary_action_color : "none"
                  }" stroke="${
          config.text_color
        }" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  ${
                    wishlistCount > 0
                      ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style="background: ${
                          config.primary_action_color
                        }; color: ${config.background_color}; font-size: ${
                          config.font_size * 0.625
                        }px; font-weight: 500;">${wishlistCount}</span>`
                      : ""
                  }
                </button>
                
                <button onclick="navigate('cart')" class="relative transition-opacity hover:opacity-70">
                  <svg class="w-6 h-6" fill="none" stroke="${
                    config.text_color
                  }" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  ${
                    cartCount > 0
                      ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style="background: ${
                          config.primary_action_color
                        }; color: ${config.background_color}; font-size: ${
                          config.font_size * 0.625
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
                  "keychains",
                  "necklaces",
                  "earrings",
                  "rings",
                  "bracelets",
                  "crochet",
                  "stickers",
                ]
                  .map((view) => {
                    const labels = {
                      home: "All",
                      keychains: "Keychains",
                      necklaces: "Necklaces",
                      earrings: "Earrings",
                      rings: "Rings",
                      bracelets: "Bracelets",
                      crochet: "Crochet",
                      stickers: "Stickers",
                    };
                    const isActive = currentView === view;
                    return `
                    <button onclick="navigate('${view}')" class="relative transition-opacity hover:opacity-70" style="color: ${
                      isActive ? config.primary_action_color : config.text_color
                    }; font-size: ${config.font_size * 0.875}px; font-weight: ${
                      isActive ? "500" : "300"
                    }; letter-spacing: 1px;">
                      ${labels[view]}
                      ${
                        isActive
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
        const isInWishlist = wishlistItems.has(product.id);

        return `
        <div class="product-card" style="background: ${
          config.surface_color
        }; border: 1px solid rgba(212, 175, 55, 0.1);">
          ${
            product.sale
              ? `<div class="absolute top-4 right-4 px-3 py-1 z-10" style="background: ${
                  config.background_color
                }; border: 1px solid ${config.primary_action_color}; color: ${
                  config.primary_action_color
                }; font-size: ${
                  config.font_size * 0.75
                }px; font-weight: 300; letter-spacing: 1px;">SALE</div>`
              : ""
          }
          
          <button onclick="openGallery('${
            product.id
          }')" class="aspect-square relative w-full cursor-pointer group overflow-hidden" style="background: ${
          config.background_color
        };">
            <img src="" alt="${
              product.name
            }" class="w-full h-full object-cover" onerror="this.style.display='none';">
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style="background: rgba(0,0,0,0.4);">
              <span style="color: ${config.text_color}; font-size: ${
          config.font_size
        }px; font-weight: 300; letter-spacing: 2px;">VIEW</span>
            </div>
          </button>
          
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-grow">
                <h3 class="font-heading" style="font-size: ${
                  config.font_size * 1.125
                }px; color: ${
          config.text_color
        }; font-weight: 400; line-height: 1.4;">
                  ${product.name}
                </h3>
                <span class="inline-block mt-2 capitalize" style="font-size: ${
                  config.font_size * 0.75
                }px; color: ${
          config.text_color
        }; opacity: 0.5; font-weight: 300; letter-spacing: 1px;">
                  ${product.theme.replace("-", " ")}
                </span>
              </div>
              
              <button onclick="toggleWishlist('${
                product.id
              }')" class="transition-opacity hover:opacity-70">
                <svg class="w-5 h-5" fill="${
                  isInWishlist ? config.primary_action_color : "none"
                }" stroke="${
          isInWishlist ? config.primary_action_color : config.text_color
        }" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center justify-between mt-4 pt-4" style="border-top: 1px solid rgba(212, 175, 55, 0.1);">
              <div>
                <span class="font-heading" style="font-size: ${
                  config.font_size * 1.25
                }px; color: ${config.primary_action_color}; font-weight: 400;">
                  ₹${product.price}
                </span>
                ${
                  product.sale
                    ? `<span style="font-size: ${
                        config.font_size * 0.875
                      }px; color: ${
                        config.text_color
                      }; opacity: 0.4; text-decoration: line-through; margin-left: 8px;">₹${
                        product.originalPrice
                      }</span>`
                    : ""
                }
              </div>
              
              <button onclick="addToCart('${
                product.id
              }')" class="btn-primary px-6 py-2 transition-opacity hover:opacity-80" style="background: ${
          config.primary_action_color
        }; color: ${config.background_color}; font-size: ${
          config.font_size * 0.875
        }px; font-weight: 400; letter-spacing: 1px;">
                ADD
              </button>
            </div>
          </div>
        </div>
      `;
      }

      function renderHome() {
        const saleProducts = allProducts.filter((p) => p.sale);
        const themes = ["beachy", "boho", "pop-culture", "anime", "cartoon"];

        return `
        <div>
          <section class="relative" style="background: linear-gradient(135deg, ${
            config.surface_color
          } 0%, ${
          config.background_color
        } 100%); min-height: 60%; display: flex; align-items: center; border-bottom: 2px solid ${
          config.primary_action_color
        }; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);">
            <div class="max-w-7xl mx-auto px-6 py-32 text-center">
              <div class="fade-in">
                <h2 class="font-heading mb-6" style="font-size: ${
                  config.font_size * 3.5
                }px; color: ${
          config.primary_action_color
        }; font-weight: 600; letter-spacing: 4px; line-height: 1.2; text-shadow: 0 4px 20px rgba(212, 175, 55, 0.3); transform: scale(1.05);">
                  ${config.hero_title}
                </h2>
                <p class="mb-12" style="font-size: ${
                  config.font_size * 1.125
                }px; color: ${
          config.text_color
        }; opacity: 0.6; font-weight: 300; letter-spacing: 1px;">
                  ${config.hero_subtitle}
                </p>
                <button onclick="document.getElementById('collections').scrollIntoView({behavior: 'smooth'})" class="btn-primary px-10 py-4" style="background: ${
                  config.primary_action_color
                }; color: ${config.background_color}; font-size: ${
          config.font_size
        }px; font-weight: 400; letter-spacing: 2px;">
                  ${config.cta_button}
                </button>
              </div>
            </div>
          </section>

          ${
            saleProducts.length > 0
              ? `
          <section class="py-20" style="background: ${config.surface_color};">
            <div class="max-w-7xl mx-auto px-6">
              <h2 class="font-heading text-center mb-12" style="font-size: ${
                config.font_size * 2
              }px; color: ${
                  config.text_color
                }; font-weight: 300; letter-spacing: 3px;">
                Sale
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

          <section id="collections" class="py-24" style="background: ${
            config.background_color
          };">
            <div class="max-w-7xl mx-auto px-6">
              <h2 class="font-heading text-center mb-20" style="font-size: ${
                config.font_size * 2
              }px; color: ${
          config.text_color
        }; font-weight: 300; letter-spacing: 3px;">
                Collections
              </h2>
              
              ${themes
                .map((theme) => {
                  const themeProducts = allProducts.filter(
                    (p) => p.theme === theme
                  );
                  if (themeProducts.length === 0) return "";

                  return `
                  <div class="mb-20">
                    <h3 class="font-heading mb-8 capitalize" style="font-size: ${
                      config.font_size * 1.5
                    }px; color: ${
                    config.text_color
                  }; font-weight: 300; letter-spacing: 2px; opacity: 0.8;">
                      ${theme.replace("-", " ")}
                    </h3>
                    <div class="carousel-container flex gap-6 overflow-x-auto pb-4">
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

          <footer class="py-16" style="background: ${
            config.surface_color
          }; border-top: 1px solid rgba(212, 175, 55, 0.1);">
            <div class="max-w-7xl mx-auto px-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                  <h4 class="font-heading mb-4" style="font-size: ${
                    config.font_size * 1.25
                  }px; color: ${
          config.text_color
        }; font-weight: 400; letter-spacing: 2px;">
                    ${config.brand_name}
                  </h4>
                  <p style="font-size: ${config.font_size * 0.875}px; color: ${
          config.text_color
        }; opacity: 0.6; line-height: 1.8; font-weight: 300;">
                    ${
                      config.tagline
                    }. Each piece is handcrafted with attention to detail.
                  </p>
                </div>
                
                <div>
                  <h4 class="font-heading mb-4" style="font-size: ${
                    config.font_size
                  }px; color: ${
          config.primary_action_color
        }; font-weight: 400; letter-spacing: 2px;">
                    Quick Links
                  </h4>
                  <div class="space-y-2">
                    ${["home", "keychains", "necklaces", "earrings"]
                      .map(
                        (view) => `
                      <button onclick="navigate('${view}')" class="block transition-opacity hover:opacity-70" style="font-size: ${
                          config.font_size * 0.875
                        }px; color: ${
                          config.text_color
                        }; opacity: 0.6; text-align: left; font-weight: 300;">
                        ${view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    `
                      )
                      .join("")}
                  </div>
                </div>
                
                <div>
                  <h4 class="font-heading mb-4" style="font-size: ${
                    config.font_size
                  }px; color: ${
          config.primary_action_color
        }; font-weight: 400; letter-spacing: 2px;">
                    Connect
                  </h4>
                  <p style="font-size: ${config.font_size * 0.875}px; color: ${
          config.text_color
        }; opacity: 0.6; margin-bottom: 12px; font-weight: 300;">
                    Follow us for updates
                  </p>
                </div>
              </div>
              
              <div class="divider mb-8"></div>
              
              <div class="text-center">
                <p style="font-size: ${config.font_size * 0.75}px; color: ${
          config.text_color
        }; opacity: 0.4; font-weight: 300; letter-spacing: 1px;">
                  © 2024 ${config.brand_name}. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      `;
      }

      function renderWishlist() {
        const wishlistProducts = allProducts.filter((p) =>
          wishlistItems.has(p.id)
        );

        return `
        <div class="py-20" style="background: ${
          config.background_color
        }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <h2 class="font-heading mb-12" style="font-size: ${
              config.font_size * 2
            }px; color: ${
          config.text_color
        }; font-weight: 300; letter-spacing: 3px;">
              Wishlist
            </h2>
            
            ${
              wishlistProducts.length === 0
                ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${
                    config.text_color
                  }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  Your wishlist is empty
                </p>
                <button onclick="navigate('home')" class="btn-primary px-8 py-3" style="background: ${
                  config.primary_action_color
                }; color: ${config.background_color}; font-size: ${
                    config.font_size * 0.875
                  }px; font-weight: 400; letter-spacing: 2px;">
                  START SHOPPING
                </button>
              </div>
            `
                : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${wishlistProducts
                  .map((product) => renderProductCard(product))
                  .join("")}
              </div>
            `
            }
          </div>
        </div>
      `;
      }

      function renderCart() {
        const cartProducts = allProducts.filter((p) => cartItems.has(p.id));
        const subtotal = cartProducts.reduce(
          (sum, p) => sum + p.price * (cartItems.get(p.id) || 0),
          0
        );

        return `
        <div class="py-20" style="background: ${
          config.background_color
        }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <h2 class="font-heading mb-12" style="font-size: ${
              config.font_size * 2
            }px; color: ${
          config.text_color
        }; font-weight: 300; letter-spacing: 3px;">
              Cart
            </h2>
            
            ${
              cartProducts.length === 0
                ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${
                    config.text_color
                  }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  Your cart is empty
                </p>
                <button onclick="navigate('home')" class="btn-primary px-8 py-3" style="background: ${
                  config.primary_action_color
                }; color: ${config.background_color}; font-size: ${
                    config.font_size * 0.875
                  }px; font-weight: 400; letter-spacing: 2px;">
                  START SHOPPING
                </button>
              </div>
            `
                : `
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-4">
                  ${cartProducts
                    .map((product) => {
                      const quantity = cartItems.get(product.id) || 0;
                      return `
                      <div class="flex gap-6 p-6 fade-in" style="background: ${
                        config.surface_color
                      }; border: 1px solid rgba(212, 175, 55, 0.1);">
                        <div class="w-24 h-24 flex-shrink-0 overflow-hidden" style="background: ${
                          config.background_color
                        };">
                          <img src="" alt="${
                            product.name
                          }" class="w-full h-full object-cover" onerror="this.style.display='none';">
                        </div>
                        
                        <div class="flex-grow">
                          <h3 class="font-heading mb-1" style="font-size: ${
                            config.font_size * 1.125
                          }px; color: ${config.text_color}; font-weight: 400;">
                            ${product.name}
                          </h3>
                          <p style="font-size: ${
                            config.font_size * 0.875
                          }px; color: ${
                        config.text_color
                      }; opacity: 0.5; font-weight: 300;">
                            ${product.category}
                          </p>
                          
                          <div class="flex items-center gap-6 mt-4">
                            <div class="flex items-center gap-3">
                              <button onclick="removeFromCart('${
                                product.id
                              }')" class="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${
                        config.text_color
                      }; font-weight: 300;">
                                −
                              </button>
                              <span style="font-size: ${
                                config.font_size
                              }px; color: ${
                        config.text_color
                      }; font-weight: 400; width: 2rem; text-align: center;">
                                ${quantity}
                              </span>
                              <button onclick="addToCart('${
                                product.id
                              }')" class="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${
                        config.text_color
                      }; font-weight: 300;">
                                +
                              </button>
                            </div>
                            
                            <span class="font-heading ml-auto" style="font-size: ${
                              config.font_size * 1.125
                            }px; color: ${
                        config.primary_action_color
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
                  <div class="p-8 sticky top-24 fade-in" style="background: ${
                    config.surface_color
                  }; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <h3 class="font-heading mb-8" style="font-size: ${
                      config.font_size * 1.5
                    }px; color: ${
                    config.text_color
                  }; font-weight: 300; letter-spacing: 2px;">
                      Summary
                    </h3>
                    
                    <div class="space-y-4 mb-8">
                      <div class="flex justify-between" style="font-size: ${
                        config.font_size
                      }px; color: ${config.text_color}; font-weight: 300;">
                        <span>Subtotal</span>
                        <span style="color: ${
                          config.primary_action_color
                        };">₹${subtotal.toFixed(2)}</span>
                      </div>
                      <div class="flex justify-between" style="font-size: ${
                        config.font_size * 0.875
                      }px; color: ${
                    config.text_color
                  }; opacity: 0.5; font-weight: 300;">
                        <span>Shipping</span>
                        <span>At checkout</span>
                      </div>
                      <div class="divider my-4"></div>
                      <div class="flex justify-between font-heading" style="font-size: ${
                        config.font_size * 1.25
                      }px; color: ${
                    config.primary_action_color
                  }; font-weight: 400;">
                        <span>Total</span>
                        <span>���${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button class="btn-primary w-full py-4 mb-4" style="background: ${
                      config.primary_action_color
                    }; color: ${config.background_color}; font-size: ${
                    config.font_size
                  }px; font-weight: 400; letter-spacing: 2px;">
                      CHECKOUT
                    </button>
                    
                    <button onclick="navigate('home')" class="w-full py-3 transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${
                      config.text_color
                    }; font-size: ${
                    config.font_size * 0.875
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

      function renderCategoryPage(category) {
        const categoryProducts = products[category];
        const categoryName =
          category.charAt(0).toUpperCase() + category.slice(1);
        const filteredProducts = sortAndFilterProducts(
          categoryProducts,
          category
        );
        const themes = ["beachy", "boho", "pop-culture", "anime", "cartoon"];

        const currentSort = sortByPerCategory[category] || "default";
        const currentFilter = filterThemePerCategory[category] || "all";
        const filtersVisible = filtersVisiblePerCategory[category] || false;

        return `
        <div class="py-20" style="background: ${
          config.background_color
        }; min-height: 100%;">
          <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center justify-between mb-12">
              <h2 class="font-heading capitalize" style="font-size: ${
                config.font_size * 2
              }px; color: ${
          config.text_color
        }; font-weight: 300; letter-spacing: 3px;">
                ${categoryName}
              </h2>
              
              <button onclick="toggleFilters('${category}')" class="flex items-center gap-2 px-6 py-2 transition-opacity hover:opacity-70" style="border: 1px solid rgba(212, 175, 55, 0.3); color: ${
          config.text_color
        }; font-size: ${
          config.font_size * 0.875
        }px; font-weight: 300; letter-spacing: 1px;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                FILTER
              </button>
            </div>
            
            ${
              filtersVisible
                ? `
              <div class="mb-12 p-8 fade-in" style="background: ${
                config.surface_color
              }; border: 1px solid rgba(212, 175, 55, 0.1);">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 class="mb-6" style="font-size: ${
                      config.font_size
                    }px; color: ${
                    config.primary_action_color
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
                        <button onclick="setSortBy('${category}', '${value}')" class="w-full text-left px-4 py-3 transition-opacity hover:opacity-70" style="background: ${
                            currentSort === value
                              ? config.primary_action_color + "20"
                              : "transparent"
                          }; border: 1px solid ${
                            currentSort === value
                              ? config.primary_action_color
                              : "transparent"
                          }; color: ${config.text_color}; font-size: ${
                            config.font_size * 0.875
                          }px; font-weight: 300;">
                          ${label}
                        </button>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="mb-6" style="font-size: ${
                      config.font_size
                    }px; color: ${
                    config.primary_action_color
                  }; font-weight: 400; letter-spacing: 2px;">
                      Theme
                    </h3>
                    <div class="space-y-2">
                      <button onclick="setFilterTheme('${category}', 'all')" class="w-full text-left px-4 py-3 transition-opacity hover:opacity-70" style="background: ${
                    currentFilter === "all"
                      ? config.primary_action_color + "20"
                      : "transparent"
                  }; border: 1px solid ${
                    currentFilter === "all"
                      ? config.primary_action_color
                      : "transparent"
                  }; color: ${config.text_color}; font-size: ${
                    config.font_size * 0.875
                  }px; font-weight: 300;">
                        All
                      </button>
                      ${themes
                        .map(
                          (theme) => `
                        <button onclick="setFilterTheme('${category}', '${theme}')" class="w-full text-left px-4 py-3 capitalize transition-opacity hover:opacity-70" style="background: ${
                            currentFilter === theme
                              ? config.primary_action_color + "20"
                              : "transparent"
                          }; border: 1px solid ${
                            currentFilter === theme
                              ? config.primary_action_color
                              : "transparent"
                          }; color: ${config.text_color}; font-size: ${
                            config.font_size * 0.875
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
            
            ${
              filteredProducts.length === 0
                ? `
              <div class="text-center py-20 fade-in">
                <p style="font-size: ${config.font_size}px; color: ${
                    config.text_color
                  }; opacity: 0.5; margin-bottom: 24px; font-weight: 300;">
                  No products found
                </p>
                <button onclick="setFilterTheme('${category}', 'all'); setSortBy('${category}', 'default')" class="btn-primary px-8 py-3" style="background: ${
                    config.primary_action_color
                  }; color: ${config.background_color}; font-size: ${
                    config.font_size * 0.875
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

        return `
        <div class="modal-overlay" onclick="if(event.target === this) closeGallery()">
          <div class="modal-content relative" style="max-width: 1000px; width: 90%;">
            <button onclick="closeGallery()" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10 transition-opacity hover:opacity-70" style="background: ${
              config.surface_color
            }; border: 1px solid rgba(212, 175, 55, 0.3);">
              <svg class="w-5 h-5" fill="none" stroke="${
                config.text_color
              }" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div style="background: ${
              config.surface_color
            }; border: 1px solid rgba(212, 175, 55, 0.1);">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div>
                  <div class="relative mb-6 overflow-hidden" style="background: ${
                    config.background_color
                  }; height: 400px;">
                    <img id="gallery-image" src="" alt="${
                      currentGalleryProduct.name
                    }" class="w-full h-full object-cover" onerror="this.style.display='none';">
                    <div class="absolute bottom-0 left-0 right-0 p-3" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);">
                      <p id="gallery-label" class="font-heading" style="font-size: ${
                        config.font_size * 0.875
                      }px; color: #ffffff; font-weight: 300;">
                        ${currentGalleryProduct.images[currentGalleryImage]}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex gap-3">
                    ${currentGalleryProduct.images
                      .map(
                        (img, index) => `
                      <button onclick="currentGalleryImage = ${index}; updateGalleryImage();" class="flex-1 transition-opacity hover:opacity-70 overflow-hidden" style="background: ${
                          config.background_color
                        }; height: 80px; border: 1px solid ${
                          currentGalleryImage === index
                            ? config.primary_action_color
                            : "rgba(212, 175, 55, 0.1)"
                        };">
                        <img src="" alt="${
                          currentGalleryProduct.name
                        } thumbnail ${
                          index + 1
                        }" class="w-full h-full object-cover" onerror="this.style.display='none';">
                      </button>
                    `
                      )
                      .join("")}
                  </div>
                </div>
                
                <div class="flex flex-col">
                  <div class="flex-grow">
                    <h3 class="font-heading mb-3" style="font-size: ${
                      config.font_size * 1.75
                    }px; color: ${
          config.text_color
        }; font-weight: 400; line-height: 1.3;">
                      ${currentGalleryProduct.name}
                    </h3>
                    
                    <div class="mb-6">
                      <span class="inline-block px-3 py-1 mr-2" style="border: 1px solid rgba(212, 175, 55, 0.3); font-size: ${
                        config.font_size * 0.75
                      }px; color: ${
          config.text_color
        }; opacity: 0.7; font-weight: 300; letter-spacing: 1px;">
                        ${currentGalleryProduct.category}
                      </span>
                      <span class="inline-block px-3 py-1 capitalize" style="border: 1px solid rgba(212, 175, 55, 0.3); font-size: ${
                        config.font_size * 0.75
                      }px; color: ${
          config.text_color
        }; opacity: 0.7; font-weight: 300; letter-spacing: 1px;">
                        ${currentGalleryProduct.theme.replace("-", " ")}
                      </span>
                    </div>
                    
                    <div class="mb-8">
                      <div class="flex items-baseline gap-3">
                        <span class="font-heading" style="font-size: ${
                          config.font_size * 2
                        }px; color: ${
          config.primary_action_color
        }; font-weight: 400;">
                          ₹${currentGalleryProduct.price}
                        </span>
                        ${
                          currentGalleryProduct.sale
                            ? `
                          <span style="font-size: ${config.font_size}px; color: ${config.text_color}; opacity: 0.4; text-decoration: line-through; font-weight: 300;">
                            ₹${currentGalleryProduct.originalPrice}
                          </span>
                        `
                            : ""
                        }
                      </div>
                    </div>
                    
                    <div class="mb-8">
                      <p style="font-size: ${
                        config.font_size * 0.875
                      }px; color: ${
          config.text_color
        }; line-height: 1.8; font-weight: 300; opacity: 0.7;">
                        ${
                          currentGalleryProduct.description ||
                          "Handcrafted with attention to detail. Each piece is unique and made to order."
                        }
                      </p>
                    </div>
                    
                    ${
                      currentGalleryProduct.hasVariants
                        ? `
                      <div class="mb-8 p-4" style="border: 1px solid rgba(212, 175, 55, 0.1); background: ${
                        config.background_color
                      };">
                        <p style="font-size: ${
                          config.font_size * 0.875
                        }px; color: ${
                            config.text_color
                          }; opacity: 0.6; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                          Select ${currentGalleryProduct.variantType}
                        </p>
                        ${
                          currentGalleryProduct.variantType === "letter"
                            ? `
                          <div class="grid grid-cols-9 gap-2">
                            ${currentGalleryProduct.variants
                              .map(
                                (variant) => `
                              <button 
                                onclick="selectVariant('${
                                  currentGalleryProduct.id
                                }', '${variant.value}')" 
                                ${!variant.inStock ? "disabled" : ""}
                                class="aspect-square flex items-center justify-center transition-opacity ${
                                  variant.inStock ? "hover:opacity-70" : ""
                                }"
                                style="
                                  border: 1px solid ${
                                    selectedVariants[
                                      currentGalleryProduct.id
                                    ] === variant.value
                                      ? config.primary_action_color
                                      : "rgba(212, 175, 55, 0.2)"
                                  };
                                  background: ${
                                    selectedVariants[
                                      currentGalleryProduct.id
                                    ] === variant.value
                                      ? config.primary_action_color + "20"
                                      : "transparent"
                                  };
                                  color: ${
                                    variant.inStock
                                      ? config.text_color
                                      : config.text_color
                                  };
                                  opacity: ${variant.inStock ? "1" : "0.3"};
                                  font-size: ${config.font_size * 0.875}px;
                                  font-weight: 400;
                                  cursor: ${
                                    variant.inStock ? "pointer" : "not-allowed"
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
                        ${
                          currentGalleryProduct.variantType === "color"
                            ? `
                          <div class="grid grid-cols-2 gap-3">
                            ${currentGalleryProduct.variants
                              .map(
                                (variant) => `
                              <button 
                                onclick="selectVariant('${
                                  currentGalleryProduct.id
                                }', '${variant.value}')" 
                                ${!variant.inStock ? "disabled" : ""}
                                class="flex items-center gap-3 px-3 py-3 transition-opacity ${
                                  variant.inStock ? "hover:opacity-70" : ""
                                }"
                                style="
                                  border: 1px solid ${
                                    selectedVariants[
                                      currentGalleryProduct.id
                                    ] === variant.value
                                      ? config.primary_action_color
                                      : "rgba(212, 175, 55, 0.2)"
                                  };
                                  background: ${
                                    selectedVariants[
                                      currentGalleryProduct.id
                                    ] === variant.value
                                      ? config.primary_action_color + "20"
                                      : "transparent"
                                  };
                                  opacity: ${variant.inStock ? "1" : "0.4"};
                                  cursor: ${
                                    variant.inStock ? "pointer" : "not-allowed"
                                  };
                                "
                              >
                                <div style="width: 20px; height: 20px; border-radius: 50%; background: ${
                                  variant.color
                                }; border: 1px solid rgba(255,255,255,0.2);"></div>
                                <span style="font-size: ${
                                  config.font_size * 0.875
                                }px; color: ${config.text_color};">${
                                  variant.value
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
                        : ""
                    }
                  </div>
                  
                  <div class="flex gap-4 mt-8">
                    <button onclick="addToCart('${
                      currentGalleryProduct.id
                    }')" class="btn-primary flex-1 py-4" style="background: ${
          config.primary_action_color
        }; color: ${config.background_color}; font-size: ${
          config.font_size
        }px; font-weight: 400; letter-spacing: 2px;">
                      ADD TO CART
                    </button>
                    
                    <button onclick="toggleWishlist('${
                      currentGalleryProduct.id
                    }')" class="p-4 transition-opacity hover:opacity-70" style="border: 1px solid ${
          wishlistItems.has(currentGalleryProduct.id)
            ? config.primary_action_color
            : "rgba(212, 175, 55, 0.3)"
        };">
                      <svg class="w-6 h-6" fill="${
                        wishlistItems.has(currentGalleryProduct.id)
                          ? config.primary_action_color
                          : "none"
                      }" stroke="${
          wishlistItems.has(currentGalleryProduct.id)
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
        app.style.background = config.background_color;
        app.style.fontFamily = `${config.font_family}, sans-serif`;

        let content = renderHeader();

        if (currentView === "home") {
          content += renderHome();
        } else if (currentView === "wishlist") {
          content += renderWishlist();
        } else if (currentView === "cart") {
          content += renderCart();
        } else if (products[currentView]) {
          content += renderCategoryPage(currentView);
        }

        if (galleryOpen && currentGalleryProduct) {
          content += renderGalleryModal();
        }

        app.innerHTML = content;
      }

      async function onConfigChange(newConfig) {
        config = { ...config, ...newConfig };
        updateUI();
      }

async function init() {
  // Check if SDK exists, if not, just render the UI
  if (window.dataSdk && window.dataSdk.init) {
    const initResult = await window.dataSdk.init(dataHandler);
    if (!initResult.isOk) {
      console.error("Failed to initialize data SDK");
    }
  } else {
    console.warn("Data SDK not found. Running in preview mode.");
  }

  // Same check for elementSdk
  if (window.elementSdk && window.elementSdk.init) {
    window.elementSdk.init({
      // ... your existing config mapping ...
    });
  }

  // This ensures the UI renders even if the SDKs are missing
  updateUI();
}
      

      init();