"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, trackSmsClick, trackTelClick } from "@/lib/analytics/track";

function labelFor(anchor: HTMLAnchorElement) {
  return (anchor.textContent || anchor.getAttribute("aria-label") || "").trim().slice(0, 60) || "Link";
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    track("PAGE_VIEW");

    let scroll50 = false;
    let scroll90 = false;
    let ticking = false;
    const checkScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      if (percent >= 50 && !scroll50) {
        scroll50 = true;
        track("SCROLL_DEPTH_50", { scroll_percent: 50 });
      }
      if (percent >= 90 && !scroll90) {
        scroll90 = true;
        track("SCROLL_DEPTH_90", { scroll_percent: 90 });
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(checkScroll);
    };
    const dwellTimer = window.setTimeout(() => track("TIME_ON_PAGE", { seconds: 10 }), 10_000);
    const heartbeat = () => {
      if (document.visibilityState === "visible") track("VISITOR_HEARTBEAT");
    };
    const initialHeartbeat = window.setTimeout(heartbeat, 1000);
    const heartbeatTimer = window.setInterval(heartbeat, 30_000);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", heartbeat);
    return () => {
      window.clearTimeout(dwellTimer);
      window.clearTimeout(initialHeartbeat);
      window.clearInterval(heartbeatTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", heartbeat);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      const label = labelFor(anchor);

      if (/^tel:/i.test(href)) trackTelClick(href, label);
      else if (/^sms:/i.test(href)) trackSmsClick(href, label);
      else if (/^\/(estimate|book|contact|share-the-cheer)(?:[/?#]|$)/.test(href) || (pathname === "/share-the-cheer" && /^#(nominate|partner)$/.test(href))) {
        track("CTA_CLICK", { button_label: label, cta_destination: href });
      }
    };

    const startedForms = new WeakSet<HTMLFormElement>();
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const form = event.target.closest<HTMLFormElement>("form[data-analytics-form]");
      if (!form || startedForms.has(form)) return;
      startedForms.add(form);
      track("FORM_START", { form_name: form.dataset.analyticsForm });
    };

    const onExit = () => track("PAGE_EXIT", {}, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("pagehide", onExit);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("pagehide", onExit);
    };
  }, [pathname]);

  return null;
}
