import React, { useState } from "react"
import {Redirect} from "react-router-dom"

const RegisterShop = ({ currentUser, setCurrentUser }) => {
    const [formData, setFormData] = useState({})
    const [currentShop, setCurrentShop] = useState(undefined)

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const sendingData = { ...formData, "id": currentUser.id }
        console.log(sendingData)
        fetch("http://xlhost:5000/registershop", {
            method: 'POST',
            body: JSON.stringify(sendingData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrentShop(data)
                
            })
            
    }

    if (currentShop) return (<Redirect to="/mycoffeeshops" />)

    return (<div>
        <h3>Welcome {currentUser.username}, Let's get your coffeeshop set up!</h3>
        <div className="registerForm">
        <form className="registerForm1" onSubmit={handleSubmit}>
            <h1>Set Up Your Coffee Shop</h1>

            <section className="section">
                <label className="label">Coffee Shop Name</label>
                    <div className="control">
                        <input 
                        className="input" 
                        type="text" 
                        placeholder="Enter Name" 
                        name="name" 
                        id="name" 
                        onChange={handleChange} 
                        required />
                </div>

                <div className="field">
                    <label className="label">Address</label>
                        <div className="control">
                            <input
                            className="input" 
                            type="text" 
                            placeholder="Address" 
                            name="address" 
                            id="address" 
                            onChange={handleChange} 
                            required
                            />
                    </div>
                </div>

                    <div className="field">
                        <label className="label">City</label>
                            <div className="control">
                                <input 
                                className="input" 
                                type="text" 
                                placeholder="City"
                                name="city" 
                                id="city" 
                                onChange={handleChange} 
                                required />
                            </div>
                        </div>


                        <div className="field">
                            <div className="control">
                            <label className="label">State</label>
                            <select className="select is-success">
                                <option value="GA">Georgia</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
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

                        <div className="field">
                            <label className="label">Tell us about your Coffee Shop </label>
                            <h3>What makes it special? What is your favorite nook? Your favorite drink?  </h3>
                            <div className="control">
                                <textarea className="textarea" type="text" id="about" name="about" placeholder="☕"  onChange={handleChange}required></textarea>
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
    </div>)


}

export default RegisterShop
