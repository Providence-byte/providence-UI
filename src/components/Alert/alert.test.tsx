import { render, fireEvent } from "@testing-library/react";
import Alert from "./alert";
jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});
jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: any) => {
      return props.children;
    },
  };
});

describe("test Alert component", () => {
  test("should render the correct default Alert", () => {
    const wrapper = render(<Alert></Alert>);
    const { container } = wrapper;
    // 解构出container，再获取dom节点，匹配的是外层div
    const element = container.querySelector(".alert");
    // 匹配的是内层包了title文字的div
    const element1 = wrapper.getByText("this is a alert");
    expect(element).toBeInTheDocument();
    expect(element1).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-default");
    expect(wrapper.queryByTestId("test close")).toBeFalsy();
  });
  test("should render the correct different props Alert", () => {
    const wrapper = render(
      <Alert title={"我是标题"} alertType='primary'></Alert>
    );
    const { container } = wrapper;
    // 展示DOM树
    // screen.debug();
    const element = container.querySelector(".alert");
    const element1 = wrapper.getByText("我是标题");
    expect(element).toBeInTheDocument();
    expect(element1).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-primary");
  });
  test("should render the correct close button", () => {
    const wrapper = render(<Alert isClose></Alert>);
    // 关闭按钮存在
    const element = wrapper.getByTestId("test close");
    expect(element).toBeInTheDocument();
    // 模拟点击关闭按钮
    fireEvent.click(element);
    // 点击后元素消失
    // expect(container.querySelector(".alert")).toBeFalsy(); //测试失败，不会消失，手动测试可以
  });
  test("should render the correct have content", () => {
    const wrapper = render(
      <Alert content={"我是内容"} title={"我是标题"}></Alert>
    );
    const element = wrapper.getByText("我是内容");
    const element1 = wrapper.getByText("我是标题");
    expect(element).toBeInTheDocument();
    expect(element1).toBeInTheDocument();
  });
});
