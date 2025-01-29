import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserRole } from "../../Services/AuthenticationService/AuthenticationService"
import LogoutButton from "../LogoutButton/LogoutButton"
import "@popperjs/core"

const Navbar = () => {
  const [role, setRole] = useState(null)
  const [observeOpen, setObserveOpen] = useState(false)
  const [tryOpen, setTryOpen] = useState(false)

  useEffect(() => {
    const userRole = getUserRole()
    setRole(userRole)

    const closeDropdowns = (e) => {
      if (!e.target.closest(".dropdown-toggle")) {
        setObserveOpen(false)
        setTryOpen(false)
      }
    }
    document.addEventListener("click", closeDropdowns)
    return () => document.removeEventListener("click", closeDropdowns)
  }, [])

  const handleDropdownClick = (e, type) => {
    e.stopPropagation()
    if (type === "observe") {
      setObserveOpen(!observeOpen)
      setTryOpen(false) // Zavře druhý dropdown
    } else if (type === "try") {
      setTryOpen(!tryOpen)
      setObserveOpen(false) // Zavře druhý dropdown
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 text-secondary" href="/home">
            <img
              src="./Photos/LogoImage.png"
              alt=""
              width="auto"
              height="50px"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fs-5">
              <li className="nav-item">
                <Link
                  className="nav-link active text-success"
                  aria-current="page"
                  to={"/home"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/reserves"}>
                  Reserves
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={(e) => handleDropdownClick(e, "observe")}
                  aria-expanded={observeOpen}
                >
                  Observe
                </button>
                <ul className={`dropdown-menu ${observeOpen ? "show" : ""}`}>
                  {(role === "Admin" || role === "Zoologist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/animals"}>
                          Animals
                        </Link>
                      </li>
                    </>
                  )}
                  {(role === "Admin" || role === "Botanist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/plants"}>
                          Plants
                        </Link>
                      </li>
                    </>
                  )}
                  {(role === "Admin" || role === "Entomologist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/insects"}>
                          Insects
                        </Link>
                      </li>
                    </>
                  )}
                  {(role === "Admin" || role === "Mycologist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/fungi"}>
                          Fungi
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={(e) => handleDropdownClick(e, "try")}
                  aria-expanded={tryOpen}
                >
                  Try
                </button>
                <ul className={`dropdown-menu ${tryOpen ? "show" : ""}`}>
                  {(role === "Admin" || role === "Zoologist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/animals-try"}>
                          AnimalsTry
                        </Link>
                      </li>
                    </>
                  )}
                  {(role === "Admin" || role === "Botanist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/plants-try"}>
                          PlantsTry
                        </Link>
                      </li>
                    </>
                  )}
                  {(role === "Admin" || role === "Entomologist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/insects-try"}>
                          InsectsTry
                        </Link>
                      </li>
                    </>
                  )}
                  {(role === "Admin" || role === "Mycologist") && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={"/fungi-try"}>
                          FungiTry
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              {(role === "Admin" || role === "Director") && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/users"}>
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/roles"}>
                      Roles
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item me-3">
                <Link className="nav-link" to={"/our-roots"}>
                  OuRoots
                </Link>
              </li>
              <li className="nav-item">
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

// import React from "react"
// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { getUserRole } from "../../Services/AuthenticationService/AuthenticationService"
// import LogoutButton from "../LogoutButton/LogoutButton"
// import "@popperjs/core"

// const Navbar = () => {
//   const [role, setRole] = useState(null)
//   const [observeOpen, setObserveOpen] = useState(false)
//   const [tryOpen, setTryOpen] = useState(false)

//   useEffect(() => {
//     const userRole = getUserRole()
//     setRole(userRole)
//   }, [])

//   useEffect(() => {
//     const closeDropdowns = () => {
//       setObserveOpen(false)
//       setTryOpen(false)
//     }
//     document.addEventListener("click", closeDropdowns)
//     return () => {
//       document.removeEventListener("click", closeDropdowns)
//     }
//   }, [])

//   const HandleDropdownClick = (event, dropdownSetter) => {
//     event.stopPropagation()
//     dropdownSetter(prev => !prev)

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand fs-3 text-secondary" href="/home">
//             <img
//               src="./Photos/LogoImage.png"
//               alt=""
//               width="auto"
//               height="50px"
//             />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto fs-5">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active text-success"
//                   aria-current="page"
//                   to={"/home"}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/reserves"}>
//                   Reserves
//                 </Link>
//               </li>
//               <li className="nav-item dropdown">
//                 <button
//                   className="nav-link dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                   onClick={(event) => HandleDropdownClick(event, setObserveOpen)}
//                   aria-expanded={observeOpen}

//                 >
//                   Observe
//                 </button>
//                 <ul className={"dropdown-menu " + (observeOpen ? "show" : "")}>
//                   {(role === "Admin" || role === "Zoologist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/animals"}>
//                           Animals
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                   {(role === "Admin" || role === "Botanist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/plants"}>
//                           Plants
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                   {(role === "Admin" || role === "Entomologist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/insects"}>
//                           Insects
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                   {(role === "Admin" || role === "Mycologist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/fungi"}>
//                           Fungi
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <button
//                   className="nav-link dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                   onClick={(event) => HandleDropdownClick(event, setTryOpen)}
//                   aria-expanded={tryOpen}
//                 >
//                   Try
//                 </button>
//                 <ul className={"dropdown-menu " + (tryOpen ? "show" : "")} id="dropdown-menu">
//                   {(role === "Admin" || role === "Zoologist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/animals-try"}>
//                           AnimalsTry
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                   {(role === "Admin" || role === "Botanist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/plants-try"}>
//                           PlantsTry
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                   {(role === "Admin" || role === "Entomologist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/insects-try"}>
//                           InsectsTry
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                   {(role === "Admin" || role === "Mycologist") && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to={"/fungi-try"}>
//                           FungiTry
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </li>
//               {/* Zobrazit pouze pokud je uživatel Admin nebo Director */}
//               {(role === "Admin" || role === "Director") && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to={"/users"}>
//                       Users
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to={"/roles"}>
//                       Roles
//                     </Link>
//                   </li>
//                 </>
//               )}
//               <li className="nav-item me-3">
//                 <Link className="nav-link" to={"/our-roots"}>
//                   OuRoots
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <LogoutButton />
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Navbar
