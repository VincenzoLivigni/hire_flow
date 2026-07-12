import { useState } from "react"
import { createApplication } from "../services/api"

export default function ApplicationForm({ onCreated }) {

    // FORM
    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [location, setLocation] = useState("")
    const [link_job, setLink_job] = useState("")
    const [notes, setNotes] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        if (!company || !role) {
            return
        }

        try {
            await createApplication(company, role, location, notes, link_job)

            setCompany("")
            setRole("")
            setLocation("")
            setLink_job("")
            setNotes("")

            onCreated()
        }
        catch (err) {
            console.log("Error:", err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Azienda</label>
                    <input
                        type="text"
                        placeholder="Aggiungi azienda"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>

                <div>
                    <label>Posizione</label>
                    <input
                        type="text"
                        placeholder="Aggiungi posizione"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <div>
                    <label>Luogo</label>
                    <input
                        type="text"
                        placeholder="Aggiungi luogo"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <label>Link candidatura</label>
                    <input
                        type="text"
                        placeholder="Aggiungi link candidatura"
                        value={link_job}
                        onChange={(e) => setLink_job(e.target.value)}
                    />
                </div>

                <div>
                    <label>Note</label>
                    <textarea
                        placeholder="Aggiungi note"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button type="submit">Aggiungi candidatura</button>
            </form>
        </>
    )
}