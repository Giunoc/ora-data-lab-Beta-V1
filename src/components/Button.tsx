import {
  useCallback,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/theme";
import { Link } from "react-router";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-text-primary hover:bg-primary-hover focus-visible:ring-primary",
        secondary:
          "bg-secondary text-text-inverse hover:bg-secondary-hover focus-visible:ring-secondary",
        tertiary:
          "border-2 border-secondary bg-transparent text-text-primary hover:bg-secondary hover:text-text-inverse focus-visible:ring-secondary",
        text: "bg-transparent text-text-primary hover:bg-surface-darker focus-visible:ring-secondary",
      },
      size: {
        sm: "h-8 gap-1.5 rounded-md px-3 text-sm",
        md: "h-10 gap-2 rounded-lg px-4 text-base",
        lg: "h-12 gap-2.5 rounded-lg px-6 text-lg",
      },
      disabled: {
        false: null,
        true: "cursor-not-allowed opacity-40",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  },
);

const iconSizeVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ButtonPropsBase = {
  text?: string;
  screenReaderLabel?: string;
  loading?: boolean;
  hideTextOnMobile?: boolean;
  children?: ReactNode;
  className?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  iconClassName?: string;
} & VariantProps<typeof buttonVariants> &
  VariantProps<typeof iconSizeVariants>;

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
} & ButtonPropsBase &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonPropsBase | "disabled">;

export default function Button<T extends ElementType = "button">({
  className,
  variant,
  size,
  iconClassName,
  leadingIcon,
  trailingIcon,
  text,
  children,
  as,
  disabled,
  onClick,
  type,
  ...rest
}: ButtonProps<T>) {
  const Component = (as || "button") as ElementType;
  const isButton = !as || Component === "button";

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e as React.MouseEvent<HTMLButtonElement>);
      }
    },
    [disabled, onClick],
  );

  const baseProps = {
    className: cn(
      buttonVariants({
        variant,
        size,
        disabled,
      }),
      className,
    ),
    onClick: disabled ? undefined : handleClick,
    ...(isButton && { type: type || "button" }),
    ...rest,
  };
  return (
    <Component {...baseProps}>
      {leadingIcon && (
        <span className={cn(iconSizeVariants({ size }), iconClassName)}>
          {leadingIcon}
        </span>
      )}
      {text || children}
      {trailingIcon && (
        <span className={cn(iconSizeVariants({ size }), iconClassName)}>
          {trailingIcon}
        </span>
      )}
    </Component>
  );
}

export function LinkButton({ to, ...props }: ButtonProps<typeof Link>) {
  return <Button as={Link} to={to} {...props} />;
}
