import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import React from 'react';

function Navbars() {
    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => logoutUser()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Logo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active ">
                        <Link to='/back-end'>
                            <a className="nav-link ">Backend<span className="sr-only">(current)</span></a>
                        </Link>

                    </li>
                    <li className="nav-item active">
                        <Link to='/font-end'>
                            <a className="nav-link ">Fontend<span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='/story-devs'>
                            <a className="nav-link">Story devs<span className="sr-only">(current)</span></a>
                        </Link>

                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Acount
              </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a id='manager' className="dropdown-item fa fa-address-book-o" href="#">&#160;Management</a>
                            <a id='setting' className="dropdown-item fa fa-cog" href="#">&#160;Setting</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item fa fa-power-off" onClick={logout} href="#">&#160;Logout</a>
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>


                </form>
            </div>
        </nav>

    )
}
export default Navbars;