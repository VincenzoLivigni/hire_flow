const API = "http://localhost:3000/api"

// LOGIN
export async function loginUser(email, password) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Errore durante il login")
    }

    return data
}
