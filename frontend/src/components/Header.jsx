import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo_hire_flow.png"

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
                        <img src={logo} alt="logo" className="app_logo" />
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