"use client";

import { useEffect } from "react";

const TARGET_SELECTOR = [
  "main section",
  "main article",
  "main figure",
  "main aside",
  "main details",
  "main form",
  "footer > div > div",
].join(", ");

const OBJECT_SELECTOR = "article, figure, aside, details, form";
const MAX_STAGGER_INDEX = 4;

/**
 * Adds a small, one-time entrance transition to below-fold content without
 * converting the site's server-rendered page tree into Client Components.
 */
export function ScrollAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    let intersectionObserver: IntersectionObserver | undefined;

    const reveal = (element: Element) => {
      element.classList.add("scroll-reveal-visible");
      intersectionObserver?.unobserve(element);
    };

    if ("IntersectionObserver" in window && !reducedMotion.matches) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.06,
        },
      );
    }

    const register = (element: Element) => {
      if (seen.has(element) || element.closest("[data-no-scroll-reveal]")) return;
      seen.add(element);

      const htmlElement = element as HTMLElement;
      const rect = htmlElement.getBoundingClientRect();
      const containsPageHeading = Boolean(htmlElement.querySelector("h1"));
      const isAlreadyInView = rect.top < window.innerHeight * 0.88;

      // Keep the hero and anything already visible at first paint untouched.
      if (containsPageHeading || isAlreadyInView || !intersectionObserver) {
        htmlElement.classList.add("scroll-reveal-visible");
        return;
      }

      htmlElement.classList.add("scroll-reveal");

      if (htmlElement.matches(OBJECT_SELECTOR)) {
        htmlElement.dataset.revealKind = "object";

        const siblings = htmlElement.parentElement
          ? Array.from(htmlElement.parentElement.children).filter((sibling) =>
              sibling.matches(OBJECT_SELECTOR),
            )
          : [];
        const siblingIndex = siblings.indexOf(htmlElement);

        if (siblingIndex > 0) {
          htmlElement.style.setProperty(
            "--reveal-delay",
            `${Math.min(siblingIndex, MAX_STAGGER_INDEX) * 55}ms`,
          );
        }
      }

      intersectionObserver.observe(htmlElement);
    };

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(TARGET_SELECTOR)) register(root);
      root.querySelectorAll(TARGET_SELECTOR).forEach(register);
    };

    scan(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  return null;
}
