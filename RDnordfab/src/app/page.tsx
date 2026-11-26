import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const stages = [
  { name: "Design", image: "/images/banners/design-workspace.webp", alt: "A curved vase model on a studio monitor", body: "Every curve starts on screen. We shape the profile, balance the proportions and prepare the model for printing." },
  { name: "Print", image: "/images/banners/printer-hero.webp", alt: "A forest-green vase taking shape on the print bed", body: "A fine strand of filament follows the digital drawing, building the walls one layer at a time." },
  { name: "Deliver", image: "/images/products/minimal-vase.webp", alt: "A finished ribbed vase on a sunlit plinth", body: "Off the print bed and into your space. The fine ridges of the print become part of the finished surface." },
];

export default function HomePage() {
  return <>
    <section className="studio-hero">
      <Image className="studio-hero-art" src="/images/banners/rd-nordfab-hero-final-reference-v4.webp" alt="Ivory David bust with an open lattice shoulder" fill priority sizes="100vw" />
      <div className="studio-hero-copy">
        <p className="studio-label">Nordic 3D print studio</p>
        <h1>Turn Digital Ideas<br />into <em>Real Products</em></h1>
        <p>Sculptural objects for your home. Precision prints for your next project.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/shop">Shop Now <ArrowRight size={16}/></Link>
          <Link className="button button-outline" href="/custom-print">Custom Print</Link>
        </div>
      </div>
      <a className="studio-scroll" href="#process"><ArrowDown size={15}/> Explore the process</a>
    </section>
    <section id="process" className="studio-process" aria-label="Our process">
      {stages.map((stage, index) => <article className="studio-stage" key={stage.name}>
        <div className="stage-copy"><p className="studio-label">Our process · 0{index + 1} / 03</p>
          <h2>{stage.name}<i>.</i></h2><p>{stage.body}</p>
        </div>
        <div className="stage-photo"><Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 700px) 100vw, 55vw"/></div>
      </article>)}
    </section>
    <section className="studio-selection page-container">
      <div className="studio-heading"><div><p className="studio-label">The collection</p><h2>Objects for everyday life</h2></div>
        <Link href="/shop">Shop all objects <ArrowUpRight size={17}/></Link></div>
      <div className="studio-grid">{[products[0], products[1], products[4], products[3]].map(product => <ProductCard key={product.id} product={product}/>)}</div>
    </section>
    <section className="studio-services page-container" aria-label="Printing services">
      <article><div className="service-photo"><Image src="/images/banners/design-workspace.webp" alt="3D modelling workstation" fill sizes="(max-width: 700px) 100vw, 48vw"/></div>
        <div><p className="studio-label">Custom printing</p><h2>Bring your own design.</h2><p>Share a model or sketch and choose a material for your print.</p><Link href="/custom-print#quote-form">Upload your design <ArrowUpRight size={17}/></Link></div></article>
      <article><div className="service-photo"><Image src="/images/products/functional-gear.webp" alt="Printed engineering gear" fill sizes="(max-width: 700px) 100vw, 48vw"/></div>
        <div><p className="studio-label">For businesses</p><h2>Prototype in three dimensions.</h2><p>Test the fit, refine a part or discuss a small production run.</p><Link href="/contact">Discuss a prototype <ArrowUpRight size={17}/></Link></div></article>
    </section>
    <section className="studio-materials"><div className="page-container"><p className="studio-label">Studio materials</p><h2>What goes into a print?</h2><p>PLA for sculptural forms. PETG and ABS for functional parts. Explore the materials behind the collection.</p><Link href="/about#materials">Explore materials <ArrowRight size={16}/></Link></div></section>
  </>;
}
