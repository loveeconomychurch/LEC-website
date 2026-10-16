import type { MetadataRoute } from "next"

const routes = [
  "",
  "/about",
  "/business-school",
  "/childrens-ministry",
  "/community-outreach",
  "/events",
  "/give",
  "/groups",
  "/k-church",
  "/letom",
  "/live",
  "/locations",
  "/merch",
  "/prayer",
  "/register-branch",
  "/serve",
  "/teens-church",
  "/visit",
  "/3one6",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `https://loveeconomychurch.org${route || "/"}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
