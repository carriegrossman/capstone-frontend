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
  const [currentSearch, setCurrentSearch] = useState(undefined)
  const [currentShop, setCurrentShop] = useState(undefined)


  const logOut = () => {
    setCurrentUser(undefined)
  }
  //looks to see if current user cookie is still valid
  useEffect(() => {
    fetch("/currentUser")
      .then(res => res.json())
      .then(data => {
        if (data.loggedin === "true") setCurrentUser(data.user)
      })
  }, [])

  const Protected = () => <h3>Protected</h3>
  console.log(currentUser)

  return (
    <Router>
      {/* {currentUser && <Redirect to="/userhome" />} */}
      <nav className="navbar">
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
          <Link className="navbar-item" to="/about">My Visits</Link>
          </React.Fragment>
          }

          {currentUser  && currentUser.owner &&
          <React.Fragment>
          <Link className="navbar-item" to="/mycoffeeshops">My CoffeeShops</Link>
          </React.Fragment>
          }

        {currentUser  &&
          <React.Fragment>
          <button className="logout navbar-item" onClick={logOut}>Log Out</button>
          </React.Fragment>
          }   
        </div>
      </nav>

      <Switch>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {currentUser && currentUser.owner && <Redirect to="/userhome" />}
        </Route>
        <Route path="/register">
            <Register setCurrentUser={setCurrentUser} />
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
        <ProtectedRoute path="/about"/>
        <Route path="/coffeeshop/:id" component={CoffeeShop}/>
        <Route path="/userhome">
          {currentUser && currentUser.owner && <RegisterShop currentUser={currentUser} />}
        </Route>
        <Route path="/passport">
          {currentUser && <div>Welcome {currentUser.username}</div>}
        </Route>
        <Route path="/search">
          <Search currentSearch={currentSearch} setCurrentSearch={setCurrentSearch} />
        </Route>
        <Route path="/allusers">
          <Users currentShop={currentShop} setCurrentShop={setCurrentShop} />
        </Route>
        <Route path="/:id/users" component={Users}/>
        <Route path="/mycoffeeshops">
          <MyCoffeeShops currentUser={currentUser} currentShop={currentShop} setCurrentShop={setCurrentShop} />
        </Route>
        <Route path="/myvisits">
          <MyVisits currentUser={currentUser} />
        </Route>
        <ProtectedRoute path='/protected' currentUser={currentUser} component={Protected} />

        <Route path="/myrewards">
          <MyRewards currentUser={currentUser} currentShop={currentShop} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
