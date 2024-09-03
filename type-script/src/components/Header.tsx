import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const goAbout = () => navigate("/about");

    return (
        <h1>
            <Link to={"/home"}>Home</Link>
            <button onClick={goAbout}>About</button>
        </h1>
    )
}