import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/smm", "/contacts", "/academy/apply", "/privacy", "/cookies", "/terms"];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: path === "" ? 1 : 0.6 }));
}
