import classNames from "classnames";
import React from "react";
import s from "./button.module.css";

interface BaseButtonProps {
  size: "base" | "small";
  radius: "rounded" | "full";
  color: "mochi" | "white";
  fill: boolean;
}

type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, "type" | "onClick">;

type NativeButtonProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick">;

type Props = Partial<NativeButtonProps & AnchorButtonProps>;

function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K[]
): Omit<T, K> {
  const clone = { ...obj };
  if (Array.isArray(fields)) {
    fields.forEach((key) => {
      delete clone[key];
    });
  }
  return clone;
}

export const InternalButton: React.ForwardRefRenderFunction<unknown, Props> = (
  props,
  ref
) => {
  const {
    radius = "rounded",
    size = "base",
    fill = false,
    color = "mochi",
    className,
    children,
    ...rest
  } = props;

  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const classes = classNames(
    s.button,
    s[size],
    s[color],
    radius === "full" && s.fullRadius,
    fill && "w-full",
    className
  );

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const { onClick, disabled } = props;
    if (disabled) {
      e.preventDefault();
      return;
    }
    (
      onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    )?.(e);
  };

  const linkButtonRestProps = omit(
    rest as AnchorButtonProps & { navigate: any },
    ["navigate"]
  );
  if (linkButtonRestProps.href !== undefined) {
    return (
      <a
        {...linkButtonRestProps}
        className={classes}
        onClick={handleClick}
        ref={buttonRef}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} ref={buttonRef} {...rest}>
      {children}
    </button>
  );
};

const Button = React.forwardRef<unknown, Props>(InternalButton);
Button.displayName = "Button";

export default Button;
