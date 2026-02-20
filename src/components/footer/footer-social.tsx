import { Youtube } from "lucide-react";

export function FooterSocial() {
	return (
		<a
			href="https://youtube.com"
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center justify-center h-6 w-6 text-footer-muted hover:text-footer-text transition-colors"
			aria-label="YouTube"
		>
			<Youtube className="h-6 w-6" />
		</a>
	);
}
