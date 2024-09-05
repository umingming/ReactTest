import { createBrowserRouter } from "react-router-dom";
import Coin from "./Coin";
import Chart from "./coin/Chart";
import Price from "./coin/Price";
import Coins from "./Coins";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Coins />,
    },
    {
        path: "/:coinId",
        element: <Coin />,
        children: [
            {
                path: "price",
                element: <Price />,
            },
            {
                path: "chart",
                element: <Chart />,
            },
        ]
    }
])
export default router;