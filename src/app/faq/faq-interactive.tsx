"use client";

import { useState, useMemo, useDeferredValue, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, Mail } from "lucide-react";
import { Accordion } from "@/components/ui/accordion/accordion";
import { Button } from "@/components/ui/button";
import { logFaqSearch } from "@/lib/analytics";
import type { FAQ, FAQCategory } from "@/types/blog";

interface FAQInteractiveProps {
	categories: FAQCategory[];
	initialSearchQuery?: string;
}

type FlatFAQ = FAQ & { categoryId: string; categoryName: string };

function normalize(str: string): string {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function FAQInteractive({
	categories,
	initialSearchQuery,
}: FAQInteractiveProps) {
	const router = useRouter();
	const [search, setSearch] = useState(initialSearchQuery ?? "");
	const deferredSearch = useDeferredValue(search);
	const isFirstRender = useRef(true);
	const lastLoggedQuery = useRef("");

	// Build flat corpus for Fuse.js
	const corpus = useMemo<FlatFAQ[]>(
		() =>
			categories.flatMap((cat) =>
				cat.questions.map((q) => ({
					...q,
					categoryId: cat.id,
					categoryName: cat.name,
				})),
			),
		[categories],
	);

	// Build Fuse index
	const fuse = useMemo(
		() =>
			new Fuse(corpus, {
				keys: [
					{ name: "question", weight: 0.4 },
					{ name: "keywords", weight: 0.3 },
					{ name: "answer", weight: 0.2 },
					{ name: "categoryName", weight: 0.1 },
				],
				threshold: 0.4,
				ignoreLocation: true,
				getFn: (obj, path) => {
					const value = Fuse.config.getFn(obj, path);
					if (Array.isArray(value)) return value.map((v) => normalize(String(v)));
					if (typeof value === "string") return normalize(value);
					return value;
				},
			}),
		[corpus],
	);

	// Filter: Fuse.js fuzzy + direct category substring match, deduped
	const filtered = useMemo(() => {
		const query = deferredSearch.trim();
		if (!query) return categories;

		// Fuzzy per-item matches via Fuse.js
		const fuseResults = fuse.search(normalize(query));
		const matchedIds = new Set(fuseResults.map((r) => r.item.id));

		// Direct category name substring match — surfaces all items in a matching category
		const lowerQuery = query.toLowerCase();
		for (const cat of categories) {
			if (cat.name.toLowerCase().includes(lowerQuery)) {
				for (const q of cat.questions) {
					matchedIds.add(q.id);
				}
			}
		}

		// Rebuild category structure with only matched items
		return categories
			.map((cat) => ({
				...cat,
				questions: cat.questions.filter((q) => matchedIds.has(q.id)),
			}))
			.filter((cat) => cat.questions.length > 0);
	}, [deferredSearch, categories, fuse]);

	// Sync deferred search to URL
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const url = deferredSearch
			? `/faq?q=${encodeURIComponent(deferredSearch)}`
			: "/faq";
		router.replace(url, { scroll: false });
	}, [deferredSearch, router]);

	// Analytics logging
	useEffect(() => {
		const query = deferredSearch.trim();
		if (!query || query === lastLoggedQuery.current) return;

		lastLoggedQuery.current = query;
		const resultCount = filtered.reduce(
			(sum, cat) => sum + cat.questions.length,
			0,
		);
		logFaqSearch(query, resultCount);
	}, [deferredSearch, filtered]);

	const totalResults = filtered.reduce(
		(sum, cat) => sum + cat.questions.length,
		0,
	);
	const totalQuestions = categories.reduce(
		(sum, cat) => sum + cat.questions.length,
		0,
	);
	const isSearching = search.trim().length > 0;

	return (
		<>
			{/* Search */}
			<div className="relative max-w-[560px] mx-auto">
				<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for answers..."
					aria-label="Search frequently asked questions"
					className="w-full h-12 pl-12 pr-12 rounded-md border-[1.5px] border-border-quaternary bg-white font-body text-base text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-brand transition-colors"
				/>
				{search && (
					<button
						type="button"
						onClick={() => setSearch("")}
						aria-label="Clear search"
						className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-text-tertiary hover:text-text-primary"
					>
						<X className="h-5 w-5" />
					</button>
				)}
			</div>

			{/* Search results indicator */}
			{isSearching && (
				<p className="text-center font-body text-sm text-text-secondary mt-4">
					{totalResults === 0
						? "No results found. Try a different search term."
						: `Showing ${totalResults} of ${totalQuestions} questions`}
				</p>
			)}

			{/* FAQ Categories */}
			<div className="mt-10 lg:mt-14 flex flex-col gap-10 lg:gap-14">
				{filtered.map((category) => (
					<section key={category.id}>
						<h2 className="font-heading font-bold text-xl lg:text-2xl text-text-primary mb-4">
							{category.name}
						</h2>
						<Accordion items={category.questions} />
					</section>
				))}
			</div>

			{/* No results — show contact */}
			{isSearching && totalResults === 0 && (
				<div className="text-center mt-10 p-8 rounded-md border-[1.5px] border-border-quaternary">
					<p className="font-heading font-semibold text-lg text-text-primary mb-2">
						Can&apos;t find what you&apos;re looking for?
					</p>
					<p className="font-body text-base text-text-secondary mb-4">
						Our team is happy to help with any questions.
					</p>
					<a href="mailto:hello@cognitoedu.org">
						<Button variant="secondary" icon={<Mail className="h-4 w-4" />}>
							hello@cognitoedu.org
						</Button>
					</a>
				</div>
			)}

			{/* Contact CTA — always show when not searching */}
			{!isSearching && (
				<div className="text-center mt-14 lg:mt-20 pt-10 border-t border-border-quaternary">
					<p className="font-heading font-bold text-xl lg:text-2xl text-text-primary mb-2">
						Still have questions?
					</p>
					<p className="font-body text-base text-text-secondary mb-5">
						We&apos;re here to help. Reach out and we&apos;ll get back to you as
						soon as we can.
					</p>
					<a href="mailto:hello@cognitoedu.org">
						<Button variant="secondary" icon={<Mail className="h-4 w-4" />}>
							Contact us
						</Button>
					</a>
				</div>
			)}
		</>
	);
}
