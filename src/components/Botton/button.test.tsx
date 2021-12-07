import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

// 我们测试组件上的回调函数时,使用jest.fn()来进行监控
const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'large',
  className: "kclass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

// test('first react test case ',()=>{
//     // 渲染获取真实DOM节点
//     const wrapper = render(<Button>Nice</Button>);
//     // 调用wrapper上的方法queryByText查找是否存在提供的文字
//     const element = wrapper.queryByText('Nice');
//     // 进行测试，element是否存在
//     expect(element).toBeTruthy();
// })

describe("test Button component", () => {
  // 测试默认按钮
  test("should render the correct default button", () => {
    // 渲染获取真实DOM节点
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    // 调用wrapper上的方法getByText查找是否存在提供的文字
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    // 进行测试，element的标签是否为 BUTTON (注意大写)
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("btn btn-default");
    // 模仿点击事件，在element上点击
    fireEvent.click(element);
    // 测试onClick函数是否被调用
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  //  测试不同size，不同type的按钮
  test("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    // 是否存在于Document中
    expect(element).toBeInTheDocument();
    // 根据我们传入的属性，来检测对应的class是否被成功加上
    expect(element).toHaveClass("btn btn-primary btn-lg kclass");
  });
  // 测试type为link的按钮
  test("should render a link when btntype equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType='link' href="http://fakeurl">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element.tagName).toEqual("A");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-link");
  });
  // 测试disabled的按钮
  test("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    // 测试onClick函数是否被调用
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});
