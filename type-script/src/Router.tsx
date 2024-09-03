import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import About from "./screens/About";
import Home from "./screens/Home";

// export default function Router() {
//     return (
//         <BrowserRouter>
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//             </Routes>
//         </BrowserRouter>    
//     )
// }

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "about",
                element: <About />
            }
        ]
    }
])
export default router;