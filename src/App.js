import React, { useState } from "react";
import homebanner from "./images/homebanner.png"


import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import About from "./Components/About"
import Nav from "./Components/Nav"


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentShop, setCurrentShop] = useState(undefined);

  return (
    <Router>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
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
