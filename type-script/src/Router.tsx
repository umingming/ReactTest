import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import About from "./screens/About";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Followers from "./screens/user/Followers";
import User from "./screens/user/User";

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
                path: "home",
                element: <Home />,
                errorElement: <NotFound />
            },
            {
                path: "about",
                element: <About />,
                errorElement: <NotFound />
            },
            {
                path: "user/:userId",
                element: <User />,
                children: [
                    {
                        path: "followers",
                        element: <Followers />
                    }
                ]
            }
        ],
        errorElement: <NotFound />
    }
])
export default router;