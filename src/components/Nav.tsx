import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => (
  <nav className="sticky bg-red-200 py-5 px-2">
    <Link to="/">Home</Link>
    <Link to="/pollings">Polling Activity</Link>
    <Link to="/about">About</Link>
  </nav>
);
