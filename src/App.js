import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//Components
import './App.css';
import Register from "./Components/Register"
import Login from "./Components/Login"
import Passport from "./Components/Passport"
import Verification from "./Components/Verification"
import RegisterOwner from "./Components/RegisterOwner"
import Search from "./Components/Search"
import CoffeeShop from "./Components/CoffeeShop"
import RegisterShop from "./Components/RegisterShop"
//
function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentSearch, setCurrentSearch] = useState(undefined)


  const logOut = () => {
    setCurrentUser(undefined)
  }
  //looks to see if current user cookie is still valid
  useEffect(() => {
    fetch("/currentUser")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.loggedin === "true") setCurrentUser(data.user)
      })
  }, [])



  return (
    <Router>
      {currentUser && <Redirect to="/userhome" />}
      <nav className="navbar">
        <div className="navbar-end">
          <Link className="navbar-item" to="/login">Login</Link>
          <Link className="navbar-item" to="/register">Register</Link>
          <Link className="navbar-item" to="/about">About</Link>
          <Link className="navbar-item" to="/userhome">Homepage</Link>
          <Link className="navbar-item" to="/passport">Coffee Passport</Link>
          <Link className="navbar-item" to="/search">Search</Link>
          <button className="button" onClick={logOut}>Log Out</button>
        </div>
      </nav>

      <Switch>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {currentUser && currentUser.coffeeshop && <Redirect to="/userhome" />}
        </Route>
        <Route path="/register">
          <div>
            <Register setCurrentUser={setCurrentUser} />
            {currentUser &&
              <React.Fragment>
                {currentUser.coffeeshop && <Redirect to="/coffeeshop" />}
                {!currentUser.coffeeshop && <Redirect to="/userhome" />}
              </React.Fragment>
            }
          </div>
        </Route>
        <Route path="/verifyshop">
          <Verification />
        </Route>
        <Route path="/registershop">
          <RegisterOwner setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/about">
        </Route>
        <Route path="/coffeeshop/:id" component={CoffeeShop}>
        </Route>
        <Route path="/userhome">
          {currentUser && currentUser.coffeeshop && <RegisterShop currentUser={currentUser}/>}
        </Route>
        <Route path="/passport">
          {currentUser && <div>Welcome {currentUser.username}</div>}
          <Passport />
        </Route>
        <Route path="/search">
          <Search currentSearch={currentSearch} setCurrentSearch={setCurrentSearch} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
