import { Link, useSearchParams } from "react-router-dom"
import { users } from "../utill/db"

export default function Home() {
    const [params, setParams] = useSearchParams();
    console.log(params.has("id"))
    console.log(params.get("id"))
    // setTimeout(() => {
    //     setParams({ id: "3" });
    // }, 3000)
    return (
        <div>
            <h1>Home</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}