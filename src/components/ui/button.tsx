import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
	"inline-flex items-center justify-center font-body font-bold text-sm leading-none rounded-sm px-5 py-3 cursor-pointer transition-colors",
	{
		variants: {
			variant: {
				primary: "bg-btn-primary-bg text-btn-primary-text",
				secondary:
					"bg-transparent text-text-primary border-[1.5px] border-border-primary",
				ghost: "bg-transparent text-text-primary",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		icon?: ReactNode;
		ref?: Ref<HTMLButtonElement>;
	};

function Button({ className, variant, icon, children, ref, ...props }: ButtonProps) {
	return (
		<button
			ref={ref}
			className={cn(buttonVariants({ variant }), icon && "gap-2", className)}
			{...props}
		>
			{children}
			{icon}
		</button>
	);
}

export { Button };
