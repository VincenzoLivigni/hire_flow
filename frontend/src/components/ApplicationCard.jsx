import { Link } from "react-router-dom";
import { deleteApplication } from "../services/api";
import { useState } from "react";

export default function ApplicationCard({ application, onDelete }) {

    const statusLabels = {
        applied: "Candidatura inviata",
        interview: "Colloquio",
        offer: "Offerta ricevuta",
        rejected: "Rifiutata"
    }

    // ELIMINO UNA APPLICATION
    const [confirmDelete, setConfirmDelete] = useState(false)

    async function handleDelete() {
        try {
            await deleteApplication(application.id)

            onDelete()
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <div className="card">
                <h3>{application.company_name}</h3>

                <p><strong>Posizione:</strong> {application.role}</p>
                <p><strong>Luogo:</strong> {application.location}</p>
                <p><strong>Stato:</strong> {statusLabels[application.status]}</p>
                <p><strong>Link:</strong>
                    <Link to={application.link_job}>{application.link_job}</Link>
                </p>
                <p><strong>Note:</strong> {application.notes}</p>

                <button onClick={() => setConfirmDelete(true)}>Elimina</button>

                {
                    confirmDelete && (
                        <div className="alert alert-danger">
                            Vuoi eliminare questa candidatura?

                            <button onClick={handleDelete}>Conferm</button>
                            <button onClick={() => setConfirmDelete(false)}>Annulla</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}