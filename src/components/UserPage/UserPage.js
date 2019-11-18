import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';


import LogOutButton from '../LogOutButton/LogOutButton';

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({type:'ADD_TO_HISTORY', payload: this.props.history.location.pathname})
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div className="userPage">
          <h2 className="userTitle">User Page</h2>
          <div className="userInfo">
          <h3>User ID: {this.props.reduxStore.user.id}</h3>
          <h3>Username: {this.props.reduxStore.user.username}</h3>
          <h3>First Name: {this.props.reduxStore.user.first_name}</h3>
          <h3>Last Name: {this.props.reduxStore.user.last_name}</h3>
          <h3>Email: </h3>
          </div>
          <br />
          {this.props.reduxStore.user.admin_level === 2 ? 
          <Button  fullWidth="true" variant="contained" color="primary" onClick={()=>this.props.history.push('/ModerateLocation')}>Location Approval</Button>
          :(null)       
          }
          {this.props.reduxStore.user.admin_level === 3 ?(
          <div className="userPageButtons">
          <Button  fullWidth="true" variant="contained" color="primary" onClick={()=>this.props.history.push('/ModerateLocation')}>Location Approval</Button>
          <br />
          <br />
          <Button  fullWidth="true" variant="contained" onClick={()=>this.props.history.push('/ModerateUser')}>Moderate Users</Button>
          </div>)
          :(null)}
          <br />
          <br />
          <LogOutButton className="log-in" />
        </div>
      </Router>
    )
  }
}
const mapStateToProps = (reduxStore) => ({
  reduxStore
});
export default withRouter(connect(mapStateToProps)(UserPage));