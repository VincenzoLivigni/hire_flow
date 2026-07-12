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

    return (
        <>
            <Header />

            <h1>Dashboard</h1>

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
            />

            <div>
                {
                    filteredApplications.length > 0 ? (
                        filteredApplications.map((a) => (
                            <div key={a.id}>
                                <ApplicationCard
                                    application={a}
                                    onDelete={fetchApplications}
                                />
                            </div>
                        ))
                    ) : (
                        <h4>Nessuna Candidatura trovata</h4>
                    )
                }
            </div>
        </>
    )
}