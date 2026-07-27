"use client";

import { useEffect, useId, useRef, useState } from "react";
import { normalizeZip } from "@/lib/estimate/service-area";

export type ParsedPlace = {
  address: string;
  city: string;
  state: string;
  zip: string;
  formattedAddress: string;
  lat: number | null;
  lng: number | null;
};

type AddressAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: ParsedPlace) => void;
  placeholder?: string;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type PlaceResult = {
  address_components?: AddressComponent[];
  formatted_address?: string;
  name?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
};

type GoogleMapsPlaces = {
  maps: {
    places: {
      Autocomplete: new (
        input: HTMLInputElement,
        opts: Record<string, unknown>
      ) => {
        addListener: (event: string, handler: () => void) => void;
        getPlace: () => PlaceResult;
        setBounds: (bounds: unknown) => void;
      };
    };
    LatLngBounds: new (
      sw: { lat: number; lng: number },
      ne: { lat: number; lng: number }
    ) => unknown;
    event: {
      clearInstanceListeners: (instance: unknown) => void;
    };
  };
};

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

declare global {
  interface Window {
    google?: GoogleMapsPlaces;
    __ccMapsLoading?: Promise<void>;
  }
}

function loadMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();
  if (window.__ccMapsLoading) return window.__ccMapsLoading;

  window.__ccMapsLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-cc-maps="1"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Google Maps failed to load"))
      );
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.ccMaps = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return window.__ccMapsLoading;
}

function component(components: AddressComponent[] | undefined, type: string) {
  return components?.find((c) => c.types.includes(type));
}

function parsePlace(place: PlaceResult): ParsedPlace {
  const comps = place.address_components;
  const streetNumber = component(comps, "street_number")?.long_name;
  const route = component(comps, "route")?.long_name;
  const address =
    [streetNumber, route].filter(Boolean).join(" ").trim() ||
    place.name ||
    place.formatted_address?.split(",")[0]?.trim() ||
    "";

  const city =
    component(comps, "locality")?.long_name ??
    component(comps, "postal_town")?.long_name ??
    component(comps, "sublocality")?.long_name ??
    "";

  const state =
    component(comps, "administrative_area_level_1")?.short_name ?? "UT";
  const zip = normalizeZip(component(comps, "postal_code")?.long_name ?? "");

  return {
    address,
    city,
    state,
    zip,
    formattedAddress: place.formatted_address ?? address,
    lat: place.geometry?.location?.lat() ?? null,
    lng: place.geometry?.location?.lng() ?? null,
  };
}

export function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelected,
  placeholder = "123 Main St, Orem UT 84057",
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<{
    addListener: (event: string, handler: () => void) => void;
    getPlace: () => PlaceResult;
    setBounds: (bounds: unknown) => void;
  } | null>(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  const [mapsReady, setMapsReady] = useState(false);
  const inputId = useId();

  useEffect(() => {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  useEffect(() => {
    if (!MAPS_KEY) return;
    let cancelled = false;
    loadMapsScript(MAPS_KEY)
      .then(() => {
        if (!cancelled) setMapsReady(true);
      })
      .catch(() => {
        /* fall back to plain input */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mapsReady || !inputRef.current || !window.google?.maps?.places) return;
    if (autocompleteRef.current) return;

    const g = window.google;
    const ac = new g.maps.places.Autocomplete(inputRef.current, {
      fields: ["address_components", "formatted_address", "geometry", "name"],
      componentRestrictions: { country: "us" },
      types: ["address"],
    });
    ac.setBounds(
      new g.maps.LatLngBounds(
        { lat: 39.85, lng: -112.2 },
        { lat: 41.0, lng: -111.55 }
      )
    );

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place?.address_components) return;
      onPlaceSelectedRef.current(parsePlace(place));
    });

    autocompleteRef.current = ac;

    return () => {
      g.maps.event.clearInstanceListeners(ac);
      autocompleteRef.current = null;
    };
  }, [mapsReady]);

  return (
    <div>
      <input
        id={inputId}
        ref={inputRef}
        className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3 text-chestnut"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={MAPS_KEY ? "off" : "street-address"}
      />
      {MAPS_KEY && mapsReady ? (
        <p className="mt-1 text-xs text-chestnut/50">
          Start typing and pick your address from the suggestions.
        </p>
      ) : null}
    </div>
  );
}

export function streetViewUrl(lat: number, lng: number, size = "640x360") {
  if (!MAPS_KEY) return null;
  const params = new URLSearchParams({
    size,
    location: `${lat},${lng}`,
    fov: "80",
    pitch: "10",
    key: MAPS_KEY,
  });
  return `https://maps.googleapis.com/maps/api/streetview?${params.toString()}`;
}

export function mapsKeyConfigured() {
  return Boolean(MAPS_KEY);
}
