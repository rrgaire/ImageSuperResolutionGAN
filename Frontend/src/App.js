import React from "react";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./components/navBar";
import Body from "./components/body";
import Footer from "./components/footer";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <NavBar/>
        <Body/>
      </div>
      <div className="footer-wrap">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
