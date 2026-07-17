import ApplicationColumn from "./ApplicationColumn"

export default function ApplicationBoard({ applications, onDelete, onUpdate, showAlert }) {

    const columns = [
        {
            status: "applied",
            title: "Candidatura inviata"
        },
        {
            status: "interview",
            title: "Colloquio"
        },
        {
            status: "offer",
            title: "Offerta ricevuta"
        },
        {
            status: "rejected",
            title: "Rifiutata"
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