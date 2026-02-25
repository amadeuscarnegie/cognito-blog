import { Info, Lightbulb, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cva } from "class-variance-authority";
import type { AlertSection as AlertSectionType } from "@/types/article";

const alertVariants = cva(
	"flex gap-3 rounded-md p-4 border-l-[4px]",
	{
		variants: {
			variant: {
				info: "bg-[#ecf7ff] border-l-[#1578c3]",
				tip: "bg-[#f0faf0] border-l-[#22a822]",
				success: "bg-[#f0faf0] border-l-[#22a822]",
				error: "bg-[#fef2f2] border-l-[#dc2626]",
				warning: "bg-[#fffbeb] border-l-[#d97706]",
			},
		},
		defaultVariants: {
			variant: "info",
		},
	},
);

const iconColorMap = {
	info: "text-[#1578c3]",
	tip: "text-[#22a822]",
	success: "text-[#22a822]",
	error: "text-[#dc2626]",
	warning: "text-[#d97706]",
} as const;

const iconMap = {
	info: Info,
	tip: Lightbulb,
	success: CheckCircle,
	error: XCircle,
	warning: AlertTriangle,
} as const;

export function AlertSection({ variant, title, content }: AlertSectionType) {
	const Icon = iconMap[variant];
	const iconColor = iconColorMap[variant];

	return (
		<div className={alertVariants({ variant })}>
			<Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
			<div className="flex flex-col gap-1">
				<p className="font-body font-bold text-base leading-[1.3] text-text-primary">
					{title}
				</p>
				<p className="font-body font-medium text-sm leading-[1.6] text-text-primary">
					{content}
				</p>
			</div>
		</div>
	);
}
