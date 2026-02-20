import { Facebook, Instagram, Youtube } from "lucide-react";

const socials = [
	{ label: "YouTube", href: "https://youtube.com/@CognitoResources", icon: Youtube },
	{ label: "Facebook", href: "https://facebook.com/CognitoResources", icon: Facebook },
	{ label: "Instagram", href: "https://instagram.com/cognitoedu", icon: Instagram },
];

export function FooterSocial() {
	return (
		<div className="flex items-center gap-3">
			{socials.map((social) => (
				<a
					key={social.label}
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.label}
					className="flex items-center justify-center h-9 w-9 rounded-full border border-footer-text/20 text-footer-text hover:text-white hover:border-white/40 transition-colors"
				>
					<social.icon className="h-4 w-4" />
				</a>
			))}
		</div>
	);
}
