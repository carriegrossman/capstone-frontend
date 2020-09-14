import React from "react";

const Coloredline = ({ color }) => (
  <hr
    style={{
      color: color,
      background: color,
      height: 1,
      width: 1000,
      margin: 10,
    }}
  />
);

export default Coloredline;
