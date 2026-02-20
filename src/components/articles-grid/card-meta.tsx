import { Chip } from "@/components/ui/chip";
import { DotSeparator } from "@/components/ui/dot-separator";

interface CardMetaProps {
	theme: string;
	readingTime: number;
}

export function CardMeta({ theme, readingTime }: CardMetaProps) {
	return (
		<div className="flex items-center gap-2">
			<Chip>{theme}</Chip>
			<DotSeparator />
			<Chip>{readingTime} min</Chip>
		</div>
	);
}
