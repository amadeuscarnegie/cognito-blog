"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Heading } from "@/lib/extract-headings";

interface TableOfContentsProps {
	headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [activeId, setActiveId] = useState<string>("");
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const headingElements = headings
			.map((h) => document.getElementById(h.id))
			.filter(Boolean) as HTMLElement[];

		if (headingElements.length === 0) return;

		observerRef.current = new IntersectionObserver(
			(entries) => {
				// Find the first heading that is intersecting (visible)
				const visible = entries.find((e) => e.isIntersecting);
				if (visible) {
					setActiveId(visible.target.id);
				}
			},
			{ rootMargin: "-80px 0px -60% 0px", threshold: 0 },
		);

		for (const el of headingElements) {
			observerRef.current.observe(el);
		}

		return () => observerRef.current?.disconnect();
	}, [headings]);

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
				<span className="font-heading font-semibold text-lg">Contents</span>
				{isOpen ? (
					<ChevronUp className="w-5 h-5 text-text-secondary" />
				) : (
					<ChevronDown className="w-5 h-5 text-text-secondary" />
				)}
			</button>

			{isOpen && (
				<ul className="mt-4 flex flex-col gap-1">
					{headings.map((heading) => {
						const isActive = activeId === heading.id;
						const isH3 = heading.level === 3;

						return (
							<li key={heading.id}>
								<button
									type="button"
									onClick={() => handleClick(heading.id)}
									className={cn(
										"text-left w-full py-1.5 text-sm transition-colors border-l-[3px]",
										isH3 ? "pl-7" : "pl-3",
										isH3
											? "font-body font-normal text-text-secondary border-transparent"
											: "font-body font-medium",
										isActive && !isH3
											? "border-border-brand text-border-brand"
											: !isH3
												? "border-transparent text-text-primary hover:text-border-brand"
												: "border-transparent hover:text-text-primary",
									)}
								>
									{heading.text}
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</nav>
	);
}
