import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {Button} from "./button";

const styles: React.CSSProperties = {
  margin: 0,
  maxWidth: "800px",
};

// 局部装饰器
const CSSDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

const defaultButton = () => (
  <div style={{ margin: "20px 0" }}>
    <Button onClick={action("clicked")}>default Button</Button>
  </div>
);

const buttonWithSize = () => (
  <>
    <div style={{ margin: "20px 0" }}>
      <Button onClick={action("clicked")} size="lg">
        Large Button
      </Button>
    </div>
    <Button onClick={action("clicked")} size="sm">
      Small Button
    </Button>
  </>
);

const buttonWithType = () => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "600px"
      }}
    >
      <Button onClick={action("clicked")} btnType="default">
        default Button
      </Button>
      <Button onClick={action("clicked")} btnType="primary">
        primary Button
      </Button>
      <Button onClick={action("clicked")} btnType="danger">
        danger Button
      </Button>
      <Button
        onClick={action("clicked")}
        btnType="link"
        href="http://www.baidu.com"
      >
        link Button
      </Button>
    </div>
  </>
);

storiesOf(" 按钮 ", module)
  .addDecorator(CSSDecorator)
  .addParameters({
    info:{
      text:`
      <h3>何时使用</h3>

      标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
      
      在 providence 中我们提供了三种大小按钮。
          
      以及四种状态属性与上面配合使用。
      
      危险：删除/移动/修改权限等危险操作，一般需要二次确认。
      
      主要：用于主行动点，一个操作区域只能有一个主按钮。
      
      禁用：行动点不可用的时候，一般需要文案解释。
      
      链接：一般用于链接，即导航至某位置。  

      `
    }
  })
  .add("默认按钮", defaultButton) //链式add方法会按顺序创建组件目录
  .add("不同大小的按钮", buttonWithSize)
  .add("不同类型的按钮", buttonWithType);
