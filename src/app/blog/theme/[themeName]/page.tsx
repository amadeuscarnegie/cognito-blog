import { themes, articles } from "@/lib/mock-data";
import { BlogThemeClient } from "./client";

export default async function BlogThemePage({
	params,
}: {
	params: Promise<{ themeName: string }>;
}) {
	const { themeName } = await params;

	const initialTheme =
		themes.find((t) => t.slug === themeName) ?? themes[0];

	return <BlogThemeClient initialTheme={initialTheme} allArticles={articles} />;
}
