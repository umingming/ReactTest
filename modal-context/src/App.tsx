import { useState } from "react";
import ThemeContext from "./ThemeContext";
import ThemedButton from "./ThemedButton";

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
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

export default App;
