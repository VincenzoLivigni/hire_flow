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
            navigate("/login")
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (

        <>
            <h1>Registrazione</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Inserisci email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Inserisci password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Registrati</button>
            </form>

            {
                error && <h3>{error}</h3>
            }
        </>
    )
}