import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          ISGAN
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
