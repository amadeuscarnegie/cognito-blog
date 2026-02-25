"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FooterMainColumns, FooterCourseColumns } from "./footer-links";
import { FooterSocial } from "./footer-social";

const languages = ["English", "Spanish", "French", "German", "Portuguese"];

function LanguageSelector() {
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

export function Footer() {
	return (
		<footer className="px-5 pb-5">
			<div className="mx-auto rounded-2xl bg-footer-bg px-6 py-10 lg:px-12 lg:py-12 overflow-hidden">
				{/* Top section: brand + main link columns */}
				<div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
					{/* Brand column */}
					<div className="flex flex-col gap-5 lg:w-[280px] shrink-0">
						<div className="flex items-center gap-2">
							<Image
								src="/assets/Logo.svg"
								alt="Cognito"
								width={32}
								height={32}
								className="w-8 h-8 brightness-0 invert"
							/>
							<span className="font-body font-bold text-lg tracking-wide text-white uppercase">
								Cognito
							</span>
						</div>
						<p className="font-body text-sm leading-relaxed text-footer-text">
							Empowering students to achieve their academic goals with expert-designed
							courses and comprehensive learning resources.
						</p>
						<p className="font-body text-xs text-footer-text/60">
							&copy; {new Date().getFullYear()} Cognito. All rights reserved.
						</p>
						<FooterSocial />
						<LanguageSelector />
					</div>

					{/* Main link columns */}
					<div className="flex-1">
						<FooterMainColumns />
					</div>
				</div>

				{/* Divider */}
				<div className="my-10 h-px bg-footer-text/10" />

				{/* Bottom section: artwork + course columns */}
				<div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
					{/* Artwork in the brand column space */}
					<div className="hidden lg:flex lg:w-[280px] shrink-0 items-end">
						<Image
							src="/assets/Brand-building.png"
							alt=""
							aria-hidden="true"
							width={220}
							height={220}
							className="w-[220px] opacity-90"
						/>
					</div>

					{/* Course columns */}
					<div className="flex-1">
						<FooterCourseColumns />
					</div>
				</div>
			</div>
		</footer>
	);
}
