export default function Alert({ alert }) {

    if (!alert) return null

    return (
        <>
            <div className={`alert ${alert.type}`}>
                <p>{alert.message}</p>
            </div>
        </>
    )
}