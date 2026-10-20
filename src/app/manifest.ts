import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gbekeloluwa Odutuga, Product Designer",
    short_name: "gb.",
    start_url: "/",
    display: "browser",
    background_color: "#ECE7DE",
    theme_color: "#6B2A3A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
