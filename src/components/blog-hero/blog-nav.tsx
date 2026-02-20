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
	return (
		<nav className="flex items-center gap-1 overflow-x-auto" role="tablist">
			{themes.map((theme) => {
				const isActive = theme.slug === activeTheme;
				return (
					<button
						key={theme.slug}
						type="button"
						role="tab"
						aria-selected={isActive}
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
