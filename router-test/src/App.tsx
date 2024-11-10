import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

const router = createBrowserRouter([
  { path: "/router-test/", element: <Main /> },
  { path: "/router-test/login", element: <Login /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
