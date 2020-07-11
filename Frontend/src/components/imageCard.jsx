import React from "react";
import { ClockLoader } from "react-spinners";

const ImageCard = ({ original, loading }) => (
  <div className="card-sr">
    <div className="row ">
      <div className="col-6 ">
        <img
          src={original}
          alt="Your Img"
          style={{ width: "100%", height: "auto" }}
        />
        <label
          htmlFor=""
          style={{
            float: "left",
            padding: "2px 9px",
            backgroundColor: "#8b0000",
            color: "white",
            borderRadius: "0.25rem",
          }}>
          Before
        </label>
      </div>
      {loading && (
        <div className="col-6 loader">
          <ClockLoader size={40} color="#aaa" />
        </div>
      )}
      {!loading && (
        <div className="col-6">
          <img
            src={original}
            alt="Your Img"
            style={{ width: "100%", height: "auto" }}
          />
          <label
            htmlFor=""
            style={{
              float: "right",
              padding: "2px 9px",
              backgroundColor: "#8b0000",
              color: "white",
              borderRadius: "0.25rem",
            }}>
            After
          </label>
        </div>
      )}
    </div>
  </div>
);

export default ImageCard;
