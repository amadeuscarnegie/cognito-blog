import { ArrowLeft } from "lucide-react";

interface SubNavHeaderProps {
	onBack: () => void;
	breadcrumb: string;
}

export function SubNavHeader({ onBack, breadcrumb }: SubNavHeaderProps) {
	return (
		<div className="sticky top-0 flex items-center gap-2 px-4 py-3 bg-bg-subtle border-b border-border-quaternary rounded-t-lg">
			<button
				type="button"
				onClick={onBack}
				aria-label="Close submenu"
				className="flex items-center justify-center h-6 w-6 cursor-pointer"
			>
				<ArrowLeft className="h-4 w-4 text-text-primary" />
			</button>
			<span className="font-body font-semibold text-sm text-text-primary">
				{breadcrumb}
			</span>
		</div>
	);
}
