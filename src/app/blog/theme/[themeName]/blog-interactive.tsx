"use client";

import { useState, useMemo, useDeferredValue, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BlogHero } from "@/components/blog-hero/blog-hero";
import { ArticlesGrid } from "@/components/articles-grid/articles-grid";
import { themes } from "@/lib/content-data";
import type { Article, Theme, ThemeFilterSlug } from "@/types/blog";

interface BlogInteractiveProps {
	initialTheme: Theme;
	allArticles: Article[];
	initialSearchQuery?: string;
}

export function BlogInteractive({
	initialTheme,
	allArticles,
	initialSearchQuery,
}: BlogInteractiveProps) {
	const router = useRouter();
	const [activeTheme, setActiveTheme] = useState<ThemeFilterSlug>(initialTheme.slug);
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery ?? "");
	const deferredSearchQuery = useDeferredValue(searchQuery);
	const isFirstRender = useRef(true);

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

	// Sync deferred search query to the URL so search is URL-addressable
	useEffect(() => {
		// Skip the first render — the URL already reflects the initial state
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const path = `/blog/theme/${activeTheme}`;
		const url = deferredSearchQuery
			? `${path}?q=${encodeURIComponent(deferredSearchQuery)}`
			: path;
		router.replace(url, { scroll: false });
	}, [deferredSearchQuery, activeTheme, router]);

	const handleThemeChange = (slug: ThemeFilterSlug) => {
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
