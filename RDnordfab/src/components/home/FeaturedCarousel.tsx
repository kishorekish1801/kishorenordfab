"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface FeaturedCarouselProps {
  products: Product[];
  isSectionHovered?: boolean;
}

export default function FeaturedCarousel({
  products,
  isSectionHovered = false,
}: FeaturedCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // Position and animation refs for 60/120fps RAF loop
  const offsetRef = useRef<number>(0);
  const groupWidthRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const isFocusedRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const momentumVelocityRef = useRef<number>(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Drag tracking
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const justDraggedRef = useRef<boolean>(false);
  const pointerHistoryRef = useRef<Array<{ x: number; time: number }>>([]);

  // Listen to mouse enter/leave on the parent section for instant pause
  useEffect(() => {
    const section = containerRef.current?.closest(".featured-section") as HTMLElement | null;
    if (!section) return;

    const onEnter = () => {
      isHoveredRef.current = true;
    };
    const onLeave = () => {
      isHoveredRef.current = false;
    };

    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Handle Resize & Measurements
  useEffect(() => {
    const updateMeasurements = () => {
      if (!groupRef.current || !trackRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.getBoundingClientRect().width;
      containerRef.current.style.setProperty(
        "--carousel-viewport-width",
        `${containerWidth}px`
      );

      const groupRect = groupRef.current.getBoundingClientRect();
      const style = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(style.columnGap || style.gap || "13") || 13;
      const totalGroupWidth = groupRect.width + gap;

      if (totalGroupWidth > 0) {
        const oldGroupWidth = groupWidthRef.current;
        groupWidthRef.current = totalGroupWidth;

        if (oldGroupWidth === 0) {
          // Initialize at Group 1 position (-totalGroupWidth)
          offsetRef.current = -totalGroupWidth;
        } else if (oldGroupWidth !== totalGroupWidth) {
          // Maintain relative progress on resize
          const relativePos = (offsetRef.current + oldGroupWidth) / oldGroupWidth;
          offsetRef.current = -totalGroupWidth + relativePos * totalGroupWidth;
        }

        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (groupRef.current) resizeObserver.observe(groupRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [products]);

  // Reduced motion media query listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Continuous RAF animation loop
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    // Elegant, slow Scandinavian pace (~28 pixels per second)
    const SPEED_PX_PER_SEC = 28;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.064);
      lastTime = now;

      const W = groupWidthRef.current;

      if (trackRef.current && W > 0) {
        if (isDraggingRef.current) {
          // Track is directly manipulated in onPointerMove
        } else if (Math.abs(momentumVelocityRef.current) > 2) {
          // Smooth coasting friction after flick/swipe
          offsetRef.current += momentumVelocityRef.current * dt;
          momentumVelocityRef.current *= Math.pow(0.88, dt / 0.016);

          while (offsetRef.current <= -2 * W) offsetRef.current += W;
          while (offsetRef.current > -W) offsetRef.current -= W;

          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        } else {
          momentumVelocityRef.current = 0;

          const isPaused =
            isHoveredRef.current ||
            isFocusedRef.current ||
            isInteractingRef.current ||
            prefersReducedMotionRef.current;

          if (!isPaused) {
            // Smooth movement from right to left
            offsetRef.current -= SPEED_PX_PER_SEC * dt;

            // Seamless wrap: Group 1 starts at -W and moves towards -2W
            while (offsetRef.current <= -2 * W) {
              offsetRef.current += W;
            }
            while (offsetRef.current > -W) {
              offsetRef.current -= W;
            }

            trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Pointer / Touch Handlers
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    pointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragStartOffsetRef.current = offsetRef.current;
    hasMovedRef.current = false;
    isDraggingRef.current = false;
    isInteractingRef.current = true;
    momentumVelocityRef.current = 0;

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    pointerHistoryRef.current = [{ x: e.clientX, time: performance.now() }];
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - dragStartXRef.current;
    const dy = e.clientY - dragStartYRef.current;

    if (!isDraggingRef.current) {
      // Natural vertical page scroll detection
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
        pointerIdRef.current = null;
        isInteractingRef.current = false;
        return;
      }

      // Horizontal swipe detected
      if (Math.abs(dx) > 7) {
        isDraggingRef.current = true;
        hasMovedRef.current = true;
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          // ignore if capture fails
        }
      }
    }

    if (isDraggingRef.current && trackRef.current && groupWidthRef.current > 0) {
      const W = groupWidthRef.current;
      let newOffset = dragStartOffsetRef.current + dx;

      // Wrap during active drag to allow infinite dragging in either direction
      while (newOffset <= -2 * W) {
        newOffset += W;
        dragStartOffsetRef.current += W;
      }
      while (newOffset > -W) {
        newOffset -= W;
        dragStartOffsetRef.current -= W;
      }

      offsetRef.current = newOffset;
      trackRef.current.style.transform = `translate3d(${newOffset}px, 0, 0)`;

      const now = performance.now();
      pointerHistoryRef.current.push({ x: e.clientX, time: now });
      pointerHistoryRef.current = pointerHistoryRef.current.filter(
        (p) => now - p.time <= 120
      );
    }
  }, []);

  const finishDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    if (isDraggingRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 80);

      // Calculate release velocity for momentum glide
      const history = pointerHistoryRef.current;
      if (history.length >= 2) {
        const oldest = history[0];
        const newest = history[history.length - 1];
        const timeDiff = (newest.time - oldest.time) / 1000;
        if (timeDiff > 0.015) {
          const vel = (newest.x - oldest.x) / timeDiff;
          momentumVelocityRef.current = Math.max(-1200, Math.min(1200, vel));
        }
      }
    }

    pointerIdRef.current = null;
    isDraggingRef.current = false;

    // Resume automatic movement 1.2s after user interaction ends
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  }, []);

  // Suppress accidental click navigation after drag
  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (justDraggedRef.current || hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // Keyboard navigation
  const handleFocusCapture = useCallback((e: React.FocusEvent) => {
    isFocusedRef.current = true;

    const card = (e.target as HTMLElement).closest(".product-card") as HTMLElement;
    if (card && containerRef.current && trackRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      if (cardRect.left < containerRect.left) {
        offsetRef.current += containerRect.left - cardRect.left;
      } else if (cardRect.right > containerRect.right) {
        offsetRef.current -= cardRect.right - containerRect.right;
      }

      const W = groupWidthRef.current;
      if (W > 0) {
        while (offsetRef.current <= -2 * W) offsetRef.current += W;
        while (offsetRef.current > -W) offsetRef.current -= W;
      }

      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  }, []);

  const handleBlurCapture = useCallback((e: React.FocusEvent) => {
    if (
      !containerRef.current ||
      !containerRef.current.contains(e.relatedTarget as Node | null)
    ) {
      isFocusedRef.current = false;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="featured-carousel-container"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Products Carousel"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onClickCapture={handleClickCapture}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        if (!isSectionHovered) {
          isHoveredRef.current = false;
        }
      }}
    >
      <div
        ref={trackRef}
        className="featured-carousel-track"
      >
        {/* Clone Group 0: enables seamless drag to the right and infinite wrap */}
        <div className="featured-carousel-group" aria-hidden="true">
          {products.map((product) => (
            <ProductCard
              key={`clone0-${product.id}`}
              product={product}
              isClone={true}
            />
          ))}
        </div>

        {/* Primary Group 1: accessible controls for screen readers and keyboard users */}
        <div
          ref={groupRef}
          className="featured-carousel-group"
          role="group"
          aria-label="Featured Products"
        >
          {products.map((product) => (
            <ProductCard
              key={`prod-${product.id}`}
              product={product}
              isClone={false}
            />
          ))}
        </div>

        {/* Clone Group 2: enables seamless infinite continuous loop to the left */}
        <div className="featured-carousel-group" aria-hidden="true">
          {products.map((product) => (
            <ProductCard
              key={`clone2-${product.id}`}
              product={product}
              isClone={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
