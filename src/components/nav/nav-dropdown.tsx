"use client";

import { useState, useCallback } from "react";
import { NavItem } from "./nav-item";
import { SubNav } from "./sub-nav";

interface NavDropdownProps {
	label: string;
}

export function NavDropdown({ label }: NavDropdownProps) {
	const [subNavOpen, setSubNavOpen] = useState(false);
	const handleSubNavClose = useCallback(() => setSubNavOpen(false), []);

	return (
		<div className="relative">
			<NavItem
				label={label}
				hasDropdown
				isExpanded={subNavOpen}
				onClick={() => setSubNavOpen((prev) => !prev)}
			/>
			<SubNav isOpen={subNavOpen} onClose={handleSubNavClose} />
		</div>
	);
}
