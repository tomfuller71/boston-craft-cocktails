import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import CocktailIndex from "./layout/CocktailIndex.js"
import IngredientShow from "./layout/IngredientShow.js"
import SignUpForm from "./registration/SignUpForm.js"
import VenueIndex from "./layout/venues/VenueIndex.js"
import AddCocktailForm from "./layout/AddCocktailForm.js"
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js"
import CocktailShow from "./layout/CocktailShow.js"

const App = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <div className="grid-container fluid">
        <div className="grid-y medium-grid-frame">
          <div className="cell shrink header medium-cell-block-container">
            <TopBar user={currentUser} />
          </div>
          <div className="cell medium-auto medium-cell-block-container">
            <div className="cell medium-4 medium-cell-block-y">
              <Switch>
                <Route exact path="/">
                  <VenueIndex user={currentUser} />
                </Route>

                <Route exact path="/users/new" component={SignUpForm} />

                <Route exact path="/user-sessions/new" component={SignInForm} />

                <Route exact path="/ingredients/:id" component={IngredientShow}
								/>

                <Route exact path="/venues/cocktails/">
                  <CocktailIndex user={currentUser} />
                </Route>

                <Route exact path="/cocktails/:id">
                  <CocktailShow user={currentUser} />
                </Route>

                <Route exact path="/cocktails">
                  <CocktailIndex user={currentUser} />
                </Route>

                <AuthenticatedRoute
                  exact path="/venues/:venueId/addCocktail"
                  component={AddCocktailForm}
                  user={currentUser}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
};

export default hot(App);
