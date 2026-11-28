import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import styles from "./StudioHero.module.css";

export default function StudioHero() {
  return (
    <section className={styles.hero} aria-labelledby="studio-title">
      <div className={styles.intro}>
        <p className={styles.kicker}>Nordic 3D print studio</p>
        <h1 id="studio-title">Turn Digital <br />Ideas into<br /><em>Real Products</em></h1>
        <p className={styles.description}>Sculptural objects for your home. Precision prints for your next project.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/shop">Shop Now <ArrowRight size={16}/></Link>
          <Link className="button button-outline" href="/custom-print">Custom Print</Link>
        </div>
      </div>
      <figure className={styles.figure}>
        <div className={styles.portrait}>
          <Image src="/images/banners/rd-nordfab-hero-final-reference-v4.webp" alt="Ivory David bust, with an open lattice sweeping across one shoulder" fill priority sizes="(max-width: 700px) 100vw, 55vw"/>
          <details className={styles.detail}>
            <summary aria-label="Lattice detail"><Plus size={18} aria-hidden="true"/></summary>
            <div><strong>Lattice shoulder</strong><p>The solid surface opens into a web of curved struts across the chest and shoulder.</p></div>
          </details>
        </div>
        <figcaption><span>David <i>/</i> Lattice study</span><span>Studio sculpture</span></figcaption>
      </figure>
      <a className={styles.scroll} href="#collection"><ArrowDown size={15}/> Explore the collection</a>
    </section>
  );
}
