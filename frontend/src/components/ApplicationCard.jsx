import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteApplicationModal from "./DeleteApplicationModal";
import EditApplicationModal from "./EditApplicationModal";

export default function ApplicationCard({ application, onDelete, onUpdate }) {

    const statusLabels = {
        applied: "Candidatura inviata",
        interview: "Colloquio",
        offer: "Offerta ricevuta",
        rejected: "Rifiutata"
    }

    // MODIFICO UNA APPLICATION
    const [editApplication, setEditApplication] = useState(false)

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

                <div>
                    <button onClick={() => setEditApplication(true)}>Modifica</button>
                    <button onClick={() => setConfirmDelete(true)}>Elimina</button>
                </div>
            </div>

            {
                editApplication && (
                    <EditApplicationModal
                        application={application}
                        onClose={() => setEditApplication(false)}
                        onUpdate={onUpdate}
                    />
                )
            }

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