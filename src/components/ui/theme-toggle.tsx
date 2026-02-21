"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const cycle = { system: "light", light: "dark", dark: "system" } as const;

export function ThemeToggle() {
	const { theme, setTheme, mounted } = useTheme();

	const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
	const label =
		theme === "dark" ? "Dark mode" : theme === "light" ? "Light mode" : "System theme";

	return (
		<button
			type="button"
			onClick={() => setTheme(cycle[theme])}
			className="inline-flex items-center justify-center w-9 h-9 rounded-sm text-text-primary hover:bg-bg-subtle cursor-pointer transition-colors"
			aria-label={label}
			title={label}
		>
			{mounted && <Icon className="h-[18px] w-[18px]" />}
		</button>
	);
}
