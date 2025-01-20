import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import LogoutButton from "../LogoutButton/LogoutButton"

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand fs-3 text-secondary" href="/home">
            <img
              src="./Photos/LogoImage.png"
              alt=""
              width="auto"
              height="50px"
            />
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
                  class="nav-link active text-success"
                  aria-current="page"
                  to={"/home"}
                >
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/reserves"}>
                  Reserves
                </Link>
              </li>
              <li class="nav-item dropdown">
                <button
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Observe
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to={"/animals"}>
                      Animals
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={"/plants"}>
                      Plants
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={"/insects"}>
                      Insects
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={"/fungi"}>
                      Fungi
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <button
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Try
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to={"/animals-try"}>
                      AnimalsTry
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={"/plants-try"}>
                      PlantsTry
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={"/insects-try"}>
                      InsectsTry
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={"/fungi-try"}>
                      FungiTry
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/users"}>
                  Users
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/roles"}>
                  Roles
                </Link>
              </li>
              <li class="nav-item me-3">
                <Link class="nav-link" to={"/our-roots"}>
                  OuRoots
                </Link>
              </li>
              <li class="nav-item">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
