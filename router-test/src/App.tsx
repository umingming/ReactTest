import "./App.css";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

const router = createHashRouter([
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
