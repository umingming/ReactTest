import { useOutletContext } from "react-router-dom"

export default function Followers() {
    const context = useOutletContext();
    console.log(context)
    return (
        <div>
            Follow
        </div>
    )
}