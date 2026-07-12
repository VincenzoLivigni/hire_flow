import { createContext, useState } from "react";
import { loginUser, registerUser } from "../services/api";

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    )

    // REGISTRAZIONE
    const register = async (email, password) => {
        try {
            const data = await registerUser(email, password)

            return data
        }
        catch (err) {
            console.log("Error:", err)
            throw err
        }
    }

    // LOGIN
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password)

            localStorage.setItem("token", data.token)

            setToken(data.token)
        }
        catch (err) {
            console.log("Error:", err)
            throw err
        }
    }

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <GlobalContext.Provider value={{
            token, setToken, login, logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}