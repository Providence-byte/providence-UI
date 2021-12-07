import React, {
  ReactNode,
  FC,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import classNames from "classnames";
// 用枚举来表示大小和类型
export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: ReactNode;
}
// & 将前后两者的属性和方法的类型加到一起
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AuchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// Partial接收一个泛型，会将里面的属性都变为可选属性
export type ButtonProps = Partial<NativeButtonProps & AuchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    size,
    btnType,
    children,
    href,
    className,
    ...restProps
  } = props;
  // 默认有 .btn , 可加 .btn-lg, .btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button disabled={disabled} className={classes} {...restProps}>
        {children}
      </button>
    );
  }
};
// 定义Button组件的默认属性
Button.defaultProps = {
  btnType: "default",
  disabled: false,
};

export default Button;
