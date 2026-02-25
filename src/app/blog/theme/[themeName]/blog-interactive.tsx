"use client";

import { useState, useMemo, useDeferredValue } from "react";
import { useRouter } from "next/navigation";
import { BlogHero } from "@/components/blog-hero/blog-hero";
import { ArticlesGrid } from "@/components/articles-grid/articles-grid";
import { themes } from "@/lib/content-data";
import type { Article, Theme } from "@/types/blog";

interface BlogInteractiveProps {
	initialTheme: Theme;
	allArticles: Article[];
}

export function BlogInteractive({
	initialTheme,
	allArticles,
}: BlogInteractiveProps) {
	const router = useRouter();
	const [activeTheme, setActiveTheme] = useState(initialTheme.slug);
	const [searchQuery, setSearchQuery] = useState("");
	const deferredSearchQuery = useDeferredValue(searchQuery);

	const currentTheme = useMemo(
		() => themes.find((t) => t.slug === activeTheme) ?? themes[0]!,
		[activeTheme],
	);

	const filteredArticles = useMemo(() => {
		let result = allArticles;

		if (activeTheme !== "all") {
			result = result.filter((a) => a.themeSlug === activeTheme);
		}

		if (deferredSearchQuery) {
			result = result.filter((a) =>
				a.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()),
			);
		}

		return result;
	}, [allArticles, activeTheme, deferredSearchQuery]);

	const handleThemeChange = (slug: string) => {
		setActiveTheme(slug);
		setSearchQuery("");
		router.replace(`/blog/theme/${slug}`, { scroll: false });
	};

	return (
		<>
			<BlogHero
				currentTheme={currentTheme}
				activeThemeSlug={activeTheme}
				onThemeChange={handleThemeChange}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
			/>
			<ArticlesGrid
				articles={filteredArticles}
				tabId={`blog-tab-${activeTheme}`}
			/>
		</>
	);
}
