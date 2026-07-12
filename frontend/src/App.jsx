import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GlobalProvider } from "./contexts/GlobalContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
