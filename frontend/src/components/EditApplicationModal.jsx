import { useState } from "react"
import { updateApplication } from "../services/api"

export default function EditApplicationModal({ application, onClose, onUpdate, showAlert }) {

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
            showAlert("Candidatura modificata con successo!", "edit")
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <div className="modal_overlay">
                <div className="modal_container">

                    <form onSubmit={handleUpdate}>

                        <div className="row">

                            <div className="col-sm-12 col-md-6">
                                <div className="input_field">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                    <label>Modifica azienda</label>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div className="input_field">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label>Modifica posizione</label>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div className="input_field">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    <label>Modifica luogo</label>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div className="input_field">
                                    <select
                                        className={status ? "has_value" : ""}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="applied">Candidatura inviata</option>
                                        <option value="interview">Colloquio</option>
                                        <option value="offer">Offerta ricevuta</option>
                                        <option value="rejected">Rifiutata</option>
                                    </select>
                                    <label>Modifica stato</label>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input_field">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={link_job}
                                        onChange={(e) => setLink_job(e.target.value)}
                                    />
                                    <label>Modifica link candidatura</label>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input_field">
                                    <textarea
                                        className={notes ? "has_value" : ""}
                                        placeholder=" "
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                    <label>Modifica note</label>
                                </div>
                            </div>

                            <div className="modal_actions col-12">
                                <button type="submit" className="primary_button">Modifica</button>
                                <button type="button" className="secondary_button" onClick={onClose}>Annulla</button>
                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}