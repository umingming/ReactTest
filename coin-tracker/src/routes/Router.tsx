import { createBrowserRouter } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Coins />,
    },
    {
        path: "/:coinId",
        element: <Coin />,
    }
])
export default router;