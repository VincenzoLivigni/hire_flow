import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <>
            <header>
                <nav>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <button onClick={logout}>Logout</button>
                </nav>
            </header>
        </>
    )
}