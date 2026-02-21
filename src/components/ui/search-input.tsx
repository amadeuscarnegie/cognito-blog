"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function SearchInput({ value, onChange, className }: SearchInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const isMac = useSyncExternalStore(
		subscribe,
		() => /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
		() => true,
	);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div
			className={cn(
				"flex h-10 items-center gap-2 rounded-sm bg-search-input-bg px-3 min-w-[200px]",
				className,
			)}
		>
			<Search className="h-4 w-4 shrink-0 text-text-tertiary" />
			<input
				ref={inputRef}
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Search"
				className="flex-1 bg-transparent font-body text-sm font-semibold text-text-primary placeholder:text-text-tertiary outline-none"
			/>
			{value ? (
				<button
					type="button"
					onClick={() => onChange("")}
					aria-label="Clear search"
					className="cursor-pointer text-text-tertiary hover:text-text-primary"
				>
					<X className="h-4 w-4" />
				</button>
			) : (
				<kbd className="font-body text-xs text-text-quaternary">{isMac ? "⌘" : "Ctrl+"}K</kbd>
			)}
		</div>
	);
}
