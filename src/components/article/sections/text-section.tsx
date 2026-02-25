import Markdown from "react-markdown";
import { markdownComponents } from "./markdown-components";
import type { TextSection as TextSectionType } from "@/types/article";

export function TextSection({ content }: TextSectionType) {
	return (
		<div className="flex flex-col gap-4">
			<Markdown components={markdownComponents}>{content}</Markdown>
		</div>
	);
}
