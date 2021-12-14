import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // contains需要一个Node类型，也就是HTMLElement，而event.target是一个EventTarget
      // 对象，因此需要类型断言
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
