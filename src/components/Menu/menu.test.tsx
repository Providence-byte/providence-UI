import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Menu, { BaseMenuProps } from "./menu";
import MenuItem, { BaseMenuItemProps } from "./menuitem";
import SubMenu, { SubMenuProps } from "./submenu";
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})
const testProps: BaseMenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: BaseMenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  onSelect: jest.fn(),
  defaultOpenSubMenu: ["3"],
};


// 创建一个测试用组件
const NewMenu = (props: BaseMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>default</MenuItem>
      <SubMenu title={"下拉菜单"}>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
// 创建方法用于添加css测试
const createStyleFile = () => {
  const cssFile: string = `
    .submenu{
      display:none
    }
    .submenu.menu-open{
      display:block
    }
  `;
  const style = document.createElement("style");
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  defaultElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  // beforeEach钩子函数在每个case开始之前都会被调用，可以放一些通用测试
  // 接收一个回调函数
  beforeEach(() => {
    wrapper = render(NewMenu(testProps));
    menuElement = wrapper.getByTestId("test menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
    defaultElement = wrapper.getByText("default");
    // 将我们创建的样式函数插入dom实例中
    wrapper.container.append(createStyleFile());
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    //测试其子元素长度 所有子元素匹配，会跨越层级
    // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    // 若我们只想要它下面一层的子元素，可以用 :scope > li
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("should render corrcet change active and call the right callback", () => {
    fireEvent.click(defaultElement);
    expect(defaultElement).toHaveClass("menu-item is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toBeCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toBeCalledWith("1");
  });
  it("should render correct vertical Menu", () => {
    //   清除beforeEach函数调用生成的变量，防止渲染多次
    cleanup();
    const wrapper = render(NewMenu(testVerProps));
    const verElemnet = wrapper.getByTestId("test menu");
    expect(verElemnet).toHaveClass("menu-vertical");
  });
  it("should show dropdown item when hover SubMenu", async () => {
    // 此处未添加css display:none，因此要先在测试里添加上
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
    fireEvent.mouseEnter(wrapper.getByText("下拉菜单"));
    // 此处hover后有settimeout异步，因此我们要加上async/await 并配合waitFor使用
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toBeCalledWith("3-0");
    fireEvent.mouseLeave(wrapper.getByText("下拉菜单"));
    // 此处hover后有settimeout异步，因此我们要加上async/await 并配合waitFor使用
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).not.toBeVisible();
    });
  });
  it("should show dropdown item when click vertical SubMenu and show defaultOpen", () => {
    cleanup();
    const wrapper = render(NewMenu(testVerProps));
    // 将我们创建的样式函数插入dom实例中
    wrapper.container.append(createStyleFile());
    expect(wrapper.getByText("drop1")).toBeVisible();
    fireEvent.click(wrapper.getByText("下拉菜单"));
    expect(wrapper.getByText("drop1")).not.toBeVisible();
    fireEvent.click(wrapper.getByText('下拉菜单'));
    expect(wrapper.getByText('drop1')).toBeVisible();
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testVerProps.onSelect).toBeCalledWith('3-0');
  });
});
