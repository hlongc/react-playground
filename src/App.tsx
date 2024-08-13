import ReactPlayground from "./ReactPlayground";
import { PlaygroundContextProvider } from "./Context";
import "./App.less";

function App() {
  return (
    <PlaygroundContextProvider>
      <ReactPlayground />
    </PlaygroundContextProvider>
  );
}

export default App;
