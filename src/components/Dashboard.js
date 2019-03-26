import React, { Component } from 'react';
import { Message, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SocketContext from '../socketContext';
import { getCurrentProfile } from '../actions/profileActions';
// import ProfileActions from './profile/Manage';

import Loading from './Loading';
import OnlineUser from './utils/OnlineUser';
import RecentActivity from './utils/RecentActivity';
import { Button } from 'semantic-ui-react';




class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const {user} = this.props.auth;
    const { profile,loading } = this.props.profile;

    const MessageCompleteProfile = () => (
      <Message info compact>
        <Message.Header>Hi! {user.name}</Message.Header>
        <p>You have not setup your profile yet, complete it now!</p>
        <Link to="/createProfile">
          <Button inverted color='blue'>Go!</Button>
        </Link>
      </Message>
    )


    let dashboardContent;
    if(profile === null || loading){
      dashboardContent = <Loading/>
    }else {
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
            <img src={user.avatar} alt={user.name} tittle={user.name} style={{with:'80px',height:'80px', margin: '2px auto'}}/>
            <h2> 
              <Link to={`/profile/${profile.handle}`}>
                {user.name}
              </Link>
            </h2>
            <h4>
            <Link to={`/manageProfile`}>
                Edit profile
              </Link>
            </h4>
          </div>
          )
      }else{
        dashboardContent = <MessageCompleteProfile/>
      }
    }
    return (
      <div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Grid.Row>
                <Segment>
                  {dashboardContent}
                </Segment>
              </Grid.Row>
              <Grid.Row>
                <RecentActivity/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={13}>
              <OnlineUser/>
            </Grid.Column>
          </Grid.Row>
      </Grid>
        
      </div>
    )
  }
}

const DashboardWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Dashboard {...props} socket={socket} />}
  </SocketContext.Consumer>
)

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(
  DashboardWithSocket
);