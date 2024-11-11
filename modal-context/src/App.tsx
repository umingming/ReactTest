import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    </div>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button>{theme}</button>;
}

export default App;
