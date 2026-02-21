"use client";

import { useState, useEffect, useCallback } from "react";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "cognito-theme-preference";

function getSystemTheme(): ResolvedTheme {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: ResolvedTheme) {
	document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function useTheme() {
	const [mounted, setMounted] = useState(false);
	const [theme, setThemeState] = useState<ThemePreference>("system");
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

	// Initialize from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
		const pref = stored === "light" || stored === "dark" ? stored : "system";
		const resolved = pref === "system" ? getSystemTheme() : pref;

		setThemeState(pref);
		setResolvedTheme(resolved);
		applyTheme(resolved);
		setMounted(true);
	}, []);

	// Listen for system preference changes
	useEffect(() => {
		if (theme !== "system") return;

		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) => {
			const resolved = e.matches ? "dark" : "light";
			setResolvedTheme(resolved);
			applyTheme(resolved);
		};

		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, [theme]);

	const setTheme = useCallback((next: ThemePreference) => {
		const resolved = next === "system" ? getSystemTheme() : next;
		localStorage.setItem(STORAGE_KEY, next);
		setThemeState(next);
		setResolvedTheme(resolved);
		applyTheme(resolved);
	}, []);

	return { theme, resolvedTheme, setTheme, mounted } as const;
}
