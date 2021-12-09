import React, { useState,BaseHTMLAttributes,FC } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export type AlertType ="primary"|"default"|"warning"|"danger"

interface BaseAlertProps {
  alertType?: AlertType;
  title?: string;
  isClose?: boolean;
  content?: string;
  className?: string;
}

export type AlertProps = BaseAlertProps &
  BaseHTMLAttributes<HTMLDivElement>;

/** 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * 
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Alert } from 'providence'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const [close, setClose] = useState(true);
  const { alertType, title, isClose, content, className, ...restProps } = props;
  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
    // 'alert-close':close
  });
  const handleClose = () => {
    setClose(false);
  };
  return (
    <Transition in={close} timeout={300} animation={"zoom-out-top"}>
      {content ? (
        <div className={classes} {...restProps}>
          <div className="alert-title">
            <div>{title}</div>
            {isClose ? (
              <span onClick={handleClose} data-testid="test close">
                <Icon icon="times" size="2x"></Icon>
              </span>
            ) : null}
          </div>
          <h5>{content}</h5>
        </div>
      ) : (
        <div className={classes} {...restProps}>
          <div className="alert-title">
            <div>{title}</div>
            {isClose ? (
              <span onClick={handleClose} data-testid="test close">
                <Icon icon="times"></Icon>
              </span>
            ) : null}
          </div>
        </div>
      )}
    </Transition>
  );
};
Alert.defaultProps = {
  alertType: 'default',
  isClose: false,
  title: "this is a alert",
};

export default Alert;
