import { Link } from "react-router-dom";
import { deleteApplication } from "../services/api";
import { useState } from "react";
import DeleteApplicationModal from "./DeleteApplicationModal";

export default function ApplicationCard({ application, onDelete }) {

    const statusLabels = {
        applied: "Candidatura inviata",
        interview: "Colloquio",
        offer: "Offerta ricevuta",
        rejected: "Rifiutata"
    }

    // ELIMINO UNA APPLICATION
    const [confirmDelete, setConfirmDelete] = useState(false)

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
            </div>

            {
                confirmDelete && (
                    <DeleteApplicationModal
                        application={application}
                        onClose={() => setConfirmDelete(false)}
                        onDelete={onDelete}
                    />
                )
            }
        </>
    )
}