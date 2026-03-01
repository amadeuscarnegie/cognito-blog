"use client";

import {
	useState,
	useMemo,
	useDeferredValue,
	useEffect,
	useRef,
	useCallback,
} from "react";
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
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Controlled accordion state — which item is open (empty string = none)
	const [openItemId, setOpenItemId] = useState("");

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

	// Build Fuse index — threshold tightened from 0.4 → 0.3
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

	// Ranked search results for the dropdown
	const searchResults = useMemo(() => {
		const query = deferredSearch.trim();
		if (!query) return [];

		// Fuzzy per-item matches via Fuse.js (already ranked by score)
		const fuseResults = fuse.search(normalize(query));
		const seen = new Set<string>();
		const results: FlatFAQ[] = [];

		// Add Fuse results first (ranked)
		for (const r of fuseResults) {
			if (!seen.has(r.item.id)) {
				seen.add(r.item.id);
				results.push(r.item);
			}
		}

		// Direct category name substring match — append items not already matched
		const lowerQuery = query.toLowerCase();
		for (const cat of categories) {
			if (cat.name.toLowerCase().includes(lowerQuery)) {
				for (const q of cat.questions) {
					if (!seen.has(q.id)) {
						seen.add(q.id);
						results.push({
							...q,
							categoryId: cat.id,
							categoryName: cat.name,
						});
					}
				}
			}
		}

		return results.slice(0, 8);
	}, [deferredSearch, categories, fuse]);

	const isSearching = search.trim().length > 0;
	const totalQuestions = categories.reduce(
		(sum, cat) => sum + cat.questions.length,
		0,
	);

	// Handle clicking a search result
	const handleResultClick = useCallback((item: FlatFAQ) => {
		setSearch("");
		setOpenItemId(item.id);

		// Wait for accordion to open, then scroll
		requestAnimationFrame(() => {
			const element = document.getElementById(item.id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		});
	}, []);

	// Close dropdown on Escape and click outside
	useEffect(() => {
		if (!isSearching) return;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setSearch("");
				inputRef.current?.blur();
			}
		}

		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node) &&
				inputRef.current &&
				!inputRef.current.contains(e.target as Node)
			) {
				setSearch("");
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSearching]);

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
		logFaqSearch(query, searchResults.length);
	}, [deferredSearch, searchResults.length]);

	return (
		<>
			{/* Search with dropdown */}
			<div className="relative max-w-[560px] mx-auto">
				<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
				<input
					ref={inputRef}
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

				{/* Search results dropdown */}
				{isSearching && (
					<div
						ref={dropdownRef}
						className="absolute top-full left-0 right-0 mt-2 bg-white border-[1.5px] border-border-quaternary rounded-md shadow-lg z-50 overflow-hidden"
					>
						{searchResults.length > 0 ? (
							<>
								<div className="px-4 py-2.5 border-b border-border-quaternary">
									<p className="font-body text-sm text-text-secondary">
										Showing {searchResults.length} of {totalQuestions} questions
									</p>
								</div>
								<ul className="max-h-[400px] overflow-y-auto">
									{searchResults.map((item) => (
										<li key={item.id}>
											<button
												type="button"
												onClick={() => handleResultClick(item)}
												className="w-full text-left px-4 py-3 hover:bg-bg-secondary transition-colors cursor-pointer"
											>
												<span className="block font-heading font-semibold text-base text-text-primary leading-snug">
													{item.question}
												</span>
												<span className="block font-body text-sm text-text-tertiary mt-0.5">
													{item.categoryName}
												</span>
											</button>
										</li>
									))}
								</ul>
							</>
						) : (
							<div className="px-4 py-6 text-center">
								<p className="font-body text-sm text-text-secondary mb-3">
									No results found. Try a different search term.
								</p>
								<a href="mailto:hello@cognitoedu.org">
									<Button
										variant="secondary"
										icon={<Mail className="h-4 w-4" />}
									>
										hello@cognitoedu.org
									</Button>
								</a>
							</div>
						)}
					</div>
				)}
			</div>

			{/* FAQ Categories — always show all */}
			<div className="mt-10 lg:mt-14 flex flex-col gap-10 lg:gap-14">
				{categories.map((category) => (
					<section key={category.id}>
						<h2 className="font-heading font-bold text-xl lg:text-2xl text-text-primary mb-4">
							{category.name}
						</h2>
						<Accordion
							items={category.questions}
							value={openItemId}
							onValueChange={setOpenItemId}
						/>
					</section>
				))}
			</div>

			{/* Contact CTA — always visible */}
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
		</>
	);
}
