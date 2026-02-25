"use client";

import { useState } from "react";
import { Link, Check } from "lucide-react";

export function CopyLinkButton() {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="flex items-center justify-center w-10 h-10 rounded-full border border-border-primary text-text-secondary hover:text-text-primary hover:border-border-brand transition-colors"
			aria-label="Copy link to article"
		>
			{copied ? (
				<Check className="w-[18px] h-[18px] text-border-brand" />
			) : (
				<Link className="w-[18px] h-[18px]" />
			)}
		</button>
	);
}
