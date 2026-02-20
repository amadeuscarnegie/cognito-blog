"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/nav/nav";
import { BlogHero } from "@/components/blog-hero/blog-hero";
import { ArticlesGrid } from "@/components/articles-grid/articles-grid";
import { SectionDivider } from "@/components/layout/section-divider";
import { FAQsSection } from "@/components/faqs/faqs-section";
import { FooterCTA } from "@/components/footer-cta/footer-cta";
import { Footer } from "@/components/footer/footer";
import type { Article, Theme } from "@/types/blog";

interface BlogThemeClientProps {
	currentTheme: Theme;
	articles: Article[];
}

export function BlogThemeClient({
	currentTheme,
	articles,
}: BlogThemeClientProps) {
	const router = useRouter();
	const [activeTheme, setActiveTheme] = useState(currentTheme.slug);
	const [searchQuery, setSearchQuery] = useState("");

	// Simple fuzzy search - check if all characters in query appear in order in the title
	const fuzzyMatch = (title: string, query: string): boolean => {
		if (!query) return true;
		const lower = title.toLowerCase();
		const q = query.toLowerCase();
		let qi = 0;
		for (let i = 0; i < lower.length && qi < q.length; i++) {
			if (lower[i] === q[qi]) qi++;
		}
		return qi === q.length;
	};

	const filteredArticles = articles.filter((a) => fuzzyMatch(a.title, searchQuery));

	const handleThemeChange = (slug: string) => {
		setActiveTheme(slug);
		router.push(`/blog/theme/${slug}`);
	};

	const handleLinkClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		const anchor = target.closest("a");
		if (anchor && anchor.href) {
			e.preventDefault();
			const url = new URL(anchor.href, window.location.origin);
			alert(`This would navigate to: ${url.pathname}`);
		}
	};

	return (
		<div onClick={handleLinkClick}>
			<Nav />
			<main>
				<BlogHero
					currentTheme={currentTheme}
					activeThemeSlug={activeTheme}
					onThemeChange={handleThemeChange}
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
				/>
				<ArticlesGrid articles={filteredArticles} />
				<SectionDivider />
				<FAQsSection />
				<FooterCTA />
			</main>
			<Footer />
		</div>
	);
}
