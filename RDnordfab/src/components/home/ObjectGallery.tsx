"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";

const studioObjects = products.filter(product =>
  ["twisted-vase", "geometric-planter", "lattice-lamp-shade", "desk-organiser"].includes(product.slug)
);

export default function ObjectGallery() {
  const [index, setIndex] = useState(0);
  const selected = studioObjects[index];
  return <section id="collection" className="studio-selection page-container" aria-label="The collection">
    <div className="studio-heading">
      <div><p className="studio-label">The collection</p><h2>Objects for everyday life</h2></div>
      <Link href="/shop">Shop all objects <ArrowUpRight size={17}/></Link>
    </div>
    <div className="object-gallery">
      <div className="object-gallery-image" key={selected.slug}>
        <Image src={selected.image} alt={selected.name} fill sizes="(max-width: 700px) 100vw, 48vw"/>
      </div>
      <div className="object-gallery-panel">
        <div aria-live="polite" aria-atomic="true">
          <p className="studio-label">{selected.category} · {selected.material}</p>
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
          <Link className="object-detail-link" href={'/products/' + selected.slug}>View object · {selected.price} SEK <ArrowRight size={17}/></Link>
        </div>
        <div className="object-picker" role="group" aria-label="Choose an object">
          {studioObjects.map((product, i) => <button key={product.slug} type="button" aria-label={product.name} aria-pressed={index === i} onClick={() => setIndex(i)}>
            <Image src={product.image} width={72} height={72} alt=""/>
          </button>)}
        </div>
      </div>
    </div>
  </section>;
}
