import { useEffect } from "react";
var useClickOutside = function (ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            // contains需要一个Node类型，也就是HTMLElement，而event.target是一个EventTarget
            // 对象，因此需要类型断言
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
};
export default useClickOutside;
