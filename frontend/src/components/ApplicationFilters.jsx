export default function ApplicationFilters({
    searchCompany,
    setSearchCompany,
    searchRole,
    setSearchRole,
    filterLocation,
    setFilterLocation,
    filterStatus,
    setFilterStatus,
    locations
}) {

    return (
        <>
            <div className="filters">

                <div>
                    <label>Cerca Azienda</label>
                    <input
                        type="text"
                        placeholder="Cerca..."
                        value={searchCompany}
                        onChange={(e) => setSearchCompany(e.target.value)}
                    />
                </div>

                <div>
                    <label>Cerca posizione</label>
                    <input
                        type="text"
                        placeholder="Cerca..."
                        value={searchRole}
                        onChange={(e) => setSearchRole(e.target.value)}
                    />
                </div>

                <div>
                    <label>Filtra per luogo</label>
                    <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                    >
                        <option value="Tutti">Tutti</option>
                        {
                            locations.map((city) => (
                                <option key={city}>
                                    {city}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <label>Filtra per stato</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="Tutti">Tutti</option>
                        <option value="applied">Candidatura inviata</option>
                        <option value="interview">Colloquio</option>
                        <option value="offer">Offerta ricevuta</option>
                        <option value="rejected">Rifiutata</option>
                    </select>
                </div>
            </div>
        </>
    )
}