import React, { useState } from "react";
import logo from "./images/brewsy1.png";
import homebanner from "./images/homebanner.png";

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
import Verification from "./Components/Verification";
import RegisterOwner from "./Components/RegisterOwner";
import Search from "./Components/Search";
import CoffeeShop from "./Components/CoffeeShop";
import RegisterShop from "./Components/RegisterShop";
import Users from "./Components/Users";
import MyCoffeeShops from "./Components/MyCoffeeShops";
import MyVisits from "./Components/MyVisits";
import MyRewards from "./Components/MyRewards";
import ProtectedRoute from "./Components/ProtectedRoute";
import Footer from "./Components/Footer";
import About from "./Components/About";

//
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentShop, setCurrentShop] = useState(undefined);
  const logOut = () => {
    setCurrentUser(undefined);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-start">
          <img src={logo} alt="brewsy logo" className="logo" />
        </div>

        <div className="navbar-end">
          {!currentUser && (
            <React.Fragment>
              <Link className="navbar-item" to="/login">
                Login
              </Link>
              <Link className="navbar-item" to="/register">
                Register
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
            </React.Fragment>
          )}

          {currentUser && (
            <React.Fragment>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/search">
                Search
              </Link>
              {/* <Link className="navbar-item" to="/myrewards">
                My Rewards
              </Link> */}
              <Link className="navbar-item" to="/myvisits">
                My Visits and Rewards
              </Link>
            </React.Fragment>
          )}

          {currentUser && currentUser.owner && (
            <React.Fragment>
              <Link className="navbar-item" to="/mycoffeeshops">
                My CoffeeShops
              </Link>
            </React.Fragment>
          )}

          {currentUser && (
            <React.Fragment>
              <Link className="button" onClick={logOut}>
                Log Out
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <img src={homebanner} className="homebanner" alt="homebanner" />
        </Route>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {currentUser && !currentUser.owner && <Redirect to="/search" />}
          {currentUser && currentUser.owner && <Redirect to="/mycoffeeshops" />}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/register">
          <Register setCurrentUser={setCurrentUser} />
          {currentUser && !currentUser.owner && <Redirect to="/search" />}
          {currentUser && currentUser.owner && <Redirect to="/mycoffeeshops" />}
        </Route>
        <Route path="/verifyshop">
          <Verification />
        </Route>
        <Route path="/registerowner">
          <RegisterOwner setCurrentUser={setCurrentUser} />
        </Route>
        <ProtectedRoute
          path="/registershop"
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          component={RegisterShop}
        />

        <ProtectedRoute
          path="/coffeeshop/:id"
          currentUser={currentUser}
          component={CoffeeShop}
        />
        <ProtectedRoute
          path="/search"
          currentUser={currentUser}
          component={Search}
        />
        <ProtectedRoute
          path="/:id/users"
          currentUser={currentUser}
          component={Users}
        />
        <ProtectedRoute
          path="/mycoffeeshops"
          currentUser={currentUser}
          setCurrentShop={setCurrentShop}
          component={MyCoffeeShops}
        />
        <ProtectedRoute
          path="/myvisits"
          currentUser={currentUser}
          component={MyVisits}
        />
        <ProtectedRoute
          path="/myrewards"
          currentUser={currentUser}
          component={MyRewards}
        />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
