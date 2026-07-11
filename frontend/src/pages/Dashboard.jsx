import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"
import { getAllApplications } from "../services/api";
import Header from "../components/Header";

export default function Dashboard() {

    const { token } = useContext(GlobalContext)

    const navigate = useNavigate()

    const [applications, setApplications] = useState([])

    useEffect(() => {
        if (!token) {
            navigate("/")
            return
        }

        async function fetchApplications() {
            try {
                const data = await getAllApplications()

                setApplications(data)
            }
            catch (err) {
                console.log("Error:", err)

            }
        }

        fetchApplications()

    }, [token, navigate])

    return (
        <>
            <Header />

            <h1>Dashboard</h1>

            <div>
                {
                    applications.map((a) => (
                        <div key={a.id}>
                            <p>{a.company_name}</p>
                            <p>{a.role}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}