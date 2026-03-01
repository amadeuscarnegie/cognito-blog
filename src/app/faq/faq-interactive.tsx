"use client";

import { useState, useMemo } from "react";
import { Search, X, Mail } from "lucide-react";
import { Accordion } from "@/components/ui/accordion/accordion";
import type { FAQCategory } from "@/types/blog";

interface FAQInteractiveProps {
	categories: FAQCategory[];
}

export function FAQInteractive({ categories }: FAQInteractiveProps) {
	const [search, setSearch] = useState("");

	const filtered = useMemo(() => {
		const query = search.toLowerCase().trim();
		if (!query) return categories;

		return categories
			.map((cat) => ({
				...cat,
				questions: cat.questions.filter(
					(q) =>
						q.question.toLowerCase().includes(query) ||
						q.answer.toLowerCase().includes(query),
				),
			}))
			.filter((cat) => cat.questions.length > 0);
	}, [search, categories]);

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
					<a
						href="mailto:hello@cognitoedu.org"
						className="inline-flex items-center gap-2 font-body font-bold text-sm text-text-primary border-[1.5px] border-border-primary rounded-sm px-5 py-3 hover:bg-bg-subtle transition-colors"
					>
						<Mail className="h-4 w-4" />
						hello@cognitoedu.org
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
					<a
						href="mailto:hello@cognitoedu.org"
						className="inline-flex items-center gap-2 font-body font-bold text-sm text-text-primary border-[1.5px] border-border-primary rounded-sm px-5 py-3 hover:bg-bg-subtle transition-colors"
					>
						<Mail className="h-4 w-4" />
						Contact us
					</a>
				</div>
			)}
		</>
	);
}
