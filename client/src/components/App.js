import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import CocktailIndex from "./layout/CocktailIndex.js"
import IngredientShow from "./layout/IngredientShow.js"
import SignUpForm from "./registration/SignUpForm.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
          <div className="grid-container">
        <Switch>
            <Route exact path="/">
              <h2>Boston Craft Cocktails</h2>
            </Route>
            <Route exact path="/users/new" component={SignUpForm} />
            <Route exact path="/user-sessions/new" component={SignInForm} />
            <Route exact path="/ingredients/:id" component={IngredientShow} />
            <Route exact path="/cocktails" component={CocktailIndex} />
        </Switch>
          </div>
    </Router>
  );
};

export default hot(App);
