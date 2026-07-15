import { useState } from "react";
import DeleteApplicationModal from "./DeleteApplicationModal";
import EditApplicationModal from "./EditApplicationModal";

export default function ApplicationCard({ application, onDelete, onUpdate }) {

    // MODIFICO UNA APPLICATION
    const [editApplication, setEditApplication] = useState(false)

    // ELIMINO UNA APPLICATION
    const [confirmDelete, setConfirmDelete] = useState(false)

    // note
    const [showNotes, setShowNotes] = useState(false)

    return (
        <>
            <div className={`application_card ${application.status}`}>

                {/* azienda */}
                <h3>{application.company_name}</h3>

                {/* posizione */}
                <p>
                    <strong>Posizione:</strong> {application.role}
                </p>

                {/* luogo */}
                <p>
                    <strong>Luogo:</strong> {application.location}
                </p>

                {/* link alla candidatura */}
                <p>
                    <strong>Link: </strong>
                    <a href={application.link_job} target="_blank">Visualizza offerta</a>
                </p>

                {/* note */}
                <div className="notes">

                    <button className={`notes_toggle ${showNotes ? "open" : ""}`} onClick={() => setShowNotes(!showNotes)}>
                        Note
                        <i className="bi bi-chevron-down"></i>
                    </button>

                    <div className={`notes_box ${showNotes ? "show" : ""}`}>
                        <p>{application.notes || "Nessuna nota"}</p>
                    </div>

                </div>

                {/* azioni */}
                <div className="card_actions">
                    <button className="primary_button" onClick={() => setEditApplication(true)}>
                        Modifica
                    </button>

                    <button className="danger_button" onClick={() => setConfirmDelete(true)}>
                        Elimina
                    </button>
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