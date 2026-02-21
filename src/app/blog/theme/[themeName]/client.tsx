"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Nav } from "@/components/nav/nav";
import { BlogHero } from "@/components/blog-hero/blog-hero";
import { ArticlesGrid } from "@/components/articles-grid/articles-grid";
import { SectionDivider } from "@/components/layout/section-divider";
import { FAQsSection } from "@/components/faqs/faqs-section";
import { FooterCTA } from "@/components/footer-cta/footer-cta";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { themes } from "@/lib/mock-data";
import type { Article, Theme } from "@/types/blog";

interface BlogThemeClientProps {
	initialTheme: Theme;
	allArticles: Article[];
}

export function BlogThemeClient({
	initialTheme,
	allArticles,
}: BlogThemeClientProps) {
	const router = useRouter();
	const [activeTheme, setActiveTheme] = useState(initialTheme.slug);
	const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalPath, setModalPath] = useState("");

	const currentTheme = useMemo(
		() => themes.find((t) => t.slug === activeTheme) ?? themes[0],
		[activeTheme],
	);

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

	const filteredArticles = useMemo(() => {
		let result = allArticles;

		if (activeTheme !== "all") {
			result = result.filter(
				(a) => a.theme.toLowerCase() === currentTheme.name.toLowerCase(),
			);
		}

		if (searchQuery) {
			result = result.filter((a) => fuzzyMatch(a.title, searchQuery));
		}

		return result;
	}, [allArticles, activeTheme, currentTheme.name, searchQuery]);

	const handleThemeChange = (slug: string) => {
		setActiveTheme(slug);
		setSearchQuery("");
		router.replace(`/blog/theme/${slug}`, { scroll: false });
	};

	const handleLinkClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		const anchor = target.closest("a");
		if (anchor && anchor.href) {
			const url = new URL(anchor.href, window.location.origin);
			// Allow theme navigation links to work
			if (url.pathname.startsWith("/blog/theme/")) return;
			e.preventDefault();
			e.stopPropagation();
			setModalPath(url.pathname);
			setModalOpen(true);
		}
	};

	return (
		<Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
			<div onClickCapture={handleLinkClick}>
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
					<div className="hidden lg:block">
						<SectionDivider />
					</div>
					<FooterCTA />
				</main>
				<Footer />
			</div>

			{/* Coming Soon Modal */}
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/40 z-[100] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
				<Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-[400px] bg-white rounded-md p-8 text-center shadow-xl">
					<Dialog.Title className="font-heading font-semibold text-2xl text-text-primary">
						Coming soon
					</Dialog.Title>
					<Dialog.Description className="font-body text-sm text-text-secondary mt-2 leading-[1.6]">
						The page <span className="font-semibold">{modalPath}</span> is not
						available yet. Check back soon!
					</Dialog.Description>
					<div className="mt-6">
						<Button
							variant="primary"
							onClick={() => setModalOpen(false)}
							className="w-full"
						>
							Got it
						</Button>
					</div>
					<Dialog.Close asChild>
						<button
							type="button"
							className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary cursor-pointer"
							aria-label="Close"
						>
							<X className="h-5 w-5" />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
