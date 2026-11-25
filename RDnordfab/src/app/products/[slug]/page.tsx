"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, ShieldCheck, Truck, Leaf, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailsPage() {
  const params = useParams<{slug:string}>();
  const product = useMemo(() => products.find((p) => p.slug === params.slug), [params.slug]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  if (!product) return <div className="page-content empty-state"><h2>Product not found</h2><Link className="button button-primary" href="/shop">Back to Shop</Link></div>;
  return <div className="page-content"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.name}</div><div className="product-detail"><div className="product-detail-image"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="product-detail-copy"><span className="section-kicker">{product.category}</span><h1>{product.name}</h1><div className="rating-stars">★★★★★ <small>({product.reviews} reviews)</small></div><div className="product-detail-price">{product.price} SEK</div><p>{product.description}</p><div className="detail-divider"/><strong>Material</strong><p>{product.material} · Precision 3D printed</p><strong>Colour</strong><div className="color-options">{product.colors.map((color, i) => <button key={color} aria-label={`Select colour ${i+1}`} onClick={() => setSelectedColor(i)} style={{background:color, outline: selectedColor === i ? "2px solid #075b45" : "1px solid #c8cec6"}} />)}</div><strong>Quantity</strong><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1,quantity-1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity+1)}>+</button></div><div className="product-detail-actions"><button className="button button-primary" onClick={() => addToCart(product,quantity)}>Add to Cart <ArrowRight size={16}/></button><button className="button button-outline" onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={isWishlisted(product.id)?"currentColor":"none"}/> {isWishlisted(product.id)?"Saved":"Add to Wishlist"}</button></div><div className="product-service-points"><span><Leaf/> Sustainable materials</span><span><Truck/> Delivery across Europe</span><span><ShieldCheck/> Secure checkout</span></div></div></div><section className="related-section"><div className="section-heading"><h2>You May Also Like</h2><Link href="/shop" className="text-link">View All <ArrowRight size={15}/></Link></div><div className="shop-products-grid related-grid">{products.filter((p)=>p.id!==product.id).slice(0,4).map((p)=><ProductCard key={p.id} product={p}/>)}</div></section></div>;
}
