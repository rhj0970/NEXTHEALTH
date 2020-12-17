import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { shouldSignIn } from '../../utils/functions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    componentDidMount() {
        if (shouldSignIn(this.props)) {
            return;
        }

        this.setState({loading: false});
    }

    render() {
        return (
            <div id="dashboard">

            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Dashboard);