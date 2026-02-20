import { Youtube } from "lucide-react";

export function FooterSocial() {
	return (
		<a
			href="https://youtube.com"
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center justify-center h-6 w-6 text-red-600 hover:text-red-700 transition-colors"
			aria-label="YouTube"
		>
			<Youtube className="h-6 w-6" />
		</a>
	);
}
