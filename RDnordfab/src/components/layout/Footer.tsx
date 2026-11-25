import Link from "next/link";
import { ArrowRight, Instagram, Linkedin, Facebook } from "lucide-react";
import BrandMark from "@/components/shared/BrandMark";

const columns = [
  { title: "Shop", links: [["All Products", "/shop"], ["Home Decor", "/shop?category=Home%20Decor"], ["Organizers", "/shop?category=Organizers"], ["Lighting", "/shop?category=Lighting"], ["Plant Pots", "/shop?category=Plant%20Pots"]] },
  { title: "Customer Service", links: [["Contact", "/contact"], ["Shipping Information", "/shipping"], ["Returns & Refunds", "/returns"], ["FAQ", "/faq"], ["Custom Print", "/custom-print"]] },
  { title: "About", links: [["Our Story", "/about"], ["Sustainability", "/about#sustainability"], ["Materials", "/about#materials"], ["Blog", "/blog"], ["Careers", "/careers"]] }
];

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main page-container">
      <div className="footer-brand">
        <Link href="/"><BrandMark compact /></Link>
        <p>Sustainable 3D printing for a better tomorrow. Premium products, prototypes and custom solutions across Europe.</p>
        <div className="social-links"><a href="#instagram" aria-label="Instagram"><Instagram size={16} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={16} /></a><a href="#linkedin" aria-label="LinkedIn"><Linkedin size={16} /></a></div>
      </div>
      {columns.map((column) => <div className="footer-column" key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>)}
      <div className="footer-newsletter"><h3>Newsletter</h3><p>Get product news and studio updates.</p><form action="#newsletter"><input type="email" placeholder="Your email address" aria-label="Your email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></form></div>
    </div>
    <div className="footer-bottom"><div className="page-container footer-bottom-inner"><span>© 2026 RD NORDFAB AB. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/cookies">Cookies</Link><span>EN / SV</span></div></div></div>
  </footer>;
}
