import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module)
  .addParameters({
    info: {
      inline: false,
    },
  })
  .add(
    "welcome",
    () => {
      return (
        <>
          <h1>欢迎来到providence组件库</h1>
          <p>providence是使用React hooks 和 typeScript 打造的react组件库</p>
          <h3>安装试试</h3>
          <code>npm install providence --save</code>
          <br />
          <code>
            使用:
            <br />
            {`
import { Button } from "providence"
`}
            <br />
            {`
import "providence/dist/index.css"
`}
            <br />
            {`
<Button btnType="primary">Primary</Button>
`}
            <br />
          </code>
        </>
      );
    },
    { info: { disabled: true } }
  );
