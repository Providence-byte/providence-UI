import React, { CSSProperties, FC } from "react";
import classNames from "classnames";
import { Theme } from "../Icon/icon";

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: Theme;
}

/**进度条，传入可变的percent来改变进度
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 * */

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  const classes = classNames("progess-inner", { [`progress-${theme}`]: theme });
  return (
    <div className="progress-wrapper" style={styles}>
      <div style={{ height: `${strokeHeight}px` }} className="progress-outer">
        <div className={classes} style={{ width: `${percent}%` }}>
          {showText && `${percent}%`}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
