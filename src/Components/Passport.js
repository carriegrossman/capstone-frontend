import React, { useState } from "react";
import Coloredline from "./Dumbline";

const Passport = () => {
  return (
    <div className="passportContainer">
      <h2 className="passporth3">CoffeePassport</h2>
      <Coloredline color="black" className="colorline"></Coloredline>
      <div className="coffeeshop">
        {/* change coffee image here  */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRP_NGG9RpIpBT3YtMZ3CQCL8GnuCpw5Aybg&usqp=CAU"
          alt="coffee"
        />
        <div>Company Name</div>
        <div>City</div>
        <div>Unstamped</div>
      </div>
      <div className="coffeeshop">
        {/* change coffee image here  */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRP_NGG9RpIpBT3YtMZ3CQCL8GnuCpw5Aybg&usqp=CAU"
          alt="coffee"
        />
        <div>Company Name</div>
        <div>City</div>
        <div>Unstamped</div>
      </div>
      <div className="coffeeshop">
        {/* change coffee image here  */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRP_NGG9RpIpBT3YtMZ3CQCL8GnuCpw5Aybg&usqp=CAU"
          alt="coffee"
        />
        <div>Company Name</div>
        <div>City</div>
        <div>Unstamped</div>
      </div>
      <div className="coffeeshop">
        {/* change coffee image here  */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRP_NGG9RpIpBT3YtMZ3CQCL8GnuCpw5Aybg&usqp=CAU"
          alt="coffee"
        />
        <div>Company Name</div>
        <div>City</div>
        <div>Unstamped</div>
      </div>
      <div className="coffeeshop">
        {/* change coffee image here  */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRP_NGG9RpIpBT3YtMZ3CQCL8GnuCpw5Aybg&usqp=CAU"
          alt="coffee"
        />
        <div>Company Name</div>
        <div>City</div>
        <button className="button">Unstamped</button>
      </div>
    </div>
  );
};

export default Passport;
