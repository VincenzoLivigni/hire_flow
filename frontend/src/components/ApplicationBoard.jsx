import ApplicationColumn from "./ApplicationColumn"

export default function ApplicationBoard({ applications, onDelete, onUpdate }) {

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
                <div className="columns">
                    {
                        columns.map((column) => (
                            <div key={column.status} className="column_header">
                                <h4>{column.title}</h4>
                            </div>
                        ))
                    }
                </div>

                {/* contenuto dlle colonne */}
                <div className="columns_body">
                    {
                        columns.map((column) => (
                            <ApplicationColumn
                                key={column.status}
                                status={column.status}
                                applications={applications}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        ))
                    }
                </div>

            </div>
        </>
    )
}