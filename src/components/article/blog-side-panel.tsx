import { TableOfContents } from "./table-of-contents";
import { SidebarCTA } from "./sidebar-cta";
import type { Heading } from "@/lib/extract-headings";

interface BlogSidePanelProps {
	headings: Heading[];
}

export function BlogSidePanel({ headings }: BlogSidePanelProps) {
	return (
		<div className="sticky top-[100px] flex flex-col gap-8">
			<TableOfContents headings={headings} />
			<SidebarCTA />
		</div>
	);
}
