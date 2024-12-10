import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Board from "./components/TicTacToe";
import Immer from "./components/state/Immer";
import Queue from "./components/state/Queue";
import State from "./components/state/ProcessQueue";
import Counter from "./components/ref/Counter";
import Chat from "./components/ref/Chat";
import Debounce from "./components/ref/Debounce";
import Form from "./components/ref/Form";
import CatFriends from "./components/ref/CatFriends";

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(<CatFriends />);

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   // 매초마다 호출하나, 변경된 부분만 업데이트함.
//   root.render(element);
// }

// setInterval(tick, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
