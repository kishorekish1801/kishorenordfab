"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({
  product,
  isClone = false,
}: {
  product: Product;
  isClone?: boolean;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.id);
  return (
    <article className="product-card" aria-hidden={isClone ? "true" : undefined}>
      <div className="product-image-wrap">
        <Link
          href={`/products/${product.slug}`}
          className="product-image-link"
          aria-label={isClone ? undefined : `View ${product.name}`}
          tabIndex={isClone ? -1 : undefined}
        >
          <Image
            src={product.image}
            alt={isClone ? "" : product.name}
            fill
            sizes="(max-width: 680px) 48vw, (max-width: 1100px) 30vw, 19vw"
          />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wish-button ${saved ? "is-saved" : ""}`}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          tabIndex={isClone ? -1 : undefined}
          type="button"
        >
          <Heart size={19} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-card-info">
        <Link
          href={`/products/${product.slug}`}
          className="product-name"
          tabIndex={isClone ? -1 : undefined}
        >
          {product.name}
        </Link>
        <div className="product-card-bottom">
          <div>
            <strong>{product.price} SEK</strong>
            <span className="rating-stars">★★★★★ <small>({product.reviews})</small></span>
          </div>
          <button
            className="add-cart-icon"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            tabIndex={isClone ? -1 : undefined}
            type="button"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
