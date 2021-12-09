// import '../src/styles/index.scss'
import { addDecorator, addParameters } from '@storybook/react';
const wrapperStyles: React.CSSProperties={
  padding:"20px 40px"
}
const CenterDecorator=(storyFn:any)=><div style={wrapperStyles}>
<h3 style={{marginBottom:'20px'}}>组件演示</h3>
{storyFn()}
</div>

addDecorator(CenterDecorator)
addParameters({
  info: {
    header: false,
    inline: true
  }
})

// export const parameters = {
//   // 不要全局添加actions，不然你组件里的事件将无法触发，会被换成自动匹配的action
//   // actions: { argTypesRegex: "^on[A-Z].*" },
//   // controls: { expanded: true },
// }
