import { NavLink } from "react-router-dom";

export default function Footer() {

    return (
        <>
            <footer>
                <div className="footer_left">
                    <NavLink to="/dashboard" className="logo">
                        <i className="bi bi-briefcase-fill"></i>
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