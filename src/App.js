import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Layout from "./Components/Layout/Layout"
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Reserves from "./Pages/Reserves/Reserves"
import Animals from "./Pages/Animals/Animals"
import Plants from "./Pages/Plants/Plants"
import Insects from "./Pages/Insects/Insects"
import Fungi from "./Pages/Fungi/Fungi"
import Users from "./Pages/Users/Users"
import Roles from "./Pages/Roles/Roles"
import OurRoots from "./Pages/OurRoots/OurRoots"
import Try from "./Pages/Try/Try"
import ProtectedRoutes from "./Services/LoginSevice/ProtectedRoutes"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nechranene cesty na stranky */}

        {/* Chranene cesty na stranky */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reserves" element={<Reserves />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/insects" element={<Insects />} />
          <Route path="/fungi" element={<Fungi />} />
          <Route path="/try" element={<Try />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/our-roots" element={<OurRoots />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
