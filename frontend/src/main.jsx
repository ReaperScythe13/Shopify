import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Shop from "./pages/shop/Shop"
import Login from "./pages/Login"
import AuthRequired from "./components/AuthRequired"

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                    <Route element={<AuthRequired />}>
                        <Route index element={<Home />} />
                        <Route path="shop" element={<Shop />} />
                    </Route>
                        
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);