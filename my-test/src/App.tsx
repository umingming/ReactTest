import React from "react";
import "./App.css";

function App() {
    const {
        innerHeight,
        outerHeight,
        devicePixelRatio,
        screen,
        visualViewport,
    } = window;
    return (
        <div className="App flex h-screen flex-col items-center justify-center">
            <div className="h-200 w-200 bg-slate-300 text-5xl mobile:bg-orange-500 tablet:bg-teal-400 pc:bg-purple-600">
                Height: {innerHeight} {outerHeight}
                <br />
                Ratio: {devicePixelRatio}
                <br />
                Screen: {screen.height}
                <br />
                Scale: {visualViewport?.height} {visualViewport?.scale}
                <p className="text-[48px]">TEST</p>
            </div>
        </div>
    );
}

export default App;
