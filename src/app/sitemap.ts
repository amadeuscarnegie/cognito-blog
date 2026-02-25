import type { MetadataRoute } from "next";
import { themes } from "@/lib/content-data";
import { BASE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1.0,
		},
		...themes.map((theme) => ({
			url: `${BASE_URL}/blog/theme/${theme.slug}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})),
	];
}
