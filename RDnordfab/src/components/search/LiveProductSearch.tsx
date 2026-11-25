
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";

export default function LiveProductSearch() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);

  // Find matching products immediately while typing
  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return products
      .filter((product) => {
        const name = product.name.toLowerCase();
        const words = name.split(/\s+/);

        return (
          name.includes(search) ||
          words.some((word) => word.startsWith(search))
        );
      })
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(search);
        const bStarts = b.name.toLowerCase().startsWith(search);

        return Number(bStarts) - Number(aStarts);
      })
      .slice(0, 6);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const openProduct = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);

    router.push(`/products/${slug}`);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (results.length === 0) return;

    const selected =
      results[activeIndex >= 0 ? activeIndex : 0];

    openProduct(selected.slug);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    }

    if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="nord-live-search" ref={searchRef}>
      <form
        className="nord-live-search-box"
        onSubmit={handleSearch}
        role="search"
      >
        <Search size={19} className="nord-search-icon" />

        <input
          type="search"
          name="nordfab-product-finder"
          placeholder="Search products..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Search products"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && query.trim().length > 0}
          aria-controls="nord-live-results"
          aria-activedescendant={
            isOpen && activeIndex >= 0
              ? `nord-result-${activeIndex}`
              : undefined
          }
        />

        {query ? (
          <button
            type="button"
            className="nord-search-clear"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              setActiveIndex(-1);
            }}
          >
            <X size={17} />
          </button>
        ) : null}

        <button
          type="submit"
          className="nord-search-submit"
          aria-label="Open matching product"
        >
          <Search size={22} />
        </button>
      </form>

      {/* LIVE SEARCH RESULTS */}
      {isOpen && query.trim() !== "" && (
        <div
          id="nord-live-results"
          className="nord-search-dropdown"
          role="listbox"
          aria-label="Matching products"
        >
          <div className="nord-search-results-header">
            <span>Matching Products</span>
            <small>{results.length} found</small>
          </div>

          {results.length > 0 ? (
            <div className="nord-search-results-list">
              {results.map((product, index) => (
                <Link
                  id={`nord-result-${index}`}
                  key={product.id}
                  href={`/products/${product.slug}`}
                  role="option"
                  aria-selected={activeIndex === index}
                  className={`nord-search-result ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setActiveIndex(-1);
                  }}
                >
                  <div className="nord-result-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                    />
                  </div>

                  <div className="nord-result-info">
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                    <b>{product.price} SEK</b>
                  </div>

                  <span className="nord-result-arrow">›</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="nord-search-no-results">
              <Search size={24} />
              <strong>No products found</strong>
              <p>Try another product name.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
