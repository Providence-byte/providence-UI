import {
  render,
  fireEvent,
  waitFor,
  screen,
  RenderResult,
  createEvent
} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Upload, { UploadProps } from "./upload";
import axios from "axios";
interface IFuncArgs {
  icon:IconProp,
  onClick:()=>void
}
jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }:IFuncArgs) => {
    console.log(icon); //可以打印出icon的名字
    return <span onClick={onClick}>{icon}</span>;
  };
});

// 模拟axios,由jest接管axios
jest.mock("axios");
//   进行类型断言,转换成jestMock对象，才能使用其上面的方法进行测试
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  actions: "fakeurl",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag:true
};

// 建一个file对象来模拟文件
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
describe("test Upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.getByTestId("hidden-input") as HTMLInputElement;
    uploadArea = wrapper.getByText("Click to upload");
    // 简便写法，直接返回Promise.resolve
    mockedAxios.post.mockResolvedValue({ data: "cool" });
  });
  it("upload process should work fine", async () => {
    // mockedAxios.post.mockImplementation(() =>
    //   Promise.resolve({ data: "cool" })
    // );
    

    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    // 模拟文件上传
    // screen.debug();
    fireEvent.change(fileInput, { target: { files: [testFile] } });

    await waitFor(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(wrapper.queryByText("check-circle")).toBeInTheDocument();
    // toHaveBeenCalledWith参数为函数参数
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    // 测试删除
    expect(wrapper.queryByText("times")).toBeInTheDocument();
    fireEvent.click(wrapper.getByText("times"));
    expect(wrapper.queryByText("test.png")).not.toBeInTheDocument();
    // 用于测试对象中包含特殊几条属性
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  it("drag and drop should work fine",async ()=>{
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragger')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragger')
    // fireEvent 不支持 dataTransfer 属性，因此要自己mock一个事件，并给他添加dataTransfer
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)

    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  })
});
