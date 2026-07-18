import ApplicationCard from "./ApplicationCard"

export default function ApplicationColumn({ status, applications, onDelete, onUpdate, showAlert }) {

    const filteredApplications = applications.filter((a) => a.status === status)

    return (
        <>
            {/* candidature della colonna */}
            <div className="column">

                {
                    filteredApplications.map((a) => (
                        <ApplicationCard
                            key={a.id}
                            application={a}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            showAlert={showAlert}
                        />
                    ))
                }

            </div>
        </>
    )
}