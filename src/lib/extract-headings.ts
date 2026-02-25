import type { Section } from "@/types/article";
import { slugify } from "@/components/article/sections/markdown-components";

export interface Heading {
	id: string;
	text: string;
	level: 2 | 3;
}

export function extractHeadings(sections: Section[]): Heading[] {
	const headings: Heading[] = [];
	const regex = /^(#{2,3})\s+(.+)$/gm;

	for (const section of sections) {
		if (section.type !== "text") continue;

		let match: RegExpExecArray | null;
		while ((match = regex.exec(section.content)) !== null) {
			const hashes = match[1];
			const rawText = match[2];
			if (!hashes || !rawText) continue;
			const level = hashes.length as 2 | 3;
			const text = rawText.trim();
			headings.push({ id: slugify(text), text, level });
		}
	}

	return headings;
}
