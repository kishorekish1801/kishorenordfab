import Image from "next/image";
export default function PageHero({ eyebrow, title, accent, description, image = "/images/banners/design-workspace.webp" }: { eyebrow: string; title: string; accent?: string; description: string; image?: string }) {
  return <section className="page-hero"><Image src={image} alt="" fill priority sizes="100vw" /><div className="page-hero-inner"><span className="eyebrow">{eyebrow}</span><h1>{title} {accent && <em>{accent}</em>}</h1><p>{description}</p></div></section>;
}
