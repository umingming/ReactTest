import { Link } from "react-router-dom";

export default function Header() {
    return (
        <h1>
            <Link to={"/home"}>Home</Link>
            <Link to={"/about"}>About</Link>
        </h1>
    )
}