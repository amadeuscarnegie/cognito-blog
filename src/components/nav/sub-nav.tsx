"use client";

import { useRef, useEffect } from "react";
import { SubNavHeader } from "./sub-nav-header";
import { SubNavSection } from "./sub-nav-section";
import { subNavSections } from "@/lib/nav-data";

interface SubNavProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SubNav({ isOpen, onClose }: SubNavProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		}
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				onClose();
			}
		}
		// Defer listener registration so the opening click doesn't immediately trigger close
		const id = requestAnimationFrame(() => {
			document.addEventListener("mousedown", handleClickOutside);
		});
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			cancelAnimationFrame(id);
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			ref={ref}
			role="menu"
			className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] sm:w-[420px] bg-bg-surface rounded-lg shadow-[0_20px_60px_var(--color-shadow)] border border-nav-border overflow-hidden z-50"
		>
			<SubNavHeader onBack={onClose} breadcrumb="Find my course" />
			<div className="max-h-[400px] overflow-y-auto">
				{subNavSections.map((section) => (
					<SubNavSection
						key={section.label}
						label={section.label}
						items={section.items}
					/>
				))}
			</div>
		</div>
	);
}
