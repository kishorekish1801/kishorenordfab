"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Globe2, Leaf, Recycle, ShieldCheck, Truck, UploadCloud, Box, Settings } from "lucide-react";
import { products, categories } from "@/data/products";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";

export function Hero() {
  return (
    <section className="hero-section hero-video-section">
      <video
        className="hero-video-background"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/banners/printer-hero.webp"
        aria-hidden="true"
      >
        <source src="/videos/rd-nordfab-hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-video-wash" aria-hidden="true" />

      <div className="hero-copy">
        <p className="eyebrow">
          Sustainable <span>•</span> Modern <span>•</span> Timeless
        </p>

        <h1 className="hero-title">
          Turn Digital Ideas<br />
          <span className="hero-into">into </span>
          <em className="hero-highlight">
            Real Products
          </em>
        </h1>

        <p className="hero-description">
          Sustainable 3D printing for a better tomorrow.<br />
          Premium products, prototypes and custom solutions<br className="desktop-break" />
          across Europe.
        </p>

        <div className="hero-actions">
          <Link href="/shop" className="button button-primary">
            Shop Now <ArrowRight size={17} />
          </Link>
          <Link href="/custom-print" className="button button-outline">
            Custom Print
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  return (
    <section
      className="section-block featured-section page-container"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      <div className="section-heading">
        <div>
          <span className="section-kicker">The collection</span>
          <h2>Featured Products</h2>
          <span className="heading-rule" />
        </div>
        <Link href="/shop" className="text-link">
          View All <ArrowRight size={16} />
        </Link>
      </div>
      <FeaturedCarousel products={products} isSectionHovered={isSectionHovered} />
    </section>
  );
}

export function NatureCollection() {
  return (
    <section className="nature-collection-image-section">
      <div className="nature-collection-html-banner">

        <Image
          src="/images/banners/nature-collection-photo.png"
          alt="A nature-inspired 3D printed lattice vase in a mountain landscape"
          fill
          priority
          sizes="100vw"
          className="nature-collection-html-background"
        />

        <div className="nature-collection-html-wash" />

        <div className="nature-collection-html-copy">
          <span className="nature-collection-html-label">
            OUR COLLECTION
          </span>

          <h2>
            Nature Inspired
            <br />
            <em>Designs</em>
          </h2>

          <p>
            Modern 3D printed products for
            <br />
            a calmer, greener home.
          </p>

          <Link
            href="/shop?collection=nature"
            className="button button-primary nature-collection-html-cta"
          >
            Explore Collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const items = [
    { icon: Leaf, title: "Eco-Friendly Materials", text: "We use sustainable and recyclable materials." },
    { icon: Settings, title: "Precision Technology", text: "High-quality 3D printing with great detail." },
    { icon: Truck, title: "Fast & Reliable Delivery", text: "Across Europe, right to your door." },
    { icon: ShieldCheck, title: "Custom Designs", text: "Bring your ideas to life with our custom print service." }
  ];
  return <section className="why-section"><div className="page-container why-grid"><div className="why-heading"><span className="section-kicker">Why choose RD Nordfab</span><h2>Real solutions.<br /><em>A greener future.</em></h2></div>{items.map(({ icon: Icon, title, text }) => <div className="why-item" key={title}><Icon size={31} strokeWidth={1.55} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></section>;
}

export function CustomPrintTeaser() {
  return <section className="custom-teaser page-container"><div className="custom-teaser-image"><Image src="/images/banners/design-workspace.webp" alt="A 3D vase design on a computer beside a printed product" fill sizes="(max-width: 760px) 100vw, 42vw" /></div><div className="custom-teaser-copy"><span className="section-kicker">Custom 3D printing</span><h2>Upload your model.<br /><em>Get a quote.</em></h2><p>Turn your ideas into reality. Upload your 3D model or image and we'll provide a fast, no-obligation quote.</p><div className="custom-teaser-actions"><Link href="/custom-print" className="button button-primary">Upload Your File <ArrowRight size={16} /></Link><Link href="/custom-print" className="text-link">Learn More <ArrowRight size={15} /></Link></div><div className="file-types"><span><FileText size={14} /> STL</span><span><FileText size={14} /> OBJ</span><span><FileText size={14} /> STEP</span><span><FileText size={14} /> 3MF</span><span><FileText size={14} /> PNG</span><span><FileText size={14} /> JPG</span><span><FileText size={14} /> PDF</span></div></div><ul className="custom-checks"><li><CheckCircle2 /> Custom sizes & colours</li><li><CheckCircle2 /> High quality materials</li><li><CheckCircle2 /> Perfect for prototypes and unique products</li></ul></section>;
}

export function HowItWorks() {
  const steps = [
    { n: "1", icon: UploadCloud, title: "Upload Your Design", desc: "Upload a 3D model or image of your idea." },
    { n: "2", icon: FileText, title: "Get a Quote", desc: "We review your design and send you a custom quote." },
    { n: "3", icon: Box, title: "We Print & Deliver", desc: "Your product is 3D printed and shipped across Europe." }
  ];
  return <section className="how-section page-container" id="how-it-works"><div className="section-heading compact"><div><span className="section-kicker">Simple and reliable</span><h2>How It Works</h2><span className="heading-rule" /></div></div><div className="steps-row">{steps.map(({ n, icon: Icon, title, desc }, i) => <div className="step-item" key={n}><span className="step-number">{n}</span><Icon size={38} strokeWidth={1.45} /><div><strong>{title}</strong><p>{desc}</p></div>{i < 2 && <ChevronRight className="step-chevron" size={22} />}</div>)}</div></section>;
}

export function ShopByCategory() {
  return <section className="category-section page-container"><div className="section-heading"><div><span className="section-kicker">Explore our range</span><h2>Shop by Category</h2><span className="heading-rule" /></div><Link href="/shop" className="text-link">View All <ArrowRight size={16} /></Link></div><div className="category-grid">{categories.map((category) => <Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="category-card" key={category.name}><div className="category-image"><Image src={category.image} alt={category.name} fill sizes="(max-width: 700px) 48vw, 20vw" /></div><span>{category.name} <ArrowRight size={14} /></span></Link>)}</div></section>;
}

export function Sustainability() {
  return <section className="sustainability-section" id="sustainability"><div className="sustainability-photo"><Image src="/images/banners/sustainable-materials.webp" alt="Sustainable 3D printing material pellets and leaves" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="sustainability-copy"><span className="section-kicker">Sustainability</span><h2>Better materials.<br /><em>A brighter tomorrow.</em></h2><p>We use eco-friendly and recyclable materials to reduce our environmental impact while creating durable, high-quality products.</p><Link href="/about#sustainability" className="button button-primary">Our Materials <ArrowRight size={16} /></Link></div><div className="sustainability-points"><div><Leaf /><span>Recycled & biodegradable materials</span></div><div><Recycle /><span>Lower environmental impact</span></div><div><Globe2 /><span>A more sustainable Europe</span></div></div></section>;
}

export function Testimonials() {
  const reviews = [
    { initials: "EJ", name: "Erik Johansson", city: "Stockholm, Sweden", quote: "Amazing quality and fast delivery! The vase looks even better in person. Highly recommended." },
    { initials: "SN", name: "Sofia Nilsson", city: "Gothenburg, Sweden", quote: "Great customer service and beautiful designs. I also ordered a custom piece and it turned out perfect." },
    { initials: "LB", name: "Lukas Berg", city: "Malmö, Sweden", quote: "Excellent quality and sustainable materials. RD NORDFAB really stands out!" }
  ];
  return <section className="reviews-section page-container"><div className="section-heading"><div><span className="section-kicker">Kind words from customers</span><h2>What Our Customers Say</h2><span className="heading-rule" /></div><Link href="/shop#reviews" className="text-link">View All Reviews <ArrowRight size={16} /></Link></div><div className="reviews-grid">{reviews.map((review) => <article className="review-card" key={review.initials}><div className="review-avatar">{review.initials}</div><div><div className="review-stars">★★★★★</div><p>“{review.quote}”</p><strong>{review.name}</strong><small>{review.city}</small></div></article>)}</div><div className="review-dots"><i /><i /><i /></div></section>;
}

export function Newsletter() {
  return <section className="newsletter-section" id="newsletter"><div className="newsletter-bg"><Image src="/images/banners/forest-newsletter.webp" alt="Nordic forest landscape" fill sizes="100vw" /></div><div className="newsletter-inner page-container"><div><span className="section-kicker">Stay updated</span><h2>Get 10% off<br />your first order</h2><p>Subscribe to our newsletter for new products, special offers<br className="desktop-break" /> and 3D printing tips.</p></div><form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to RD NORDFAB updates!"); }}><div><input type="email" required placeholder="Your email address" aria-label="Your email address" /><button type="submit">Subscribe <ArrowRight size={16} /></button></div><label><input type="checkbox" required /> I agree to receive marketing emails from RD NORDFAB.</label></form></div></section>;
}
