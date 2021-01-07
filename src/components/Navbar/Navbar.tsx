import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import NavbarBottom from "./NavbarBottom";
import NavIcons from "./NavIcons";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-inner">
          <div className="navbar__logo">
            <Link className="navbar__logo-text" to="/">
              Home
            </Link>
          </div>
           <NavIcons/>
          <SearchInput />
        </div>
      </div>
      <NavbarBottom />
    </nav>
  );
};

export default Navbar;
