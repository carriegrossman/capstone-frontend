import React, { useState } from "react";


function RegisterOwner({setCurrentUser}) {
    const [formData, setFormData] = useState({})

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch("/registerowner", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrentUser(data)
            })
    }
    return (
<div className="Form">
    <form className="Form1" onSubmit={handleSubmit}>
      <h1>Register Coffee Shop Owner</h1>
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
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
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

        <div className="field">
              <label className="label">Zip Code</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Zip Code"
                  name="zipcode"
                  id="zipcode"
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
  </div>
    );
}

export default RegisterOwner