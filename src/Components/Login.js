import React, { useState } from "react";
import url from '../config'

function Login({ currentUser, setCurrentUser }) {
  const [formData, setFormData] = useState({});
  const [loginError, setLoginError] = useState(undefined);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(url+"/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === "Unauthorized") setLoginError("Incorrect Password");
        if (data.loggedin === "false") console.log("no user");
        else setCurrentUser(data.user);
      });
  };

  return (
    <div className="Form">
      <form className="Form1" onSubmit={handleSubmit}>
        <h1> Login Form</h1>
        <hr></hr>
        <section className="section">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button"
                type="submit"
                id="register-button"
              >
                Submit
              </button>
            </div>
            <div className="control">
              <button className="button" type="reset" id="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </section>
      </form>
      {loginError && <div>You entered an incorrect username or password.</div>}
    </div>
  );
}

export default Login;
