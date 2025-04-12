import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { List } from "./dnd/ListBox";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <List />
      </DndProvider>
    </div>
  );
}

export default App;
