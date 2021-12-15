import { render, fireEvent, RenderResult } from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabsItem from "./tabsitem";
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
const testProps: TabsProps = {
  defaultIndex: "0",
  type: "line",
  className: "test",
};


const NewTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabsItem title="active">activeContent</TabsItem>
      <TabsItem title="disabled" disabled>
        disabledContent
      </TabsItem>
      <TabsItem title="icon" icon="line">
        iconContent
      </TabsItem>
    </Tabs>
  );
};

let wrapper: RenderResult,
  tabsElement: HTMLElement,
  activeElement: HTMLElement,
  tabsItems: HTMLElement[]

describe("test Tabs component", () => {
  beforeEach(() => {
    wrapper = render(NewTabs(testProps));
    tabsElement = wrapper.getByTestId("Tabs test");
    tabsItems = wrapper.getAllByTestId('tabs item');
    activeElement = wrapper.getByText('active');
    
  });
  it("should render correct Tabs and TabsItem based on default props ", () => {
    expect(tabsElement).toBeInTheDocument();
    expect(tabsElement).toHaveClass('tabs test');
    expect(activeElement).toHaveClass('tabs-item is-active');
    fireEvent.click(tabsItems[2]);
    const { container } = wrapper;
    expect(container.querySelector('.tabs-content')).toHaveTextContent('iconContent');
  });
  it("should render correct disabled or icon", () => {});
  // it("should render corrcet change active and call the right callback", () => {});
  // it("shold render when card type", () => {});
});
