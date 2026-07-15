import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"
import { getAllApplications } from "../services/api";
import Header from "../components/Header";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationFilters from "../components/ApplicationFilters";

export default function Dashboard() {

    const { token } = useContext(GlobalContext)

    const navigate = useNavigate()

    const [applications, setApplications] = useState([])

    // CREO UNA NUOVA APPLICATION
    async function fetchApplications() {
        try {
            const data = await getAllApplications()

            setApplications(data)
        }
        catch (err) {
            console.log("Error:", err)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/")
            return
        }

        fetchApplications()

    }, [token])

    // FILTRI
    const [searchCompany, setSearchCompany] = useState("")
    const [searchRole, setSearchRole] = useState("")
    const [filterLocation, setFilterLocation] = useState("Tutti")
    const [filterStatus, setFilterStatus] = useState("Tutti")

    const filteredApplications = applications.filter((a) => {
        return (
            a.company_name.toLowerCase().includes(searchCompany.toLocaleLowerCase()) &&
            a.role.toLowerCase().includes(searchRole.toLowerCase()) &&
            (filterLocation === "Tutti" || a.location === filterLocation) &&
            (filterStatus === "Tutti" || a.status === filterStatus)
        )
    })

    // Luogo
    const locations = [
        ...new Set(applications.map((a) => a.location))
    ]

    // Reset filtri
    function resetFilters() {
        setSearchCompany("")
        setSearchRole("")
        setFilterLocation("Tutti")
        setFilterStatus("Tutti")
    }

    return (
        <>
            <Header />

            <ApplicationForm onCreated={fetchApplications} />

            <ApplicationFilters
                searchCompany={searchCompany}
                setSearchCompany={setSearchCompany}
                searchRole={searchRole}
                setSearchRole={setSearchRole}
                filterLocation={filterLocation}
                setFilterLocation={setFilterLocation}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                locations={locations}
                resetFilters={resetFilters}
            />

            <div className="board">

                {/* intestazioni */}
                <div className="columns">
                    <div className="column_header">
                        <h4>Candidatura inviata</h4>
                    </div>

                    <div className="column_header">
                        <h4>Colloquio</h4>
                    </div>

                    <div className="column_header">
                        <h4>Offerta ricevuta</h4>
                    </div>

                    <div className="column_header">
                        <h4>Rifiutata</h4>
                    </div>
                </div>


                {/* contenuto dlle colonne */}
                <div className="columns_body">

                    {/* colonne "candidature inviate" */}
                    <div className="column">
                        {
                            filteredApplications
                                .filter(a => a.status === "applied")
                                .map(a => (
                                    <ApplicationCard
                                        key={a.id}
                                        application={a}
                                        onDelete={fetchApplications}
                                        onUpdate={fetchApplications}
                                    />
                                ))
                        }
                    </div>

                    {/* colonna "colloquio" */}
                    <div className="column">
                        {
                            filteredApplications
                                .filter(a => a.status === "interview")
                                .map(a => (
                                    <ApplicationCard
                                        key={a.id}
                                        application={a}
                                        onDelete={fetchApplications}
                                        onUpdate={fetchApplications}
                                    />
                                ))
                        }
                    </div>

                    {/* colonna "offerte ricevute" */}
                    <div className="column">
                        {
                            filteredApplications
                                .filter(a => a.status === "offer")
                                .map(a => (
                                    <ApplicationCard
                                        key={a.id}
                                        application={a}
                                        onDelete={fetchApplications}
                                        onUpdate={fetchApplications}
                                    />
                                ))
                        }
                    </div>

                    {/* colonna "rifiutata" */}
                    <div className="column">
                        {
                            filteredApplications
                                .filter(a => a.status === "rejected")
                                .map(a => (
                                    <ApplicationCard
                                        key={a.id}
                                        application={a}
                                        onDelete={fetchApplications}
                                        onUpdate={fetchApplications}
                                    />
                                ))
                        }
                    </div>

                </div>
            </div>
        </>
    )
}