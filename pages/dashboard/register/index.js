import * as React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../../store/actions/authActions';
import ReactPasswordStrength from 'react-password-strength/dist/universal';
import ReactSelect from 'react-select';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../../../utils/functions';

import { Button, Checkbox, Spinner } from '../../../components';

import Logo from '../../../static/img/ident.png';

const AccountTypes = [
    {id: 1, label: 'Client', value: 'Client'},
    {id: 2, label: 'Professional', value: 'Professional'}
];

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fullName: '', email: '', password: '', viewPassword: false, accountType: null};
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

    onAccountTypeChange(value) {
        this.setState({accountType: value});
    }

    onPasswordStrengthChange(data) {
        this.setState({password: data.password, passwordStrength: data.score, passwordFocused: false});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({error: null, loading: true});

        const data = {
            name: this.state.fullName,
            email: this.state.email,
            password: this.state.password,
            role: this.state.accountType.id
        }
        
        axios.post('/api/users/register', data).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error: res.error, loading: false});
                return;
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

    render() {
        return (
            <div id="register" className="grid">
                <Head>
                    <title>Next Health: Register</title>
                </Head>

                <div className="grid-col-12" id="formContainer">
                    <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onSubmit.bind(this)}>
                        <a href="/" id="authLogo"><img src={Logo}/></a>

                        <h1 className="mediumTitle">Create an account.</h1>
                        <p className="mediumParagraph">Create a Next Health account to gain access to your personalized dashboard.</p>

                        <label className="authFieldLabel">Account type</label>
                        <ReactSelect className="authSelect" placeholder="Select..." onChange={this.onAccountTypeChange.bind(this)} value={this.state.accountType} classNamePrefix="authSelect" options={AccountTypes}/>

                        <label className="authFieldLabel">Full name</label>
                        <input disabled={this.state.loading} name="fullName" onChange={this.onChange.bind(this)} value={this.state.fullName}  className="authField" type="text" placeholder="John Doe" pattern="[a-zA-Z]+ [a-zA-Z]+$" required/>

                        <label className="authFieldLabel">Email address</label>
                        <input disabled={this.state.loading} name="email" onChange={this.onChange.bind(this)} value={this.state.email} className="authField" type="email" placeholder="name@domain.com" required/>

                        <label className="authFieldLabel" id="passwordLabel">
                            <span className="text">Password</span>
                            <div className="strengthMeter">
                                <div className={`strength ${this.state.passwordStrength >= 1 ? `strength${this.state.passwordStrength}` : ''}`}></div>
                                <div className={`strength ${this.state.passwordStrength >= 2 ? `strength${this.state.passwordStrength}` : ''}`}></div>
                                <div className={`strength ${this.state.passwordStrength >= 3 ? `strength${this.state.passwordStrength}` : ''}`}></div>
                                <div className={`strength ${this.state.passwordStrength >= 4 ? `strength${this.state.passwordStrength}` : ''}`}></div>
                            </div>
                        </label>
                        
                        <div id="password" className={`strength${this.state.passwordStrength}`}>
                            <ReactPasswordStrength 
                            style={{borderWidth: 0}}
                            minLength={8}
                            minScore={2}
                            changeCallback={this.onPasswordStrengthChange.bind(this)}
                            tooShortWord=""
                            scoreWords={[]}
                            inputProps={{ name: "password", disabled: this.state.loading, value: this.state.password, type: this.state.viewPassword ? "text" : "password", required: true, placeholder: "at least 8 characters", className: "authField" }}/>       

                            <svg onClick={() => this.setState({viewPassword: !this.state.viewPassword})} aria-hidden="true" className="viewToggle" height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                {this.state.viewPassword ? <path d="M15.707.293a1 1 0 0 1 .083 1.32l-.083.094-14 14a1 1 0 0 1-1.497-1.32l.083-.094 2.448-2.45C1.061 10.43 0 8.715 0 8c0-1.314 3.582-6 8-6 1.29 0 2.508.4 3.587.997L14.293.293a1 1 0 0 1 1.414 0zm-1.422 4.839C15.359 6.285 16 7.444 16 8c0 1.314-3.582 6-8 6-.765 0-1.505-.14-2.205-.38l1.659-1.657a4 4 0 0 0 4.51-4.51l2.32-2.321zM8 4a4 4 0 0 0-3.447 6.031l1.514-1.514a2.003 2.003 0 0 1 2.45-2.45l1.514-1.514A3.981 3.981 0 0 0 8 4z"></path> : <path d="M8 14c-4.418 0-8-4.686-8-6s3.582-6 8-6 8 4.686 8 6-3.582 6-8 6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fillRule="evenodd"></path>}
                            </svg>
                        </div>
                    
                        <Checkbox required name="legalAgreement" onChange={this.onChange.bind(this)} value={this.state.legalAgreement} label={<div>By creating an account, you agree to the <a href="/"><span className="accent">terms of use</span></a> and our <a href="/"><span className="accent">privacy policy</span></a>.</div>}/>
                        
                        {this.state.error ? this.renderError() : null}

                        <div className="authButton">
                            <Button disabled={this.state.loading} type="button" className="black" noLink>Create account</Button>
                            {this.state.loading ? <Spinner/> : null}
                        </div>

                        <p className="authQuestion">Already have an account? <a href="/dashboard/login"><span className="accent">Sign in</span>.</a></p>
                    </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
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
)(Register);