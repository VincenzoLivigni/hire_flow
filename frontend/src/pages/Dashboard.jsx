import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"
import { getAllApplications } from "../services/api";
import Header from "../components/Header";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";

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

    return (
        <>
            <Header />

            <h1>Dashboard</h1>

            <ApplicationForm onCreated={fetchApplications} />

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

            <div>
                {
                    filteredApplications.map((a) => (
                        <div key={a.id}>
                            <ApplicationCard
                                application={a}
                                onDelete={fetchApplications}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}