const API = "http://localhost:3000/api"

// AUTENTICAZIONE 

// Registrazione
export async function registerUser(email, password) {
    const res = await fetch(`${API}/auth/register`, {
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
        throw new Error(data.message || "Errore durante la registrazione")
    }

    return data
}

// Login
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

// CANDIDATURE

// Creo una nuova candidatura
export async function createApplication(company_name, role, location, notes, link_job) {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            company_name, role, location, notes, link_job
        })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Azienda e posizione sono richiesti!")
    }

    return data
}

// Recupero tutte le candidature
export async function getAllApplications() {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API}/applications`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Errore recupero candidature")
    }

    return data
}

// Modifico una candidatura
export async function updateApplication(id, company_name, role, location, notes, link_job, status) {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API}/applications/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            company_name, role, location, notes, link_job, status
        })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Azienda e posizione sono richiesti!")
    }

    return data
}

// Elimino una candidatura
export async function deleteApplication(id) {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API}/applications/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Errore eliminazione candidatura")
    }

    return data
}