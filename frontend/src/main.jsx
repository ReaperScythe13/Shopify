import React from "react"
import ReactDOM from "react-dom/client"
import Layout from "./components/Layout"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<button>Is it working?</button>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);