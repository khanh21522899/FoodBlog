import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import "../styles/nav.style.css"

const Navbar = ({ user }) => {
  console.log(user);
  return (
    <div className="navbar">
      <NavLink to="/" style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}>Home</NavLink>
      <NavLink to="/blogs/create-blog" style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}>Create Blog</NavLink>
      <NavLink to={user ? "/auth/dashboard" : "/auth/login"} style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}>{user ? user.name + "user" : "Login"}</NavLink>
    </div>
  )
}

export default Navbar;
