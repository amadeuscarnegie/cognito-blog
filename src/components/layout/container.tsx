import { cn } from "@/lib/cn";

type ContainerProps = {
	className?: string;
	children: React.ReactNode;
};

export function Container({ className, children }: ContainerProps) {
	return (
		<div className={cn("max-w-[1080px] mx-auto px-4 lg:px-12", className)}>
			{children}
		</div>
	);
}
