import { useState } from "react"
import { updateApplication } from "../services/api"

export default function EditApplicationModal({ application, onClose, onUpdate }) {

    const [company, setCompany] = useState(application.company_name)
    const [role, setRole] = useState(application.role)
    const [location, setLocation] = useState(application.location)
    const [notes, setNotes] = useState(application.notes)
    const [link_job, setLink_job] = useState(application.link_job)
    const [status, setStatus] = useState(application.status)

    async function handleUpdate(e) {
        e.preventDefault()

        try {
            await updateApplication(
                application.id,
                company,
                role,
                location,
                notes,
                link_job,
                status
            )

            onClose()
            onUpdate()
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Azienda</label>
                    <input
                        type="text"
                        placeholder="Modifica azienda"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>

                <div>
                    <label>Posizione</label>
                    <input
                        type="text"
                        placeholder="Modifica posizione"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <div>
                    <label>Luogo</label>
                    <input
                        type="text"
                        placeholder="Modifica luogo"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <label>Link candidatura</label>
                    <input
                        type="text"
                        placeholder="Modifica link candidatura"
                        value={link_job}
                        onChange={(e) => setLink_job(e.target.value)}
                    />
                </div>

                <div>
                    <label>Stato</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="applied">Candidatura inviata</option>
                        <option value="interview">Colloquio</option>
                        <option value="offer">Offerta ricevuta</option>
                        <option value="rejected">Rifiutata</option>
                    </select>
                </div>

                <div>
                    <label>Note</label>
                    <textarea
                        placeholder="Modifica note"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button type="submit">Modifica candidatura</button>
            </form>
        </>
    )
}