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
import ProtectedRoute from "./Services/AccountService/ProtectedRoute"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Verejne trasy*/}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/" element={<Layout />}>
          <Route path="/our-roots" element={<OurRoots />} />
          <Route path="/reserves" element={<Reserves />} />

          {/* Layout s chranenymi trasami */}
          <Route path="/home" element={<Home />} />

          {/* Admin trasy */}
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <UserEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roles"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Roles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roles/edit/:id"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <EditRole />
              </ProtectedRoute>
            }
          />

          {/* Chranene trasy pro prihlasene Zoology */}
          <Route
            path="/animals"
            element={
              <ProtectedRoute roles={["Zoologist", "Admin"]}>
                <Animals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/animals-try"
            element={
              <ProtectedRoute roles={["Zoologist", "Admin"]}>
                <AnimalsTry />
              </ProtectedRoute>
            }
          />

          {/* Chranene trasy pro prihlasene Botaniky */}
          <Route
            path="/plants"
            element={
              <ProtectedRoute roles={["Botanist", "Admin"]}>
                <Plants />
              </ProtectedRoute>
            }
          />

          <Route
            path="/plants-try"
            element={
              <ProtectedRoute roles={["Botanist", "Admin"]}>
                <PlantsTry />
              </ProtectedRoute>
            }
          />

          {/* Chranene trasy pro prihlasene Entomology */}
          <Route
            path="/insects"
            element={
              <ProtectedRoute roles={["Entomologist", "Admin"]}>
                <Insects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/insects-try"
            element={
              <ProtectedRoute roles={["Entomologist", "Admin"]}>
                <InsectsTry />
              </ProtectedRoute>
            }
          />

          {/* Chranene trasy pro prihlasene Mykology */}
          <Route
            path="/fungi"
            element={
              <ProtectedRoute roles={["Mycologist", "Admin"]}>
                <Fungi />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fungi-try"
            element={
              <ProtectedRoute roles={["Mycologist", "Admin"]}>
                <FungiTry />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route pro neexistujici cesty v ramci aplikace */}
          <Route path="*" element={<AccessDenied />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
