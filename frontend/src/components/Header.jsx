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
                <nav className="app_navbar">
                    <NavLink to="/dashboard" className="logo">
                        <i className="bi bi-briefcase-fill"></i>
                        HireFlow
                    </NavLink>

                    <NavLink to="/dashboard">Dashboard</NavLink>

                    <div>
                        <button onClick={logout} className="danger_button">
                            <i className="bi bi-box-arrow-left logout_icon"></i>
                            Logout
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}