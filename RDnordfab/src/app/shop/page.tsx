
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { KeyboardEvent } from "react";
import Image from "next/image";

import ProductCard from "@/components/products/ProductCard";
import { categories, products } from "@/data/products";

import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  Check,
  ArrowDownUp,
  Grid3X3,
} from "lucide-react";

// =====================================
// COLOUR OPTIONS
// =====================================

const colorOptions = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Beige", hex: "#c9a67c" },
  { name: "Gray", hex: "#424846" },
  { name: "Black", hex: "#111111" },
  { name: "Green", hex: "#4c775e" },
  { name: "Blue", hex: "#4399d4" },
  { name: "Red", hex: "#db3232" },
];

// =====================================
// PRODUCT COLOUR GROUPS
// =====================================

const colorGroups: Record<string, string[]> = {
  White: [
    "#e9e0d2",
    "#e8ddcb",
    "#e9e2d7",
    "#d7d0c4",
  ],

  Beige: [
    "#d1b69a",
    "#b9a487",
    "#c1b4a2",
    "#ead5b5",
    "#b77b48",
  ],

  Gray: [
    "#7c827c",
    "#858987",
  ],

  Black: [
    "#292c2b",
    "#262a29",
    "#343a37",
    "#202321",
    "#282b29",
    "#343837",
    "#292d2b",
  ],

  Green: [
    "#294a40",
    "#637b65",
    "#6a8271",
  ],

  Blue: [],
  Red: [],
};

// =====================================
// FILTER SECTIONS
// =====================================

const filterSections = [
  "Sort By",
  "Search",
  "Price Range",
  "Category",
  "Material",
  "Color",
  "Availability",
];

// =====================================
// SHOP PAGE COMPONENT
// =====================================

