import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
// ---- Connect Pages to App.js ---- //
import MapHome from '../MapHome/MapHome';
import ModerateLocation from '../ModerateLocation/ModerateLocation';
import ModerateSingleLocation from '../ModerateSingleLocation/ModerateSingleLocation';
import ModerateUser from '../ModerateUser/ModerateUser';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LocationPage from '../LocationPage/LocationPage';
import AddLocation from '../AddLocation/AddLocation';
import AddReport from '../AddReport/AddReport';
import AddReviewPage from '../AddReview/AddReview';

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/addlocation"
              component={AddLocation}
            />
            <Route
              exact
              path="/addreport"
              component={AddReport}
            />
            <Route
              exact
              path="/addreview/:id"
              render={({match})=><AddReviewPage match={match}/>}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/add"
              component={AddLocation}
            />
            <ProtectedRoute
              exact
              path="/location/:id"
              render={({ match }) => <LocationPage match={match} />}
            />
            {/* This is the main Map component. */}
            <ProtectedRoute
              exact
              path="/MapHome"
              component={MapHome}
            />
            {/* This is the main Moderate Locations component. */}
            <ProtectedRoute
              exact
              path="/ModerateLocation"
              component={ModerateLocation}
            />
            {/* This is the main Moderate Single Locations component. */}
            <ProtectedRoute
              exact
              path="/ModerateSingleLocation/:id"
              component={ModerateSingleLocation}
            />
            {/* This is the main Moderate Users component. */}
            <ProtectedRoute
              exact
              path="/ModerateUser"
              component={ModerateUser}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);