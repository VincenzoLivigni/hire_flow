import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { login } = useContext(GlobalContext)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        try {
            await login(email, password)
            navigate("/dashboard")
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <div className="login_container">
                <h1>Login</h1>

                {
                    error && <h3 className="login_error">{error}</h3>
                }

                <form onSubmit={handleSubmit}>
                    <div className="input_login">
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>

                    <div className="input_login">
                        <input
                            type="password"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>

                    <button type="submit">Login</button>
                </form>

                <div className="auth_link">
                    <p>Non hai un account? <Link to="/register">Registrati</Link> </p>
                </div>
            </div>
        </>
    )
}