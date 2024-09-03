import { Link, Outlet, useParams } from "react-router-dom"

export default function User() {
    const {userId} = useParams();
    return (
        <div>
            <h1>User {userId}</h1>
            {/* 슬래시를 사용하지 않으면 경로 이후에 경로가 추가됨. */}
            <Link to="followers">See followers</Link>
            <Outlet context={{ userId }}/>
        </div>
    )
}