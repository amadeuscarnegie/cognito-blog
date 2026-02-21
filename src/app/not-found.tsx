import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<main className="min-h-screen flex items-center justify-center">
			<Container>
				<div className="flex flex-col items-center text-center gap-6 py-20">
					<p className="font-heading font-semibold text-lg text-[#0b3c61]">
						Cognito
					</p>
					<h1 className="font-heading font-semibold text-4xl lg:text-5xl text-text-primary">
						Page not found
					</h1>
					<p className="font-body text-base text-text-secondary max-w-md">
						Sorry, we couldn&apos;t find the page you&apos;re looking for. It
						may have been moved or no longer exists.
					</p>
					<Link href="/blog/theme/all">
						<Button variant="primary">Back to blog</Button>
					</Link>
				</div>
			</Container>
		</main>
	);
}
