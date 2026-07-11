import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <>
            <header>
                <nav>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <button>Logout</button>
                </nav>
            </header>
        </>
    )
}