export default function ShopPage() {
  // Product filter states

  const [category, setCategory] = useState("All Products");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [material, setMaterial] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedColor, setSelectedColor] = useState("All");

  // Drawer states

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [expandedSections, setExpandedSections] =
    useState<string[]>([
      "Sort By",
      "Search",
      "Category",
      "Color",
    ]);

  // References

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  // =====================================
  // OPEN / CLOSE DRAWER
  // =====================================

  const openFilters = () => {
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
    triggerRef.current?.focus();
  };

  // =====================================
  // ESCAPE KEY AND SCROLL LOCK
  // =====================================

  useEffect(() => {
    if (!filtersOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [filtersOpen]);

  // =====================================
  // KEYBOARD FOCUS INSIDE DRAWER
  // =====================================

  const handleDrawerKeyDown = (
    event: KeyboardEvent<HTMLElement>
  ) => {
    if (event.key !== "Tab") return;

    const elements = Array.from(
      drawerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    ).filter(
      (element) =>
        !element.closest("[inert]") &&
        element.getClientRects().length > 0
    );

    if (elements.length === 0) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  };

  // =====================================
  // EXPAND FILTER SECTIONS
  // =====================================

  const toggleSection = (section: string) => {
    setExpandedSections((previous) =>
      previous.includes(section)
        ? previous.filter((item) => item !== section)
        : [...previous, section]
    );
  };

  // =====================================
  // RESET FILTERS
  // =====================================

  const clearAll = () => {
    setCategory("All Products");
    setQuery("");
    setSort("featured");
    setMaterial("All");
    setInStockOnly(false);
    setMaxPrice(1000);
    setSelectedColor("All");
  };

  // =====================================
  // SELECT COLOUR
  // =====================================

  const selectColor = (name: string) => {
    setSelectedColor((previous) =>
      previous === name ? "All" : name
    );
  };

  // =====================================
  // LIVE SEARCH + FILTER + SORT
  // =====================================

  const filtered = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    let list = products.filter((product) => {
      // Category

      const matchesCategory =
        category === "All Products" ||
        product.category === category;

      // Live search
      // Match first letters of any word in product name

      const productWords = product.name
        .toLowerCase()
        .split(/\s+/);

      const matchesSearch =
        searchText === "" ||
        productWords.some((word) =>
          word.startsWith(searchText)
        );

      // Material

      const matchesMaterial =
        material === "All" ||
        product.material === material;

      // Stock

      const matchesStock =
        !inStockOnly || product.stock > 0;

      // Price

      const matchesPrice =
        maxPrice === 1000 ||
        product.price <= maxPrice;

      // Color

      const availableColors = product.colors.map(
        (hex) => hex.toLowerCase()
      );

      const selectedColors =
        colorGroups[selectedColor] ?? [];

      const matchesColor =
        selectedColor === "All" ||
        selectedColors.some((hex) =>
          availableColors.includes(hex.toLowerCase())
        );

      return (
        matchesCategory &&
        matchesSearch &&
        matchesMaterial &&
        matchesStock &&
        matchesPrice &&
        matchesColor
      );
    });

    // Sorting: Low to High

    if (sort === "price-low") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    // Sorting: High to Low

    if (sort === "price-high") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    // Sorting: Name

    if (sort === "name") {
      list = [...list].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return list;
  }, [
    category,
    query,
    sort,
    material,
    inStockOnly,
    maxPrice,
    selectedColor,
  ]);

  // =====================================
  // ACTIVE FILTER COUNT
  // =====================================

  const activeCount = [
    category !== "All Products",
    query.trim() !== "",
    sort !== "featured",
    material !== "All",
    inStockOnly,
    maxPrice !== 1000,
    selectedColor !== "All",
  ].filter(Boolean).length;

  // =====================================
  // FILTER SECTION CONTENT
  // =====================================

  const renderSection = (section: string) => {
    switch (section) {
      // SORT BY

      case "Sort By":
        return (
          <div className="nord-sort-section">
            <label htmlFor="nord-sort-select">
              Product order
            </label>

            <select
              id="nord-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">
                Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name">
                Name: A to Z
              </option>
            </select>
          </div>
        );

      // SEARCH

      case "Search":
        return (
          <div>
            <div className="nord-input-search">
              <Search size={18} />

              <input
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                autoComplete="off"
                aria-label="Search products"
              />
            </div>

            {query.trim() !== "" && (
              <p
                aria-live="polite"
                style={{
                  fontSize: "12px",
                  color: "#667d71",
                  marginTop: "12px",
                }}
              >
                {filtered.length} matching{" "}
                {filtered.length === 1
                  ? "product"
                  : "products"}
              </p>
            )}
          </div>
        );

      // PRICE RANGE

      case "Price Range":
        return (
          <div className="nord-price-section">
            <div className="nord-price-values">
              <span>0 SEK</span>

              <strong>
                {maxPrice === 1000
                  ? "1000+ SEK"
                  : `${maxPrice} SEK`}
              </strong>
            </div>

            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              style={{
                background: `linear-gradient(
                  to right,
                  #006348 ${maxPrice / 10}%,
                  #e2e8e3 ${maxPrice / 10}%
                )`,
              }}
              aria-label="Maximum product price"
            />
          </div>
        );

      // CATEGORY

      case "Category":
        return (
          <div className="nord-filter-options">
            {categories.map((item) => (
              <label
                key={item.name}
                className="nord-filter-option"
              >
                <input
                  type="checkbox"
                  checked={category === item.name}
                  onChange={() =>
                    setCategory(
                      category === item.name
                        ? "All Products"
                        : item.name
                    )
                  }
                />

                <span>{item.name}</span>

                <small>{item.count}</small>
              </label>
            ))}
          </div>
        );

      // MATERIAL

      case "Material":
        return (
          <div className="nord-filter-options">
            {["All", "PLA", "PETG", "ABS"].map((item) => (
              <label
                key={item}
                className="nord-filter-option"
              >
                <input
                  type="radio"
                  name="nord-material"
                  checked={material === item}
                  onChange={() =>
                    setMaterial(item)
                  }
                />

                <span>
                  {item === "All"
                    ? "All Materials"
                    : item}
                </span>
              </label>
            ))}
          </div>
        );

      // COLOR - ORIGINAL SEVEN CIRCLES

      case "Color":
        return (
          <div className="nord-simple-color-list">
            {colorOptions.map((color) => {
              const active = selectedColor === color.name;

              return (
                <button
                  key={color.name}
                  type="button"
                  className={`nord-simple-color-btn ${
                    active ? "active" : ""
                  }`}
                  style={{
                    backgroundColor: color.hex,
                  }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={active}
                  onClick={() => selectColor(color.name)}
                >
                  {active && (
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      color={
                        ["White", "Beige"].includes(color.name)
                          ? "#17372c"
                          : "#ffffff"
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        );

      // AVAILABILITY

      case "Availability":
        return (
          <div className="nord-filter-options">
            <label className="nord-filter-option">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) =>
                  setInStockOnly(e.target.checked)
                }
              />

              <span>In Stock Only</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  // =====================================
  // SHOP PAGE JSX
  // =====================================

  return (
    <>
      <header className="catalog-heading page-container"><p className="studio-label">RD NORDFAB / Shop</p><h1>The object collection</h1></header>

      <div className="page-container category-pills">

        {/* ALL PRODUCTS BUTTON */}

        <button
          type="button"
          className={
            category === "All Products"
              ? "category-pill active"
              : "category-pill"
          }
          onClick={() => setCategory("All Products")}
          style={{
            width: "185px",
            minWidth: "185px",
            height: "74px",
            minHeight: "74px",
            flex: "0 0 185px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "0 18px",
            boxSizing: "border-box",
            borderRadius: "40px",
            backgroundColor:
              category === "All Products"
                ? "#F0F5F0"
                : "transparent",
            border:
              category === "All Products"
                ? "1px solid #006348"
                : "1px solid transparent",
            color:
              category === "All Products"
                ? "#006348"
                : "#173B32",
            whiteSpace: "nowrap",
          }}
        >
          <Grid3X3 size={22} strokeWidth={2} />

          <span
            style={{
              fontSize: "14px",
              fontWeight:
                category === "All Products"
                  ? 600
                  : 500,
            }}
          >
            All Products
          </span>
        </button>

        {/* OTHER CATEGORIES */}

        {categories.map((item) => (
          <button
            type="button"
            key={item.name}
            className={
              category === item.name
                ? "category-pill active"
                : "category-pill"
            }
            onClick={() => setCategory(item.name)}
          >
            <Image
              src={item.image}
              alt=""
              width={54}
              height={54}
            />

            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* FULL-WIDTH PRODUCTS */}

      <div className="page-content shop-layout-wrap nord-shop-content">
        <div className="shop-layout nord-shop-layout">
          <section className="nord-product-area">

            {/* FILTER & SORT BUTTON */}

            <div className="nord-toolbar">
              <div className="nord-toolbar-left">
                <button
                  ref={triggerRef}
                  type="button"
                  className="nord-filter-trigger"
                  onClick={openFilters}
                  aria-haspopup="dialog"
                  aria-expanded={filtersOpen}
                  aria-controls="nord-filter-drawer"
                >
                  <SlidersHorizontal size={19} />

                  <span>Filter & Sort</span>

                  {activeCount > 0 && (
                    <span className="nord-active-count">
                      {activeCount}
                    </span>
                  )}
                </button>

                <strong>
                  {category} ({filtered.length})
                </strong>
              </div>
            </div>

            {/* PRODUCT GRID */}

            <div className="shop-products-grid nord-products-grid">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* EMPTY STATE */}

            {filtered.length === 0 && (
              <div className="empty-state">
                <h2>No products found</h2>

                <p>
                  Try another product name or clear
                  the selected filters.
                </p>

                <button
                  type="button"
                  className="nord-apply-button"
                  onClick={clearAll}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* DARK BACKDROP */}

      <button
        type="button"
        aria-label="Close filter panel"
        tabIndex={filtersOpen ? 0 : -1}
        className={`nord-overlay ${
          filtersOpen ? "open" : ""
        }`}
        onClick={closeFilters}
      />

      {/* FILTER & SORT DRAWER */}

      <aside
        ref={drawerRef}
        id="nord-filter-drawer"
        role="dialog"
        aria-modal={filtersOpen ? true : undefined}
        aria-label="Filter and sort products"
        onKeyDown={handleDrawerKeyDown}
        className={`nord-drawer ${
          filtersOpen ? "open" : ""
        }`}
        inert={!filtersOpen}
      >
        {/* DRAWER HEADER */}

        <div className="nord-drawer-header">
          <div className="nord-drawer-heading">
            <SlidersHorizontal size={22} />

            <div>
              <h2>Filter & Sort</h2>
              <p>Find your perfect product</p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="nord-drawer-close"
            onClick={closeFilters}
            aria-label="Close filter drawer"
          >
            <X size={21} />
          </button>
        </div>

        {/* DRAWER FILTER SECTIONS */}

        <div className="nord-drawer-scroll">
          {filterSections.map((section) => {
            const isExpanded =
              expandedSections.includes(section);

            return (
              <div
                key={section}
                className="nord-filter-section"
              >
                <button
                  type="button"
                  className="nord-section-toggle"
                  onClick={() => toggleSection(section)}
                  aria-expanded={isExpanded}
                >
                  <span className="nord-section-title">
                    {section === "Sort By" && (
                      <ArrowDownUp size={16} />
                    )}

                    {section}
                  </span>

                  <ChevronDown
                    size={18}
                    className={
                      isExpanded ? "rotated" : ""
                    }
                  />
                </button>

                <div
                  className={`nord-section-body ${
                    isExpanded ? "open" : ""
                  }`}
                  inert={!isExpanded}
                >
                  <div className="nord-section-inner">
                    {renderSection(section)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DRAWER FOOTER */}

        <div className="nord-drawer-footer">
          <button
            type="button"
            className="nord-clear-button"
            onClick={clearAll}
          >
            <RotateCcw size={16} />
            Clear All
          </button>

          <button
            type="button"
            className="nord-apply-button"
            onClick={closeFilters}
          >
            View {filtered.length} Products
          </button>
        </div>
      </aside>
    </>
  );
}
