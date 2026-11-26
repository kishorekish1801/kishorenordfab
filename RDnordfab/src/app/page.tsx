import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import StudioHero from "@/components/home/StudioHero";
import ObjectGallery from "@/components/home/ObjectGallery";

const stages = [
  { name: "Design", image: "/images/banners/design-workspace.webp", alt: "A curved vase model on a studio monitor", body: "Every curve starts on screen. We shape the profile, balance the proportions and prepare the model for printing." },
  { name: "Print", image: "/images/banners/printer-hero.webp", alt: "A forest-green vase taking shape on the print bed", body: "A fine strand of filament follows the digital drawing, building the walls one layer at a time." },
  { name: "Deliver", image: "/images/products/minimal-vase.webp", alt: "A finished ribbed vase on a sunlit plinth", body: "Off the print bed and into your space. The fine ridges of the print become part of the finished surface." },
];

export default function HomePage() {
  return <>
    <StudioHero />
    <ObjectGallery />
    <section id="process" className="studio-process" aria-label="Our process">
      {stages.map((stage, index) => <article className="studio-stage" key={stage.name}>
        <div className="stage-copy"><p className="studio-label">Our process · 0{index + 1} / 03</p>
          <h2>{stage.name}<i>.</i></h2><p>{stage.body}</p>
        </div>
        <div className="stage-photo">{stage.name === "Print" ? (
          <video controls muted playsInline preload="none" poster={stage.image} aria-label="Watch the studio printer in action">
            <source src="/videos/rd-nordfab-hero.mp4" type="video/mp4"/>
          </video>
        ) : <Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 700px) 100vw, 55vw"/>}</div>
      </article>)}
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
