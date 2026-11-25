
"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

import BrandMark from "@/components/shared/BrandMark";
import { useStore } from "@/context/StoreContext";
import LiveProductSearch from "@/components/search/LiveProductSearch";

const navLinks = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Custom Print", "/custom-print"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { cartCount, wishlist } = useStore();

  return (
    <header className="site-header">
      <div className="navbar-shell">

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button icon-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          className="logo-link"
          aria-label="RD Nordfab home"
        >
          <BrandMark />
        </Link>

        {/* Navigation Links */}
        <nav
          className="main-nav"
          aria-label="Main navigation"
        >
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">

          {/* LIVE PRODUCT SEARCH */}
          <div
            id="navbar-product-search"
            className={`navbar-live-search ${
              searchOpen
                ? "navbar-live-search--open"
                : ""
            }`}
          >
            <LiveProductSearch />
          </div>

          {/* Mobile Search Button */}
          <button
            type="button"
            className="icon-button mobile-search-toggle"
            onClick={() =>
              setSearchOpen((prev) => !prev)
            }
            aria-label={
              searchOpen
                ? "Close search"
                : "Open product search"
            }
            aria-expanded={searchOpen}
            aria-controls="navbar-product-search"
          >
            {searchOpen ? (
              <X size={22} />
            ) : (
              <Search size={22} />
            )}
          </button>

          {/* Account */}
          <Link
            href="/account"
            className="icon-button header-user"
            aria-label="My account"
          >
            <UserRound
              size={23}
              strokeWidth={1.7}
            />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="icon-button header-wishlist"
            aria-label="Wishlist"
          >
            <Heart
              size={25}
              strokeWidth={1.7}
            />
            <b>{wishlist.length}</b>
          </Link>

          {/* Shopping Cart */}
          <Link
            href="/cart"
            className="icon-button header-cart"
            aria-label="Shopping cart"
          >
            <ShoppingCart
              size={26}
              strokeWidth={1.7}
            />
            <b>{cartCount}</b>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="mobile-menu-extra">
            <Link href="/account">
              My Account
            </Link>

            <Link href="/wishlist">
              Wishlist ({wishlist.length})
            </Link>

            <Link href="/cart">
              Cart ({cartCount})
            </Link>

            <span>EN / SV</span>
          </div>
        </div>
      )}
    </header>
  );
}
