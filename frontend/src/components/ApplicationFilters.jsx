export default function ApplicationFilters({
    searchCompany,
    setSearchCompany,
    searchRole,
    setSearchRole,
    filterLocation,
    setFilterLocation,
    filterStatus,
    setFilterStatus,
    locations,
    resetFilters
}) {

    return (
        <>
            <div className="application_container">
                <div className="filters">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchCompany}
                                    onChange={(e) => setSearchCompany(e.target.value)}
                                />
                                <label>Cerca Azienda</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchRole}
                                    onChange={(e) => setSearchRole(e.target.value)}
                                />
                                <label>Cerca posizione</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <select
                                    className={filterLocation !== "Tutti" ? "has_value" : ""}
                                    value={filterLocation}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterLocation(e.target.value)
                                    }}
                                >
                                    <option value="Tutti">Tutti</option>
                                    {
                                        locations.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))
                                    }
                                </select>
                                <label>Filtra per luogo</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="input_field">
                                <select
                                    className={filterStatus !== "Tutti" ? "has_value" : ""}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="Tutti">Tutti</option>
                                    <option value="applied">Candidatura inviata</option>
                                    <option value="interview">Colloquio</option>
                                    <option value="offer">Offerta ricevuta</option>
                                    <option value="rejected">Rifiutata</option>
                                </select>
                                <label>Filtra per stato</label>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <button className="secondary_button" onClick={resetFilters}>Reset</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}