import { Link } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import error from "../assets/error.png"

export default function NotFound() {

    const { token } = useContext(GlobalContext)

    const destinazione = token ? "/dashboard" : "/"

    return (
        <>
            <div className="not_found_container">
                <img src={error} alt="pagina non trovata" className="app_error" />

                <p><strong>404</strong> Oops! Pagina non trovata...</p>

                <Link to={destinazione}>
                    {token ? "Torna alla dashboard" : "Vai al login"}
                </Link>
            </div>
        </>
    )
}