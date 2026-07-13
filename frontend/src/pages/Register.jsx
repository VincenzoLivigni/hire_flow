import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { register } = useContext(GlobalContext)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        try {
            await register(email, password)
            navigate("/")
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (

        <>
            <div className="register_container">
                <h1>Registrazione</h1>

                {
                    error && <h3 className="register_error">{error}</h3>
                }

                <form onSubmit={handleSubmit}>
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
            </div>
        </>
    )
}