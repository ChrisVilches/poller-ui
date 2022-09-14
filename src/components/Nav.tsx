import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => (
  <nav className="sticky bg-red-600 py-5 px-2">
    <Link to="/pollings">Polling Activity</Link>
    <Link to="/about">About</Link>
  </nav>
);
