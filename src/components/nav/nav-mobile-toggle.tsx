"use client";

import { Menu, X } from "lucide-react";

type NavMobileToggleProps = {
	isOpen: boolean;
	onToggle: () => void;
};

export function NavMobileToggle({ isOpen, onToggle }: NavMobileToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="lg:hidden w-6 h-6 text-text-primary cursor-pointer"
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			{isOpen ? <X size={24} /> : <Menu size={24} />}
		</button>
	);
}
