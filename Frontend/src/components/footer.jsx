import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section about"></div>
          <div className="footer-section link"></div>
          <div className="footer-section contact form"></div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 073BCT | Designed By 073BCT</p>
        </div>
      </div>
    );
  }
}

export default Footer;
