"use client";

import { useState, useCallback } from "react";
import { NavLogo } from "./nav-logo";
import { NavItem } from "./nav-item";
import { NavMobileToggle } from "./nav-mobile-toggle";
import { SubNav } from "./sub-nav";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems } from "@/lib/nav-data";

export function Nav() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [subNavOpen, setSubNavOpen] = useState(false);
	const handleSubNavClose = useCallback(() => setSubNavOpen(false), []);

	return (
		<header className="sticky top-0 z-50 bg-nav-bg border-b border-nav-border">
			<div className="px-6 lg:px-20 w-full flex items-center justify-between h-[76px]">
				{/* Left */}
				<div className="flex items-center gap-8">
					<NavLogo />
					<nav className="hidden lg:flex items-center gap-6">
						{navItems.map((item) => (
							<div key={item.label} className="relative">
								<NavItem
									label={item.label}
									href={item.hasDropdown ? undefined : item.href}
									hasDropdown={item.hasDropdown}
									isExpanded={item.hasDropdown ? subNavOpen : undefined}
									onClick={
										item.hasDropdown
											? () => setSubNavOpen((prev) => !prev)
											: undefined
									}
								/>
								{item.hasDropdown && (
									<SubNav
										isOpen={subNavOpen}
										onClose={handleSubNavClose}
									/>
								)}
							</div>
						))}
					</nav>
				</div>

				{/* Right - Desktop */}
				<div className="hidden lg:flex items-center gap-3">
					<Button variant="ghost">Sign in</Button>
					<ThemeToggle />
					<Button variant="primary">Sign up</Button>
				</div>

				{/* Right - Mobile */}
				<div className="lg:hidden flex items-center gap-1">
					<ThemeToggle />
					<NavMobileToggle
						isOpen={mobileOpen}
						onToggle={() => setMobileOpen((prev) => !prev)}
					/>
				</div>
			</div>
		</header>
	);
}
