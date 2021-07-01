import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {DataContext} from '../App'

function Navbar() {

    const value = useContext(DataContext)
    const anotherAPi = () => {
        localStorage.removeItem('key')
        value.getAPIKey()
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Space Explore</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    {/* <NavLink to="/iss-tracker" activeClassName="active" className="nav-link">ISS Tracker</NavLink> */}
                    <NavLink to="/astriod-tracker" activeClassName="active" className="nav-link">Asteroid</NavLink>
                    <NavLink to="/mars" activeClassName="active" className="nav-link">Mars</NavLink>
                    <button className="btn btn-outline-light btn-sm" onClick={anotherAPi}>Enter another API</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
