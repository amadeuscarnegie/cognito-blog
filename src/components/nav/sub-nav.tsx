"use client";

import { useRef, useEffect } from "react";
import { SubNavHeader } from "./sub-nav-header";
import { SubNavSection } from "./sub-nav-section";
import { subNavSections } from "@/lib/mock-data";

interface SubNavProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SubNav({ isOpen, onClose }: SubNavProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			ref={ref}
			className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] sm:w-[420px] bg-white rounded-lg shadow-xl border border-nav-border overflow-hidden z-50"
			style={{ boxShadow: "0 20px 60px rgba(11,60,97,0.15)" }}
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
