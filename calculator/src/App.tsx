import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";

const Button = styled("button")`
    color: gray;
`;

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button></Button>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Test
                </a>
            </header>
        </div>
    );
}

export default App;
