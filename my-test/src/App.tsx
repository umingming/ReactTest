import React from "react";
import "./App.css";

function App() {
  const {innerHeight, outerHeight, devicePixelRatio, screen, visualViewport} = window;
  return <div className="App h-screen flex justify-center flex-col items-center">
    <div className="h-40 w-40 bg-slate-300">
      Height: {innerHeight} {outerHeight}
      <br />
      Ratio: {devicePixelRatio}
      <br />
      Screen: {screen.height}
      <br />
      Scale: {visualViewport?.height} {visualViewport?.scale}
    </div>
  </div>;
}

export default App;
