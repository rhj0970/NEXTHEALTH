import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import { SiteHeader } from '../../components';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {workouts: []};
    }

    static getInitialProps({query}) {
        return {query}
    }

    componentDidMount() {
        // Get this user's data
        axios.post('/api/users/getUserData', {user: this.props.query.id}).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error: res.error});
                return;
            }
            
            this.setState({user: res.user});

            // Get the user's workouts
            axios.post('/api/users/userWorkouts', {user: this.state.user.id}).then(res => res.data).then(res => {
                if (res.error) {
                    this.setState({error: res.error, workouts: []});
                    return;
                }

                this.setState({workouts: res.workouts});
            });
        })
    }

    render() {
        const user = this.state.user ? this.state.user : {username: 'Jane Doe'};
        
        return (
            <div id="userProfile">
                <Head>
                    <title>{user ? `${user.username} | Next Health` : 'Next Health'}</title>
                </Head>

                <SiteHeader/>

                <div className="userProfileHeader">
                    <div className="userProfileHeaderImage">
                        <img src="https://themudroom.org/wp-content/uploads/2017/11/adobestock_157352077.jpg"/>
                    </div>
                    <div className="userProfileHeaderContentContainer">
                        <div className="userProfilePicture"><img src={user.image || "https://www.vippng.com/png/detail/80-804695_profile-picture-default-png.png"}/></div>
                        <div className="userProfileHeaderInformation">
                            <span className="userProfileName">{user.username}</span>
                            <span className="userRole">Professional</span>
                            <div className="userTags">
                                <div className="userTag">Yoga</div>
                                <div className="userTag">Weight training</div>
                                <div className="userTag">Zoomba</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="userProfileSection">
                    <div className="userProfileSectionTitle">Featured Workouts</div>

                    <div className="userWorkouts">
                        {this.state.workouts.map(workout => (
                            <div className="userWorkoutContainer">
                                <div className="userWorkout">
                                    <div className="workoutName">{workout.filename}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="userTags">
                    <div className="userTag">Click to enter live session</div>
                    </div>
                    <a href="https://iu.zoom.us/j/5928765308s">
                    <img height="70px" src="../../static/img/zoom.png" className="userProfilePicture" />
                    </a>

                </div>
            </div>
        )
    }
}

User.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({

});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(User));
