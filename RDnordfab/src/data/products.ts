export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  material: string;
  colors: string[];
  stock: number;
  badge?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1, slug: "twisted-vase", name: "Twisted Vase", category: "Home Decor", price: 199,
    image: "/images/products/twisted-vase.webp", rating: 4.8, reviews: 24, material: "PLA",
    colors: ["#e9e0d2", "#d1b69a", "#294a40", "#292c2b"], stock: 18, badge: "Bestseller",
    description: "A sculptural statement piece with flowing spiral lines, designed to bring a calm Nordic character to your home."
  },
  {
    id: 2, slug: "geometric-planter", name: "Geometric Planter Pot", category: "Plant Pots", price: 199,
    image: "/images/products/planter-pot.webp", rating: 4.7, reviews: 18, material: "PLA",
    colors: ["#e8ddcb", "#b9a487", "#637b65", "#262a29"], stock: 24, badge: "New",
    description: "A faceted planter with a clean geometric profile. A modern home for your favourite indoor plants."
  },
  {
    id: 3, slug: "minimal-vase", name: "Minimal Vase", category: "Home Decor", price: 169,
    image: "/images/products/minimal-vase.webp", rating: 4.6, reviews: 12, material: "PLA",
    colors: ["#e9e2d7", "#c1b4a2", "#343a37"], stock: 12,
    description: "A timeless ribbed silhouette that pairs soft curves with precision 3D printing."
  },
  {
    id: 4, slug: "desk-organiser", name: "Desk Organiser", category: "Organizers", price: 249,
    image: "/images/products/desk-organiser.webp", rating: 4.9, reviews: 20, material: "PETG",
    colors: ["#202321", "#7c827c", "#294a40"], stock: 9,
    description: "Keep everyday essentials neatly arranged with this modular, multi-compartment desk organiser."
  },
  {
    id: 5, slug: "lattice-lamp-shade", name: "Lattice Lamp Shade", category: "Lighting", price: 299,
    image: "/images/products/lamp-shade.webp", rating: 4.8, reviews: 16, material: "PETG",
    colors: ["#ead5b5", "#b77b48", "#282b29"], stock: 6,
    description: "An intricate open lattice creates a warm patterned glow and an inviting atmosphere."
  },
  {
    id: 6, slug: "functional-gear", name: "Functional Gear", category: "Functional Parts", price: 249,
    image: "/images/products/functional-gear.webp", rating: 4.5, reviews: 10, material: "ABS",
    colors: ["#343837", "#858987"], stock: 14,
    description: "A precision-printed functional component for prototypes, projects and creative builds."
  },
  {
    id: 7, slug: "decorative-bowl", name: "Decorative Bowl", category: "Home Decor", price: 249,
    image: "/images/products/minimal-vase.webp", rating: 4.7, reviews: 15, material: "PLA",
    colors: ["#e9e0d2", "#6a8271"], stock: 16,
    description: "A sculptural bowl with soft organic details for shelves, consoles and table styling."
  },
  {
    id: 8, slug: "desk-tray", name: "Desk Tray", category: "Organizers", price: 199,
    image: "/images/products/desk-organiser.webp", rating: 4.6, reviews: 11, material: "PETG",
    colors: ["#d7d0c4", "#292d2b"], stock: 20,
    description: "A tidy catch-all tray for the small essentials you reach for every day."
  }
];

export const categories = [
  { name: "Home Decor", image: "/images/products/minimal-vase.webp", count: 24 },
  { name: "Organizers", image: "/images/products/desk-organiser.webp", count: 18 },
  { name: "Lighting", image: "/images/products/lamp-shade.webp", count: 12 },
  { name: "Plant Pots", image: "/images/products/planter-pot.webp", count: 16 },
  { name: "Custom Designs", image: "/images/products/functional-gear.webp", count: 8 }
];
