import ApplicationColumn from "./ApplicationColumn"

export default function ApplicationBoard({ applications, onDelete, onUpdate, showAlert }) {

    // stats
    const candidatureInviate = applications.filter((i) => i.status === "applied").length
    const colloqui = applications.filter((c) => c.status === "interview").length
    const offerte = applications.filter((i) => i.status === "offer").length
    const rifiutate = applications.filter((i) => i.status === "rejected").length

    const columns = [
        {
            status: "applied",
            title: "Candidatura inviata",
            stats: candidatureInviate
        },
        {
            status: "interview",
            title: "Colloquio",
            stats: colloqui
        },
        {
            status: "offer",
            title: "Offerta ricevuta",
            stats: offerte
        },
        {
            status: "rejected",
            title: "Rifiutata",
            stats: rifiutate
        }
    ]



    return (
        <>
            <div className="board">

                {/* intestazioni */}
                <div className="board_columns">
                    {
                        columns.map((column) => (
                            <div key={column.status} className={`column_wrapper ${column.status}`}>
                                <div className="column_header">
                                    <h4>{column.title}</h4>
                                    <span>{column.stats}</span>
                                </div>

                                <ApplicationColumn
                                    key={column.status}
                                    status={column.status}
                                    applications={applications}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                    showAlert={showAlert}
                                />
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}