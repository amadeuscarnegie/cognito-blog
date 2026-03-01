import type { Metadata } from "next";
import { Nav } from "@/components/nav/nav";
import { Footer } from "@/components/footer/footer";
import { Container } from "@/components/layout/container";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { faqCategories } from "@/lib/content-data";
import { BASE_URL } from "@/lib/constants";
import { FAQInteractive } from "./faq-interactive";

export const metadata: Metadata = {
	title: "FAQ — Frequently Asked Questions",
	description:
		"Find answers to common questions about Cognito, from getting started and managing your account to billing, subscriptions, and school access.",
	openGraph: {
		title: "FAQ — Frequently Asked Questions",
		description:
			"Find answers to common questions about Cognito, from getting started and managing your account to billing, subscriptions, and school access.",
		type: "website",
		siteName: "Cognito",
	},
	alternates: {
		canonical: `${BASE_URL}/faq`,
	},
};

function faqPageJsonLd() {
	const allQuestions = faqCategories.flatMap((cat) => cat.questions);
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: allQuestions.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

export default async function FAQPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const resolvedSearchParams = await searchParams;
	const initialSearchQuery =
		typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";

	const breadcrumbItems = [
		{ name: "Home", url: BASE_URL },
		{ name: "FAQ", url: `${BASE_URL}/faq` },
	];

	return (
		<>
			<JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
			<JsonLd data={faqPageJsonLd()} />
			<Nav />
			<main>
				<section className="py-12 lg:py-20">
					<Container>
						{/* Hero */}
						<div className="text-center max-w-[640px] mx-auto mb-10 lg:mb-14">
							<h1 className="font-heading font-semibold text-[26px] lg:text-[40px] leading-[1.15] tracking-[-0.01em] text-text-primary mb-3">
								Frequently Asked Questions
							</h1>
							<p className="font-body text-base lg:text-lg text-text-secondary leading-relaxed">
								Find quick answers to your questions below. If you need further
								help, contact us at{" "}
								<a
									href="mailto:hello@cognitoedu.org"
									className="text-text-primary font-semibold hover:underline"
								>
									hello@cognitoedu.org
								</a>
							</p>
						</div>

						{/* Interactive FAQ (search + accordion sections + contact CTA) */}
						<FAQInteractive
							categories={faqCategories}
							initialSearchQuery={initialSearchQuery}
						/>
					</Container>
				</section>
			</main>
			<Footer />
		</>
	);
}
