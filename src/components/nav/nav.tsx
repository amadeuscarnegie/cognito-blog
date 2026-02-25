import { NavLogo } from "./nav-logo";
import { NavItem } from "./nav-item";
import { NavDropdown } from "./nav-dropdown";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/nav-data";

export function Nav() {
	return (
		<header className="sticky top-0 z-50 bg-nav-bg border-b border-nav-border">
			<div className="px-6 lg:px-20 w-full flex items-center justify-between h-[76px]">
				{/* Left */}
				<div className="flex items-center gap-8">
					<NavLogo />
					<nav className="hidden lg:flex items-center gap-6">
						{navItems.map((item) => {
							if ("hasDropdown" in item) {
								return <NavDropdown key={item.label} label={item.label} />;
							}
							return (
								<NavItem key={item.label} label={item.label} href={item.href} />
							);
						})}
					</nav>
				</div>

				{/* Right - Desktop */}
				<div className="hidden lg:flex items-center gap-3">
					<Button variant="ghost">Sign in</Button>
					<Button variant="primary">Sign up</Button>
				</div>
			</div>
		</header>
	);
}
