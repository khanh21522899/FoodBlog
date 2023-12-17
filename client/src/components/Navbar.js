import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../styles/nav.style.css"
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'

const NavB = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const logout = useLogout()

  const handleLogout = async e => {
    e.preventDefault();
    await logout()
    navigate('/')
  }

  return (
    <div className="navbar">
      <NavLink className="nav-home" to="/" style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}></NavLink>
      <button className={user ? "nav-user" : ""}>
        <NavLink to={user ? "/auth/dashboard" : "/auth/login"} style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}>{user ? user.email : "Login"}</NavLink>
      </button>
      <button onClick={handleLogout} style={user ? {} : { display: "none" }}>Log out</button>

    </div>
  )
}

export default NavB;
