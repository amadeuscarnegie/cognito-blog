"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import type { Theme } from "@/types/blog";

interface BlogNavProps {
	themes: Theme[];
	activeTheme: string;
	onThemeChange: (slug: string) => void;
}

export function BlogNav({ themes, activeTheme, onThemeChange }: BlogNavProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		const currentIndex = themes.findIndex((t) => t.slug === activeTheme);
		let nextIndex: number | null = null;

		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				nextIndex = (currentIndex + 1) % themes.length;
				break;
			case "ArrowLeft":
				e.preventDefault();
				nextIndex = (currentIndex - 1 + themes.length) % themes.length;
				break;
			case "Home":
				e.preventDefault();
				nextIndex = 0;
				break;
			case "End":
				e.preventDefault();
				nextIndex = themes.length - 1;
				break;
		}

		if (nextIndex !== null) {
			onThemeChange(themes[nextIndex].slug);
			const btn = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex];
			btn?.focus();
		}
	};

	return (
		<nav className="flex items-center gap-1 overflow-x-auto" role="tablist" onKeyDown={handleKeyDown}>
			{themes.map((theme) => {
				const isActive = theme.slug === activeTheme;
				return (
					<button
						key={theme.slug}
						type="button"
						role="tab"
						id={`blog-tab-${theme.slug}`}
						aria-selected={isActive}
						aria-controls="blog-tabpanel"
						tabIndex={isActive ? 0 : -1}
						onClick={() => onThemeChange(theme.slug)}
						className={cn(
							"relative px-3 py-2 font-body text-sm leading-none whitespace-nowrap cursor-pointer transition-colors",
							isActive
								? "font-semibold text-text-primary"
								: "font-medium text-text-tertiary hover:text-text-secondary",
						)}
					>
						{theme.name}
						{isActive && (
							<motion.div
								layoutId="blog-nav-indicator"
								className="absolute inset-0 bg-bg-secondary rounded-full -z-10"
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 35,
								}}
							/>
						)}
					</button>
				);
			})}
		</nav>
	);
}
