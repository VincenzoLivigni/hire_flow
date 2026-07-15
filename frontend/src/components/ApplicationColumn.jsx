import ApplicationCard from "./ApplicationCard"

export default function ApplicationColumn({ status, applications, onDelete, onUpdate }) {

    const filtered = applications.filter((a) => a.status === status)

    return (
        <>
            {/* colonne */}
            <div className="column">

                {
                    filtered.map((a) => (
                        <ApplicationCard
                            key={a.id}
                            application={a}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))
                }

            </div>
        </>
    )
}