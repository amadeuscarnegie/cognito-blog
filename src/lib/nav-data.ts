type NavDropdownItem = { label: string; hasDropdown: true };
type NavLinkItem = { label: string; href: string };
export type NavItem = NavDropdownItem | NavLinkItem;

export const navItems: NavItem[] = [
	{ label: "Find my course", hasDropdown: true },
	{ label: "Blog", href: "/blog/theme/all" },
	{ label: "FAQ", href: "/faq" },
	{ label: "Schools", href: "/schools" },
];

export const subNavSections = [
	{
		label: "GCSE",
		items: [
			{ label: "Biology", href: "/course/gcse-biology" },
			{ label: "Chemistry", href: "/course/gcse-chemistry" },
			{ label: "Physics", href: "/course/gcse-physics" },
			{ label: "Maths", href: "/course/gcse-maths" },
		],
	},
	{
		label: "A-Level",
		items: [
			{ label: "Biology", href: "/course/a-level-biology" },
			{ label: "Chemistry", href: "/course/a-level-chemistry" },
			{ label: "Physics", href: "/course/a-level-physics" },
			{ label: "Maths", href: "/course/a-level-maths" },
		],
	},
];
