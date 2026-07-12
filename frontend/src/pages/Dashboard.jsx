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

    return (
        <>
            <Header />

            <h1>Dashboard</h1>

            <ApplicationForm onCreated={fetchApplications} />

            <div>
                {
                    applications.map((a) => (
                        <div key={a.id}>
                            <ApplicationCard
                                application={a}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}