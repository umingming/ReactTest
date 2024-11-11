import ThemeContext from "./ThemeContext";

export default function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button onClick={toggleTheme}>{theme}</button>
      )}
    </ThemeContext.Consumer>
  );
}
