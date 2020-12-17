import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../../store/actions/authActions';

// Components
import { Button } from '../';

import Logo from '../../static/img/logo-black.png';

class SiteHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <header className="siteHeader">
                <div className="siteHeaderContainer">
                    <a href="/" className="siteHeaderLogo"><img src={Logo}/></a>

                    <div className="siteHeaderItems">
                        {this.props.page == 'search' ? <Button href="/dashboard/HomeClient" className="black" noBackground>{this.props.auth.authenticated || this.props.page == 'search' ? 'Home' : 'Sign in'}</Button> : null}
                        <Button onClick={() => this.props.auth.authenticated ? this.props.signOut() : undefined} href={this.props.page == 'search' ? '/' : '/dashboard/login'} className="black">{this.props.auth.authenticated || this.props.page == 'search' ? 'Sign out' : 'Sign in'}</Button>
                    </div>
                </div>
            </header>
        )
    }
}

SiteHeader.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({
    signOut
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteHeader);