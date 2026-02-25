import { ArrowRight } from "lucide-react";

export function SidebarCTA() {
	return (
		<div className="bg-bg-secondary rounded-lg p-6 flex flex-col gap-3">
			<span className="font-body font-bold text-xs uppercase tracking-wider text-border-brand">
				Free account
			</span>
			<h3 className="font-heading font-semibold text-lg leading-tight">
				Start revising with Cognito
			</h3>
			<p className="font-body text-sm text-text-secondary leading-relaxed">
				Free videos, quizzes and interactive content for GCSE and A-Level
				students.
			</p>
			<a
				href="https://cognito.org/signup"
				className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-border-brand hover:underline mt-1"
			>
				Get started
				<ArrowRight className="w-4 h-4" />
			</a>
		</div>
	);
}
