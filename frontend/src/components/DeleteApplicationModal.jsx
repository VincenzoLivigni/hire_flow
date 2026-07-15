import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { deleteApplication } from "../services/api"

export default function DeleteApplicationModal({ application, onClose, onDelete }) {

    async function handleDelete() {
        try {
            await deleteApplication(application.id)

            onClose()
            onDelete()
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <div className="modal_overlay">
                <div className="modal_container">

                    <div className="delete_alert">
                        <h5>Sei sicuro di voler eliminare la candidatura presso <strong>{application.company_name}</strong>?</h5>

                        <div className="modal_actions">
                            <button onClick={handleDelete} className="danger_button">Elimina</button>
                            <button onClick={onClose} className="secondary_button">Annulla</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}