import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { SiteHeader } from '../../../components';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            users: [],
            workouts: []
        };
    };

    componentDidMount() {
        axios.post('/api/users/getUsers').then(res => res.data).then(res => {
            this.setState({users: (!res.error && res.results) ? res.results : []});

            axios.post('/api/users/getWorkout').then(res => res.data).then(res => {
                this.setState({workouts: !res.error && res.results ? res.results : []});
            })
        });
    }

    doesUserMatch(user) {
        return (
            user &&
            this.isUser(user) &&
            (
                this.state.searchQuery == '' ||
                (user.username && user.username.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (user.email && user.email.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (user.location && user.location.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (user.specialty && user.specialty.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (user.location && user.location.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (user.gender && user.gender.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) 
            )
        );
    }

    doesWorkoutMatch(workout) {
        return (
            workout && 
            this.isWorkout(workout) &&
            (
                this.state.searchQuery == '' ||
                (workout.filename && workout.filename.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (workout.location && workout.location.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (workout.gender && workout.gender.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1) ||
                (workout.plantype && workout.plantype.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1)
            )
        );
    }

    isUser(object) {
        return this.state.users.indexOf(object) > -1;
    }

    isWorkout(object) {
        return this.state.workouts.indexOf(object) > -1;
    }

    onSearchQueryChange(e) {
        this.setState({searchQuery: e.target.value});
    }

    renderObject(object) {
        if (!object) {
            return null;
        }

        if (this.isUser(object)) {
            return (
                <div className="searchResultContainer">
                    <a className="searchResult userResult" href={`/user/${object.id}`}>
                        <img src={object.image || "https://www.vippng.com/png/detail/80-804695_profile-picture-default-png.png"}/>
                        <h1>{object.username}</h1>
                        <div className="userExpertises">
                            <div className="userExpertise">Yoga</div>
                            <div className="userExpertise">Strength</div>
                            <div className="userExpertise">Training</div>
                        </div>
                    </a>
                </div>
            );
        }

        return (
            <div className="searchResultContainer">
                <a href="#" className="searchResult workoutResult">
                    <div className="workoutName">Workout: <span className="bold">{object.filename}</span></div>
                </a>
            </div>
        );
    }

    render() {
        // Create an array mixed with users and workouts
        const searchResults = [
            ...this.state.users,
            ...this.state.workouts
        ]

        return (
            <div id="search">
                <Head>
                    <title>Discover | Next Health</title>
                </Head>
                
                <SiteHeader page={'search'}/>

                <div className="searchHeader">
                    <svg width="100%" height="100%" className="css-yv2xpk"><defs><pattern id="bg_pattern" x="0" y="0" width="600" height="593" viewBox="0 0 600 593" fill="none" patternUnits="userSpaceOnUse"><rect opacity="0.75" x="8" y="388.182" width="260" height="197" rx="21" stroke="#EDE9FF" strokeWidth="16"></rect><rect opacity="0.75" x="310" y="494.318" width="260" height="197" rx="21" stroke="#EDE9FF" strokeWidth="16"></rect><rect opacity="0.75" x="8" y="144.568" width="260" height="197" rx="21" stroke="#EDE9FF" strokeWidth="16"></rect><rect opacity="0.75" x="310" y="250.704" width="260" height="197" rx="21" stroke="#EDE9FF" strokeWidth="16"></rect><rect opacity="0.75" x="8" y="-98.318" width="260" height="197" rx="21" stroke="#EDE9FF" strokeWidth="16"></rect><rect opacity="0.75" x="310" y="7.818" width="260" height="197" rx="21" stroke="#EDE9FF" strokeWidth="16"></rect></pattern></defs><rect width="100%" height="100%" fill="url(#bg_pattern)" stroke="none"></rect></svg>
                    <div className="searchHeaderContent">
                        <div className="searchHeaderText">Discover</div>
                        <p className="searchHeaderSubText">Find new workout plans and fitness professionals</p>
                    </div>
                </div>

                <div className="searchContent">
                    <input type="text" className="searchField" placeholder="Search..." onChange={(this.onSearchQueryChange.bind(this))}/>
                </div>
            
                <div className="searchResults">
                    {searchResults.filter(result => this.doesUserMatch(result) || this.doesWorkoutMatch(result)).map(result => this.renderObject(result))}
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
