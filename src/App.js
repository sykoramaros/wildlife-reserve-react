import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Layout from "./Components/Layout/Layout"
import Home from "./Pages/Home/Home"
import Reserves from "./Pages/Reserves/Reserves"
import Animals from "./Pages/Animals/Animals"
import Plants from "./Pages/Plants/Plants"
import Insects from "./Pages/Insects/Insects"
import Fungi from "./Pages/Fungi/Fungi"
import Users from "./Pages/Users/Users"
import Roles from "./Pages/Roles/Roles"
import OurRoots from "./Pages/OurRoots/OurRoots"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reserves" element={<Reserves />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/insects" element={<Insects />} />
          <Route path="/fungi" element={<Fungi />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/ourroots" element={<OurRoots />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
