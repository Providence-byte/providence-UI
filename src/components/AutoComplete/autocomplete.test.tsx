import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Autocomplete, { AutocompleteProps } from "./autocomplete";
import { config } from "react-transition-group";

// 我们给autocomplete加有动画，但动画涉及异步，我们除了mock实现之外，还可以
// 使用config把他的动画禁止掉，使他没有异步
config.disabled = true;
const arr = [
  { value: "ab", num: 1 },
  { value: "abc", num: 2 },
  { value: "ccc", num: 3 },
  { value: "bcc", num: 4 },
  { value: "ddd", num: 5 },
];

const testProps: AutocompleteProps = {
  fatchSuggestions: (keyword) => {
    return arr.filter((item) => item.value.includes(keyword));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test Autocomplete Component", () => {
  beforeEach(() => {
    wrapper = render(<Autocomplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });
  it("test autocomplete default behavior", async () => {
    //   改变input的值，出现下拉菜单
    fireEvent.change(inputNode, { target: { value: "a" } });

    await waitFor(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
      expect(wrapper.getByText("abc")).toBeInTheDocument();
    });
    const { container } = wrapper;
    expect(container.querySelectorAll(".dropdown-item").length).toEqual(2);
    // 点击item,触发选择，下拉框消失
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", num: 1 });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    // input的值变为选择的数据
    expect(inputNode.value).toBe('ab');
  });
  it('test keyboard event',async()=>{
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
      expect(wrapper.getByText("abc")).toBeInTheDocument();
    });
    const firstRes = wrapper.getByText("ab");
    const secondRes = wrapper.getByText("abc");
    // 点击下箭头
    fireEvent.keyDown(inputNode,{code:'ArrowDown'});
    expect(firstRes).toHaveClass('item-highlight');
    fireEvent.keyDown(inputNode,{code:'ArrowDown'});
    expect(secondRes).toHaveClass('item-highlight');
    // 点击上箭头
    fireEvent.keyDown(inputNode,{code:"ArrowUp"});
    expect(firstRes).toHaveClass('item-highlight');
    // 点击回车键
    fireEvent.keyDown(inputNode,{code:"Enter"});
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", num: 1 });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    // 点击ESC
    fireEvent.change(inputNode, { target: { value: "a" } });
    fireEvent.keyDown(inputNode,{code:"Escape"});
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  })
  it('click outside should hide the dropdown',async()=>{
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
      expect(wrapper.getByText("abc")).toBeInTheDocument();
    });
    // 点击外面
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();

  })
});
