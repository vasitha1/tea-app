export interface Product {
  id: number;
  name: string;
  flavor: string;
  shortDescription: string;
  longDescription: string;
  healthBenefits: string[];
  brewingInstructions: string[];
  healthDisclaimer: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ginger - Cloves",
    flavor: "Ginger - Cloves",
    shortDescription: "This bold, spicy blend brings together ginger and cloves for a powerful tea with both warmth and depth.",
    longDescription: "This bold, spicy blend brings together ginger and cloves for a powerful tea with both warmth and depth. Crafted to invigorate and protect, it’s perfect for cold days or when your body needs a natural boost.",
    healthBenefits: [
      "Boosts immunity & relieves colds",
      "Natural anti-inflammatory properties",
      "Helps with nausea & digestion",
      "Improves circulation & warmth",
    ],
    brewingInstructions: [
      "1 tea bag",
      "200ml boiling water",
      "Steep 3–5 min",
      "Enjoy with honey for a little sweetness.",
    ],
    healthDisclaimer: "This herbal tea is not intended to diagnose, treat, cure, or prevent any disease. Pregnant or breastfeeding women, children, and individuals with medical conditions should consult a healthcare professional before use. Consume in moderation.",
    imageUrl: "/ginger_cloves.jpeg",
  },
  {
    id: 2,
    name: "Lemongrass - Cloves",
    flavor: "Lemongrass - Cloves",
    shortDescription: "This blend brings together lemon grass and cloves, two powerful botanicals cherished in African and Cameroon herbal tradition.",
    longDescription: "This blend brings together lemon grass and cloves, two powerful botanicals cherished in African and Cameroon herbal tradition. It is refreshing yet warming, it offers calm and balance in every cup.",
    healthBenefits: [
      "Calms the body & mind",
      "Relieves bloating & indigestion",
      "Contains natural antibacterial properties",
      "Supports metabolism & circulation",
    ],
    brewingInstructions: [
      "1 tea bag",
      "200ml boiling water",
      "Steep 3–5 min",
      "Enjoy with honey for a little sweetness.",
    ],
    healthDisclaimer: "This herbal tea is not intended to diagnose, treat, cure, or prevent any disease. Pregnant or breastfeeding women, children, and individuals with medical conditions should consult a healthcare professional before use. Consume in moderation.",
    imageUrl: "/lemongrass_cloves.jpeg",
  },
  {
    id: 3,
    name: "Lemongrass - Cinnamon",
    flavor: "Lemongrass - Cinnamon",
    shortDescription: "A refreshing twist of citrus-like lemon grass paired with the warming depth of cinnamon.",
    longDescription: "A refreshing twist of citrus-like lemon grass paired with the warming depth of cinnamon. This blend is perfect for relaxation yet uplifting enough to brighten your day.",
    healthBenefits: [
      "Reduces stress & anxiety",
      "Supports healthy blood sugar levels",
      "Refreshing & warming",
      "Helps fight fatigue naturally",
    ],
    brewingInstructions: [
      "1 tea bag",
      "200ml boiling water",
      "Steep 3–5 min",
      "Enjoy with honey for a little sweetness.",
    ],
    healthDisclaimer: "This herbal tea is not intended to diagnose, treat, cure, or prevent any disease. Pregnant or breastfeeding women, children, and individuals with medical conditions should consult a healthcare professional before use. Consume in moderation.",
    imageUrl: "/lemongrass_cinamon.jpeg",
  },
  {
    id: 4,
    name: "Pure Lemongrass",
    flavor: "Pure Lemongrass",
    shortDescription: "Pure and simple, this single-ingredient infusion captures the clean, calming taste of lemon grass.",
    longDescription: "Pure and simple, this single-ingredient infusion captures the clean, calming taste of lemon grass. A timeless favourite for relaxation, digestion, and daily wellness.",
    healthBenefits: [
      "Naturally calming & soothing",
      "Aids restful sleep",
      "Supports digestion",
      "Gentle daily detox",
    ],
    brewingInstructions: [
      "1 tea bag",
      "200ml boiling water",
      "Steep 3–5 min",
      "Enjoy with honey for a little sweetness.",
    ],
    healthDisclaimer: "This herbal tea is not intended to diagnose, treat, cure, or prevent any disease. Pregnant or breastfeeding women, children, and individuals with medical conditions should consult a healthcare professional before use. Consume in moderation.",
    imageUrl: "/pure_lemon_grass.jpeg",
  },
  {
    id: 5,
    name: "Hibiscus - Cinnamon - Cloves",
    flavor: "Hibiscus - Cinnamon - Cloves",
    shortDescription: "A vibrant, ruby-red infusion combining the tart freshness of hibiscus with the warm spice of cinnamon and cloves.",
    longDescription: "Our Hibiscus • Cinnamon • Cloves blend is a vibrant, ruby-red infusion combining the tart freshness of hibiscus with the warm spice of cinnamon and cloves. Carefully selected and blended, it is crafted to uplift your taste and standards of tea while supporting a healthy lifestyle.",
    healthBenefits: [
      "Rich in natural antioxidants that support overall wellness",
      "Can help soothe digestion and promote relaxation",
      "Traditionally used to support heart health and circulation",
      "A warming, comforting tea that can be enjoyed daily",
    ],
    brewingInstructions: [
      "1 tea bag in a cup.",
      "Add 200 ml of boiled water.",
      "Steep for 3–5 minutes.",
      "Enjoy plain, or add honey for a natural sweetness.",
    ],
    healthDisclaimer: "This herbal tea is not intended to diagnose, treat, cure, or prevent any disease. Pregnant or breastfeeding women, children, and individuals with medical conditions should consult a healthcare professional before use. Consume in moderation.",
    imageUrl: "/hibiscus_cinamon_cloves.jpeg",
  },
];
