import { NavLink } from "react-router-dom";
import logo from "../assets/logo_hire_flow.png"

export default function Footer() {

    return (
        <>
            <footer>
                <div className="footer_left">
                    <NavLink to="/dashboard" className="logo">
                        <img src={logo} alt="logo" className="app_logo" />
                        HireFlow
                    </NavLink>
                </div>

                <div>
                    <span>© 2026 • HireFlow</span>
                </div>

                <div className="footer_social">
                    <a href="https://www.linkedin.com/in/vincenzo-livigni-2206b83a9/" target="_blank">
                        <i className="bi bi-linkedin"></i>
                    </a>

                    <a href="https://github.com/VincenzoLivigni" target="_blank">
                        <i className="bi bi-github"></i>
                    </a>
                </div>

            </footer>
        </>
    )
}