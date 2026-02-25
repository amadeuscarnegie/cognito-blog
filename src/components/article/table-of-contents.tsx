"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Heading } from "@/lib/extract-headings";

interface TableOfContentsProps {
	headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [activeId, setActiveId] = useState<string>("");
	const visibleIds = useRef<Set<string>>(new Set());

	const updateActive = useCallback(() => {
		const ids = visibleIds.current;
		if (ids.size === 0) return;

		// Pick the first heading in document order that is currently visible
		for (const h of headings) {
			if (ids.has(h.id)) {
				setActiveId(h.id);
				return;
			}
		}
	}, [headings]);

	useEffect(() => {
		const headingElements = headings
			.map((h) => document.getElementById(h.id))
			.filter(Boolean) as HTMLElement[];

		if (headingElements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleIds.current.add(entry.target.id);
					} else {
						visibleIds.current.delete(entry.target.id);
					}
				}
				updateActive();
			},
			{ rootMargin: "-80px 0px -60% 0px", threshold: 0 },
		);

		for (const el of headingElements) {
			observer.observe(el);
		}

		return () => observer.disconnect();
	}, [headings, updateActive]);

	function handleClick(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	}

	if (headings.length === 0) return null;

	return (
		<nav aria-label="Table of contents">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full"
			>
				<span className="font-heading font-medium text-lg">Contents</span>
				{isOpen ? (
					<ChevronUp className="w-6 h-6 text-text-secondary" />
				) : (
					<ChevronDown className="w-6 h-6 text-text-secondary" />
				)}
			</button>

			{isOpen && (
				<div className="relative mt-4">
					<ul className="flex flex-col max-h-[360px] overflow-y-auto">
						{headings.map((heading) => {
							const isActive = activeId === heading.id;
							const isH3 = heading.level === 3;

							return (
								<li key={heading.id} className="py-[3px]">
									<button
										type="button"
										onClick={() => handleClick(heading.id)}
										className={cn(
											"text-left w-full py-[4px] text-[14px] leading-[1.3] font-body font-semibold transition-colors border-l-[2px]",
											isH3 ? "pl-[16px]" : "pl-[8px]",
											isActive
												? "border-border-brand text-border-brand"
												: "border-transparent text-text-tertiary hover:text-border-brand",
										)}
									>
										{heading.text}
									</button>
								</li>
							);
						})}
					</ul>
					<div className="absolute bottom-0 left-0 right-0 h-[75px] bg-gradient-to-t from-[#fcfbf8] to-transparent pointer-events-none" />
				</div>
			)}
		</nav>
	);
}
