import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"
import { getAllApplications } from "../services/api";
import Header from "../components/Header";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationFilters from "../components/ApplicationFilters";
import ApplicationBoard from "../components/ApplicationBoard";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import logo from "../assets/logo_hire_flow.png"

export default function Dashboard() {

    const { token } = useContext(GlobalContext)

    const navigate = useNavigate()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    // CREO UNA NUOVA APPLICATION
    async function fetchApplications() {
        try {
            setLoading(true)

            const data = await getAllApplications()

            setApplications(data)
        }
        catch (err) {
            console.log("Error:", err)
        }
        finally {
            setLoading(false)
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

    // Alert 
    const [alert, setAlert] = useState(null)

    function showAlert(message, type) {
        setAlert({
            message,
            type
        })

        setTimeout(() => {
            setAlert(null)
        }, 2000)
    }

    return (
        <>
            <Header />

            <ApplicationForm
                onCreated={fetchApplications}
                showAlert={showAlert}
            />

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

            {
                loading ? (
                    <p className="loading_message">Caricamento candidature...</p>
                ) : (
                    <ApplicationBoard
                        applications={filteredApplications}
                        onUpdate={fetchApplications}
                        onDelete={fetchApplications}
                        showAlert={showAlert}
                    />
                )
            }

            <Footer />

            <Alert
                alert={alert}
            />
        </>
    )
}