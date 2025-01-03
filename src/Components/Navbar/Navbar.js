import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand fs-3 text-secondary" href="#">
            Wildlife Reserve
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto fs-5">
              <li class="nav-item">
                <Link
                  class="nav-link active text-info"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link class="nav-link" to={"/about"}>
                  Privacy
                </Link>
              </li> */}
              <li class="nav-item">
                <Link class="nav-link" to={"/reserves"}>
                  Reserves
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/animals"}>
                  Animals
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/plants"}>
                  Plants
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/insects"}>
                  Insects
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/fungi"}>
                  Fungi
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/users"}>
                  Users
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/try"}>
                  Try
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/roles"}>
                  Roles
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/our-roots"}>
                  OuRoots
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
