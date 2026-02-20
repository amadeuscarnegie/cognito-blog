import { themes, articles } from "@/lib/mock-data";
import { BlogThemeClient } from "./client";

export default async function BlogThemePage({
	params,
}: {
	params: Promise<{ themeName: string }>;
}) {
	const { themeName } = await params;

	const currentTheme =
		themes.find((t) => t.slug === themeName) ?? themes[0];

	const filteredArticles =
		themeName === "all"
			? articles
			: articles.filter(
					(a) => a.theme.toLowerCase() === currentTheme.name.toLowerCase(),
				);

	return <BlogThemeClient currentTheme={currentTheme} articles={filteredArticles} />;
}
