import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import "../styles/nav.style.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}>Home</NavLink>
      <NavLink to="/create-blog" style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}>Create Blog</NavLink>
    </div>
  )
}

export default Navbar;
