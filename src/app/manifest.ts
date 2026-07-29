import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DWSA Tech Academy",
    short_name: "DWSA Academy",
    description:
      "Digital World Systems Africa Ltd — World-class software engineering, AI automation & cloud training. RC 9718724.",
    start_url: "/",
    display: "standalone",
    background_color: "#030e1f",
    theme_color: "#d4a017",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-72.png",   sizes: "72x72",   type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-72.png",   sizes: "72x72",   type: "image/png", purpose: "any" as const },
      { src: "/icons/icon-96.png",   sizes: "96x96",   type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-128.png",  sizes: "128x128", type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-144.png",  sizes: "144x144", type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-152.png",  sizes: "152x152", type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-192.png",  sizes: "192x192", type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-192.png",  sizes: "192x192", type: "image/png", purpose: "any" as const },
      { src: "/icons/icon-384.png",  sizes: "384x384", type: "image/png", purpose: "any" as const },
      { src: "/icons/icon-512.png",  sizes: "512x512", type: "image/png", purpose: "maskable" as const },
      { src: "/icons/icon-512.png",  sizes: "512x512", type: "image/png", purpose: "any" as const },
    ],
    screenshots: [
      {
        src: "/icons/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        // @ts-ignore – form_factor is valid per spec but not yet in TS types
        form_factor: "wide",
        label: "DWSA Academy Student Dashboard",
      },
    ],
  };
}
