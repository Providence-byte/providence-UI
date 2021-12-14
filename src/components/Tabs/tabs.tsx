import React, { createContext, cloneElement, useState } from "react";
import classNames from "classnames";
import { TabsItemProps } from "./tabsitem";

export type TabsType = "line" | "card";
type SelectCallBack = (index: string) => void;
type SelectedCallBack = (index: string, content: React.ReactNode) => void;

export interface TabsProps {
  defaultIndex?: string;
  onSelect?: SelectCallBack;
  type?: TabsType;
  className?: string;
  style?: React.CSSProperties;
  contentClass?:string;
}

export interface ITabsContext {
  index: string;
  content?: React.ReactNode;
  onSelected?: SelectedCallBack;
}

type ITabsContent = React.ReactNode | null;

export const TabsContext = createContext<ITabsContext>({ index: "0" });

/**选择不同的Tab项以展示不同的内容
 * 
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 * */  

export const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, onSelect, type, className, style, children,contentClass } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  // 这段代码是 迫不得已之举 请谨慎使用
  let defaultContent = React.Children.map(children,(child,index)=>{
    const childElement = child as React.FunctionComponentElement<
        TabsItemProps
      >;
      return childElement
  });
  const defaultChildren = defaultContent?defaultContent[0].props.children:null;
  
  const [currentContent, setCurrentContent] = useState<ITabsContent>(defaultChildren);
  const classes = classNames("tabs", className, {
    "tabs-card": type === "card",
  });
  const contentClasses = classNames("tabs-content",contentClass)
  const TabIndex = currentIndex as string;
  const handleClick = (index: string, content: React.ReactNode) => {
    setCurrentIndex(index);
    setCurrentContent(content);
    if (onSelect) {
      onSelect(index);
    }
  };
  // 传给子组件的context值
  const passedContext: ITabsContext = {
    index: TabIndex,
    onSelected: handleClick,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        TabsItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "TabsItem") {
        return cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          "Wraning: Tabs has a child which is not a TabsItem component"
        );
      }
    });
  };
  return (
    <TabsContext.Provider value={passedContext}>
      <div className="tabs-wrapper" style={style} >
        <ul className={classes} data-testid = 'Tabs test'>
          {renderChildren()}
        </ul>
        <div className={contentClasses}>{currentContent}</div>
      </div>
    </TabsContext.Provider>
  );
};

Tabs.defaultProps = {
  defaultIndex: "0",
  type: "line",
};

export default Tabs;
