import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { register } = useContext(GlobalContext)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (!email.trim()) {
            setError("Compila il campo email!")
            return
        }

        if (!password.trim()) {
            setError("Compila il campo password!")
            return
        }

        if (password.length < 6) {
            setError("La password deve contenere almeno 6 caratteri!")
            return
        }

        try {
            await register(email, password)
            navigate("/")
        }
        catch (err) {
            setError(err.message || "Registrazione non riuscita")
        }
    }

    return (

        <>
            <div className="register_container">
                <h1>Registrazione</h1>

                <form onSubmit={handleSubmit}>
                    {
                        error && <h3 className="register_error">{error}</h3>
                    }

                    <div className="input_field">
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>

                    <div className="input_field">
                        <input
                            type="password"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>

                    <button className="primary_button" type="submit">Registrati</button>
                </form>

                <div className="auth_link">
                    <p>Sei già registrato? <Link to="/">Accedi</Link> </p>
                </div>
            </div>
        </>
    )
}