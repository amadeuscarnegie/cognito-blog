import { Container } from "@/components/layout/container";
import { BlogNav } from "./blog-nav";
import { HeroIllustration } from "./hero-illustration";
import { SearchInput } from "@/components/ui/search-input";
import { themes } from "@/lib/content-data";
import type { Theme, ThemeFilterSlug } from "@/types/blog";

interface BlogHeroProps {
	currentTheme: Theme;
	activeThemeSlug: ThemeFilterSlug;
	onThemeChange: (slug: ThemeFilterSlug) => void;
	searchQuery: string;
	onSearchChange: (query: string) => void;
}

export function BlogHero({
	currentTheme,
	activeThemeSlug,
	onThemeChange,
	searchQuery,
	onSearchChange,
}: BlogHeroProps) {
	return (
		<section className="pt-6 lg:pt-10">
			<Container>
				{/* Top: Heading + Illustration */}
				<div className="flex flex-col-reverse lg:flex-row lg:items-end lg:justify-between pb-5 lg:pb-6 border-b border-border-quaternary">
					<div className="flex flex-col gap-2">
						<h1 className="font-heading font-semibold text-[28px] lg:text-5xl leading-[1.15] tracking-[-0.005em] text-text-primary">
							{currentTheme.name}
						</h1>
						<p className="font-body font-normal text-sm leading-[1.6] text-text-secondary line-clamp-1 lg:line-clamp-none">
							{currentTheme.description}
						</p>
					</div>
					<HeroIllustration themeSlug={activeThemeSlug} />
				</div>

				{/* Bottom: Nav + Search */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4 lg:pt-5">
					<BlogNav
						themes={themes}
						activeTheme={activeThemeSlug}
						onThemeChange={onThemeChange}
					/>
					<SearchInput value={searchQuery} onChange={onSearchChange} />
				</div>
			</Container>
		</section>
	);
}
