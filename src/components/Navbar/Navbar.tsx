import React from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { AiFillShopping } from "react-icons/ai";
import SearchInput from "./SearchInput";
import NavbarBottom from "./NavbarBottom";

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
          <div className="navbar-icons">
            <button className="navbar-icon">
              <VscAccount />
            </button>
            <button className="navbar-icon">
              <AiFillShopping />
            </button>
          </div>
          <SearchInput />
        </div>
      </div>
      <NavbarBottom />
    </nav>
  );
};

export default Navbar;
