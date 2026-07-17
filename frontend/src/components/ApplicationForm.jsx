import { useState } from "react"
import { createApplication } from "../services/api"

export default function ApplicationForm({ onCreated, showAlert }) {

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

            showAlert("Candidatura aggiunta con successo!", "add")
        }
        catch (err) {
            console.log("Error:", err)
        }
    }

    return (
        <>
            <div className="application_container">

                <h2 className="section_title">Aggiungi candidatura</h2>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                                <label>Azienda</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label>Posizione</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <label>Luogo</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={link_job}
                                    onChange={(e) => setLink_job(e.target.value)}
                                />
                                <label>Link candidatura</label>
                            </div>
                        </div>
                    </div>

                    <div className="form_application_bottom">
                        <div className="col-12">
                            <div className="input_field">
                                <textarea
                                    placeholder=" "
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                                <label>Note</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <button className="primary_button" type="submit">Aggiungi</button>
                    </div>
                </form>
            </div>
        </>
    )
}