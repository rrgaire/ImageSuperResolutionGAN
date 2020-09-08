import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navBar";
import Body from "./components/body";
import Footer from "./components/footer";

function App() {
  return (
    <div className="page-container">
      {/* <div className="header-wrap">
        <NavBar />
      </div> */}
      <div className="content-wrap">
        <Body />
      </div>
      <div className="footer-wrap">
        <Footer />
      </div>
    </div>
  );
}

export default App;
