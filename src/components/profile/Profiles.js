import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import ProfileItem from './ProfileItem';
import { Card } from 'semantic-ui-react';

import { getProfiles } from '../../actions/profileActions';


class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Loading />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div>
        <h1>Profiles</h1>
        <Card.Group>
          {profileItems}
        </Card.Group>
      </div>
    )
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles)
