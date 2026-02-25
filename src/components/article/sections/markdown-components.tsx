import type { Components } from "react-markdown";

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

function getTextContent(children: React.ReactNode): string {
	if (typeof children === "string") return children;
	if (Array.isArray(children)) return children.map(getTextContent).join("");
	if (children && typeof children === "object" && "props" in children) {
		return getTextContent((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
	}
	return "";
}

export const markdownComponents: Components = {
	h2: ({ children }) => {
		const text = getTextContent(children);
		return (
			<h2
				id={slugify(text)}
				className="font-heading font-semibold text-2xl lg:text-3xl leading-[1.2] mt-8 mb-4 text-text-primary"
			>
				{children}
			</h2>
		);
	},
	h3: ({ children }) => {
		const text = getTextContent(children);
		return (
			<h3
				id={slugify(text)}
				className="font-heading font-semibold text-xl lg:text-2xl leading-[1.2] mt-6 mb-3 text-text-primary"
			>
				{children}
			</h3>
		);
	},
	h4: ({ children }) => (
		<h4 className="font-heading font-semibold text-lg lg:text-xl leading-[1.2] mt-5 mb-2 text-text-primary">
			{children}
		</h4>
	),
	p: ({ children }) => (
		<p className="font-body font-medium text-base leading-[1.75] text-text-primary">
			{children}
		</p>
	),
	a: ({ href, children }) => {
		const isExternal = href?.startsWith("http");
		return (
			<a
				href={href}
				className="text-border-brand underline"
				{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			>
				{children}
			</a>
		);
	},
	strong: ({ children }) => (
		<strong className="font-bold">{children}</strong>
	),
	em: ({ children }) => <em className="italic">{children}</em>,
	blockquote: ({ children }) => (
		<blockquote className="border-l-[3px] border-border-brand pl-4 italic text-text-secondary">
			{children}
		</blockquote>
	),
	ul: ({ children }) => (
		<ul className="list-disc pl-6 flex flex-col gap-2 marker:text-text-tertiary">
			{children}
		</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal pl-6 flex flex-col gap-2 marker:text-text-tertiary">
			{children}
		</ol>
	),
	li: ({ children }) => (
		<li className="font-body font-medium text-base leading-[1.75] text-text-primary">
			{children}
		</li>
	),
};
