import { useState } from "react";
import Button from "./components/Botton/button";
import Alert from "./components/Alert/alert";
import Transition from "./components/Transition/transition";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuitem";
import SubMenu from "./components/Menu/submenu";

import Tabs from "./components/Tabs/tabs";
import TabsItem from "./components/Tabs/tabsitem";
library.add(fas);
function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App" style={{ margin: "20px" }}>
      <header className="App-header">
        <Alert isClose></Alert>
        <Tabs type="card">
          <TabsItem title="tab1" icon="ban">
            tab1 content
          </TabsItem>
          <TabsItem title="tab2">tab2 content</TabsItem>
          <TabsItem title="tab3">tab3 content</TabsItem>
        </Tabs>
        <Tabs>
          <TabsItem title="tab1" icon="ban">
            tab1 content
          </TabsItem>
          <TabsItem title="tab2">tab2 content</TabsItem>
          <TabsItem title="tab3">tab3 content</TabsItem>
        </Tabs>
        <Menu>
          <MenuItem>item 1</MenuItem>
          <MenuItem>item 2</MenuItem>
          <MenuItem>item 3</MenuItem>
          <SubMenu title="drop down">
            <MenuItem>item 1</MenuItem>
            <MenuItem>item 2</MenuItem>
            <MenuItem>item 3</MenuItem>
          </SubMenu>
        </Menu>
        <Button size='lg' onClick={()=>setShow(!show)}>
          button
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <Menu>
            <MenuItem>item 1</MenuItem>
            <MenuItem>item 2</MenuItem>
            <MenuItem>item 3</MenuItem>
            <SubMenu title="drop down">
              <MenuItem>item 1</MenuItem>
              <MenuItem>item 2</MenuItem>
              <MenuItem>item 3</MenuItem>
            </SubMenu>
          </Menu>
        </Transition>
      </header>
    </div>
  );
}
export default App;
