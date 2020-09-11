import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//Components
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Passport from "./Components/Passport";
import Verification from "./Components/Verification";
import RegisterShop from "./Components/RegisterShop";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  //looks to see if current user cookie is still valid
  useEffect(() => {
    fetch("/currentUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.loggedin === "true") setCurrentUser(data.user);
      });
  }, []);
  return (
    <Router>
      {currentUser && <Redirect to="/userhome" />}
      <nav className="navbar">
        <div className="navbar-end">
          <Link className="navbar-item" to="/login">
            Login
          </Link>
          <Link className="navbar-item" to="/register">
            Register
          </Link>
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/userhome">
            Homepage
          </Link>
          <Link className="navbar-item" to="/passport">
            Coffee Passport
          </Link>
          <Link className="navbar-item" to="/userhome">
            travel mate
          </Link>
          <button className="button" onClick={() => setCurrentUser(undefined)}>
            Log Out
          </button>
        </div>
      </nav>

      <Switch>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {currentUser && <Redirect to="/userhome" />}
        </Route>
        <Route path="/register">
          <div>
            <Register setCurrentUser={setCurrentUser} />
            {currentUser && <Redirect to="/userhome" />}
          </div>
        </Route>
        <Route path="/verifyshop">
          <Verification />
        </Route>
        <Route path="/registershop">
          <RegisterShop setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/about"></Route>
        <Route path="/userhome">
          {currentUser && (
            <div>
              {currentUser.coffeeshop && <div>Welcome CoffeeShop</div>}
              {!currentUser.coffeeshop && <div>Welcome User</div>}
            </div>
          )}
        </Route>
        <Route path="/passport">
          {currentUser && <div>Welcome {currentUser.username}</div>}
          <Passport />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
