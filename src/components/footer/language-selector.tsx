"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages = ["English", "Spanish", "French", "German", "Portuguese"];

export function LanguageSelector() {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("English");
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const ref = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!open) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				setOpen(true);
				setFocusedIndex(languages.indexOf(selected));
			}
			return;
		}

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setFocusedIndex((i) => (i + 1) % languages.length);
				break;
			case "ArrowUp":
				e.preventDefault();
				setFocusedIndex((i) => (i - 1 + languages.length) % languages.length);
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if (focusedIndex >= 0) {
					const lang = languages[focusedIndex];
					if (lang) setSelected(lang);
					setOpen(false);
				}
				break;
			case "Escape":
				e.preventDefault();
				setOpen(false);
				break;
		}
	};

	return (
		<div ref={ref} className="relative" onKeyDown={handleKeyDown}>
			<button
				type="button"
				onClick={() => {
					const willOpen = !open;
					setOpen(willOpen);
					if (willOpen) setFocusedIndex(languages.indexOf(selected));
				}}
				aria-label="Select language"
				aria-expanded={open}
				aria-haspopup="listbox"
				className="flex items-center gap-2 rounded-lg border border-footer-text/20 px-3 py-1.5 text-sm text-footer-text hover:border-footer-text/40 transition-colors cursor-pointer"
			>
				{selected}
				<ChevronDown className="h-3.5 w-3.5" />
			</button>
			{open && (
				<ul ref={listRef} role="listbox" aria-label="Language options" aria-activedescendant={focusedIndex >= 0 ? `lang-option-${languages[focusedIndex]}` : undefined} className="absolute bottom-full left-0 mb-1 rounded-lg border border-footer-text/20 bg-footer-bg py-1 shadow-lg">
					{languages.map((lang, i) => (
						<li
							key={lang}
							id={`lang-option-${lang}`}
							role="option"
							aria-selected={lang === selected}
							onClick={() => {
								setSelected(lang);
								setOpen(false);
							}}
							className={`w-full px-4 py-1.5 text-left text-sm transition-colors cursor-pointer ${
								lang === selected
									? "text-white"
									: "text-footer-text hover:text-white"
							} ${i === focusedIndex ? "bg-footer-text/10" : ""}`}
						>
							{lang}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
