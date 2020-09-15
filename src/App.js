import React, { useState } from "react";
import logo from './images/brewsy1.png';

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
import Verification from "./Components/Verification"
import RegisterOwner from "./Components/RegisterOwner"
import Search from "./Components/Search"
import CoffeeShop from "./Components/CoffeeShop"
import RegisterShop from "./Components/RegisterShop"
import Users from "./Components/Users"
import MyCoffeeShops from "./Components/MyCoffeeShops"
import MyVisits from "./Components/MyVisits"
import MyRewards from "./Components/MyRewards"
import ProtectedRoute from "./Components/ProtectedRoute";
//
function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  // const [currentSearch, setCurrentSearch] = useState(undefined)
  const [currentShop, setCurrentShop] = useState(undefined)


  const logOut = () => {
    setCurrentUser(undefined)
  }
  //looks to see if current user cookie is still valid
  // useEffect(() => {
  //   fetch("/currentUser")
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.loggedin === "true") setCurrentUser(data.user)
  //     })
  // }, [])

 



  return (
    <Router>
      {/* {currentUser && <Redirect to="/userhome" />} */}
      <nav className="navbar">
      <img src={logo} alt="brewsy logo" className="logo"/>
        <div className="navbar-end">
          {!currentUser &&
          <React.Fragment>
          <Link className="navbar-item" to="/login">Login</Link>
          <Link className="navbar-item" to="/register">Register</Link>
          <Link className="navbar-item" to="/about">About</Link>
          </React.Fragment>
          }

          {currentUser  &&
          <React.Fragment>
          <Link className="navbar-item" to="/about">About</Link>
          <Link className="navbar-item" to="/search">Search</Link>
          <Link className="navbar-item" to="/myrewards">My Rewards</Link>
          <Link className="navbar-item" to="/myvisits">My Visits</Link>
          </React.Fragment>
          }

          {currentUser  && currentUser.owner &&
          <React.Fragment>
          <Link className="navbar-item" to="/mycoffeeshops">My CoffeeShops</Link>
          </React.Fragment>
          }

        {currentUser  &&
          <React.Fragment>
          <button className="navbar-item" onClick={logOut}>Log Out</button>
          </React.Fragment>
          }   
        </div>
      </nav>

      <Switch>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {currentUser && !currentUser.owner && <Redirect to="/search" />}
          {currentUser && currentUser.owner && <Redirect to="/mycoffeeshops" />}
        </Route>
        <Route path="/about"/>
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
        <Route path="/registershop">
          <RegisterShop setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </Route>

        <ProtectedRoute path="/coffeeshop/:id" currentUser={currentUser} component={CoffeeShop}/>
        <ProtectedRoute path="/search" currentUser={currentUser} component={Search}/>
        <ProtectedRoute path="/:id/users" currentUser={currentUser} component={Users}/>
        <ProtectedRoute path="/mycoffeeshops" currentUser={currentUser} currentShop={currentShop} setCurrentShop={setCurrentShop} component={MyCoffeeShops}/>
        <ProtectedRoute path="/myvisits" currentUser={currentUser} component={MyVisits}/>
        <ProtectedRoute path="/myrewards" currentUser={currentUser} currentShop={currentShop} component={MyRewards}/>

      </Switch>
    </Router>
  );
}
export default App;
