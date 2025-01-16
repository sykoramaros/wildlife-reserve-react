import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
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
import UserEdit from "./Pages/Users/UserEdit"
import Roles from "./Pages/Roles/Roles"
import EditRole from "./Pages/Roles/EditRole"
import OurRoots from "./Pages/OurRoots/OurRoots"
import AnimalsTry from "./Pages/Try/AnimalsTry"
import PlantsTry from "./Pages/Try/PlantsTry"
import InsectsTry from "./Pages/Try/InsectsTry"
import FungiTry from "./Pages/Try/FungiTry"
import AccessDenied from "./Pages/AccessDenied/AccessDenied"
import ProtectedRoutes from "./Services/AccountService/ProtectedRoutes"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Nechranene cesty na stranky */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<AccessDenied />}></Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/our-roots" element={<OurRoots />} />

          {/* Chranene cesty na stranky */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/reserves" element={<Reserves />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/insects" element={<Insects />} />
            <Route path="/fungi" element={<Fungi />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/edit/:id" element={<UserEdit />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/roles/edit/:id" element={<EditRole />} />
            <Route path="/animals-try" element={<AnimalsTry />} />
            <Route path="/plants-try" element={<PlantsTry />} />
            <Route path="/insects-try" element={<InsectsTry />} />
            <Route path="/fungi-try" element={<FungiTry />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
