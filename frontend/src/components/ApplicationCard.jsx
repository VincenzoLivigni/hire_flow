import { Link } from "react-router-dom";

export default function ApplicationCard({ application }) {

    const statusLabels = {
        applied: "Candidatura inviata",
        interview: "Colloquio",
        offer: "Offerta ricevuta",
        rejected: "Rifiutata"
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
            </div>
        </>
    )
}