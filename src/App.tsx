import { useState } from "react";
import Button from "./components/Botton/button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App" style={{ margin: "20px" }}>
      <header className="App-header">
        <Button size='lg' onClick={()=>setShow(!show)}>
          button
        </Button>
      </header>
    </div>
  );
}
export default App;
