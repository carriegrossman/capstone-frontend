<<<<<<< HEAD
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Verification = () => {
  const [verificationCode, setVerificationCode] = useState(undefined);

  // const handleChange = (evt) => {
  //     setVerificationCode(evt.target.value)
  // }

  // const handleSubmit = (evt) => {
  //     if (verificationCode === "coffeerocks") {
  //         return (<Redirect to="/registerowner" />)
  //     }

  // }
=======
import React from "react"
import {Link} from "react-router-dom";

const Verification = () => {
    // const [verificationCode, setVerificationCode] = useState(undefined)

    // // const handleChange = (evt) => {
    // //     setVerificationCode(evt.target.value)
    // // }

    // // const handleSubmit = (evt) => {
    // //     if (verificationCode === "coffeerocks") {
    // //         return (<Redirect to="/registerowner" />)
    // //     }

    // // }
>>>>>>> origin/master

  return (
    <React.Fragment>
      <div className="verificationCode">
        <form>
          <label className="label">
            Verification Code
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter code from email"
                name="verificationCode"
                id="verificationCode"
                required
              />
            </div>
          </label>
          <Link className="button" to="/registerowner">
            Submit
          </Link>
          {/* <button className="button" type="submit" id="register-button" onClick={handleSubmit}>Submit</button> */}
        </form>
        <div>Mean to register as User?</div>
        <Link className="button" to="/register">
          Click Here!
        </Link>
      </div>
    </React.Fragment>
  );
};
export default Verification;
