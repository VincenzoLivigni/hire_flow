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
            <div className="alert alert-danger">
                <p>Vuoi eliminare questa candidatura?</p>

                <button onClick={handleDelete}>Conferm</button>
                <button onClick={onClose}>Annulla</button>
            </div>
        </>
    )
}