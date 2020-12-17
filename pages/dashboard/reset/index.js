import * as React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { Button, Spinner } from '../../../components';

import Logo from '../../../static/img/ident.png';

class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        const data = {
            email: this.state.email
        }
        
        axios.post('/api/users/reset', data).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error: res.error, loading: false});
                return;
            }

            this.setState({emailSent: true});
        });
    }

    renderError() {
        return (
            <div className="error">
                <svg aria-hidden="true" className="icon" height="12" width="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z" fillRule="evenodd"></path>
                </svg>
                <p className="message">{this.state.error.message}</p>
            </div>
        )
    }

    renderEmailNotSent() {
        return (
            <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onSubmit.bind(this)}>
                <a href="/" id="authLogo"><img src={Logo}/></a>

                <h1 className="mediumTitle">Reset your password.</h1>
                <p className="mediumParagraph">Enter the email address associated with your account, and we'll send you a reset link.</p>

                <label className="authFieldLabel">Email address</label>
                <input disabled={this.state.loading} name="email" onChange={this.onChange.bind(this)} value={this.state.email} className="authField" type="email" placeholder="name@domain.com" required/>

                {this.state.error ? this.renderError() : null}

                <div className="authButton">
                    <Button disabled={this.state.loading} type="button" className="black" noLink>Send link</Button>
                    {this.state.loading ? <Spinner/> : null}
                </div>

                <p className="authQuestion">Remembered your password? <a href="/dashboard/login"><span className="accent">Sign in</span>.</a></p>
            </form>
        )
    }

    renderEmailSent() {
        return (
            <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onSubmit.bind(this)}>
                <a href="/" id="authLogo"><img src={Logo}/></a>

                <p className="authNotice">
                    We've sent a password reset link to <strong>{this.state.email}</strong>. <br/>
                    Got it? Go ahead and <a className="accent" href="/dashboard/login"><strong>sign in</strong></a>.
                </p>
            </form>
        )
    }

    render() {
        return (
            <div id="reset" className="grid">
                <Head>
                    <title>Next Health: Reset your password</title>
                </Head>

                <div className="grid-col-12" id="formContainer">
                    {this.state.emailSent ? this.renderEmailSent() : this.renderEmailNotSent()}
                </div>
            </div>
        )
    }
}

Reset.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Reset);
