import * as React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../../store/actions/authActions';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../../../utils/functions';

import { Button, Checkbox, Spinner } from '../../../components';

import Logo from '../../../static/img/ident.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', staySignedIn: true, twoFactorStep: 0};
    }

    checkIfAuthenticated(props) {
        if (props.auth.authenticated) {
            this.setState({loading: true});

            setTimeout(() => {
                if (props.auth.user.role == 1) {
                    window.location.assign("/dashboard/HomeClient")
                }
    
                else if (props.auth.user.role == 2) {
                    window.location.assign("/dashboard/HomeMain")
                }
    
                else if (props.auth.user.role == 3) {
                    window.location.assign("/dashboard/HomeAdmin")
                }
            }, 2500);
        }
    }

    componentDidMount() {
        this.checkIfAuthenticated(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.checkIfAuthenticated(nextProps);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({error: null, loading: true});

        const data = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post('/api/users/login', data).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error: res.error, loading: false});
                return;
            }
        });


        axios.post('/api/users/createToken', {email:data.email}).then(res => res.data).then(res => {
            this.setState({loading: false, twoFactorStep: 1})
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

    googleResponse(response) {
        if (!response.profileObj) {
            return;
        }

        axios.post('/api/users/createToken', {email:response.profileObj.email}).then(res => res.data).then(res => {
            this.setState({loading: false, twoFactorStep: 1})
        });
    }

    renderLoginForm() {
        return (
            <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onSubmit.bind(this)}>
                <a href="/" id="authLogo"><img src={Logo}/></a>

                <h1 className="mediumTitle">Sign in.</h1>
                <p className="mediumParagraph">Access your dashboard by signing in to your Next Health account.</p>

                <label className="authFieldLabel">Email address</label>
                <input disabled={this.state.loading} name="email" onChange={this.onChange.bind(this)} value={this.state.email} className="authField" type="email" placeholder="name@domain.com" required/>

                <label className="authFieldLabel">Password</label>
                <input disabled={this.state.loading} name="password" onChange={this.onChange.bind(this)} value={this.state.password} className="authField" type="password" minLength="8" placeholder="at least 8 characters" required/>
            
                <Checkbox name="staySignedIn" label="Stay signed in for a week" onChange={this.onChange.bind(this)} value={this.state.staySignedIn} defaultChecked={true}/>

                {this.state.error ? this.renderError() : null}

                <div className="authButton">
                    <Button disabled={this.state.loading} type="button" className="black" noLink>Sign in</Button>
                    {this.state.loading ? <Spinner/> : null}

                    <GoogleLogin
                    className="googlePrompt"
                    clientId="852485028712-2ne7obuf233aaotrv6llgnidne2oigfe.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                    onSuccess={this.googleResponse.bind(this)}
                    onFailure={this.googleResponse.bind(this)}
                    cookiePolicy={'single_host_origin'}/>
                </div>

                <p className="authQuestion">Don't have an account? <a href="/dashboard/register"><span className="accent">Sign up</span>.</a></p>
                <p className="authQuestion"><a href="/dashboard/reset"><span className="accent">Forgot your password?</span></a></p>
            </form>
        )
    }




    onToken(e) {
        e.preventDefault()
        this.setState({loading: true})
        axios.post('/api/users/submit', {token:e.target.token.value, staySignedIn: this.state.staySignedIn}).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error:res.error, loading: false})
                return 
            }   
            
            const jwtToken = res.token;

            setAuthToken(jwtToken);
            this.props.setUser(jwt_decode(jwtToken));

            if (this.props.auth.user.role == 1) {
                window.location.assign("/dashboard/HomeClient")
            }

            else if (this.props.auth.user.role == 2) {
                window.location.assign("/dashboard/HomeMain")
            }

            else if (this.props.auth.user.role == 3) {
                window.location.assign("/dashboard/HomeAdmin")
            }
        });
    }


    renderTwoFactor() {
        return (
        <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onToken.bind(this)}>
        <a href="/" id="authLogo"><img src={Logo}/></a>
        <h1 className="mediumTitle">Verification</h1>
        <label className="authFieldLabel">Please enter your verification code</label>       
        <input disabled={this.state.loading} name="token" onChange={this.onChange.bind(this)} value={this.state.token} className="authField" type="token" minLength="6" />
        
        {this.state.error ? this.renderError() : null}

        <div className="authButton">
                    <Button disabled={this.state.loading} type="button" className="black" noLink>Submit</Button>
                    {this.state.loading ? <Spinner/> : null}
                </div>

                </form>
        )
    }

    render() {
        return (
            <div id="login" className="grid">
                <Head>
                    <title>Next Health: Sign in</title>
                </Head>

                <div className="grid-col-12" id="formContainer">
                    {this.state.twoFactorStep > 0 ? this.renderTwoFactor() : this.renderLoginForm()}
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({
    setUser
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
