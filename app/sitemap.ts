import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/we", "/smm", "/contacts", "/academy/apply", "/privacy", "/cookies", "/terms"];
  return ["", "/ru", "/en"].flatMap((prefix) => paths.map((path) => ({ url: `${siteUrl}${prefix}${path}`, lastModified: new Date("2026-07-17"), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.6 })));
}
