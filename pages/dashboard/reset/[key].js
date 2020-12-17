import * as React from 'react';
import Head from 'next/head';
import ReactPasswordStrength from 'react-password-strength/dist/universal';
import axios from 'axios';

import { Button, Spinner } from '../../../components';

import Logo from '../../../static/img/ident.png';

class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', loading: true};
    }

    componentDidMount() {
        const key = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        
        // Check if the key exists
        axios.post('/api/users/reset-key', {key}).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({loading: false, error: res.error});
                return;
            }

            this.setState({id: res.id, loading: false});
        });
    }

    onPasswordStrengthChange(data) {
        this.setState({password: data.password, passwordStrength: data.score, passwordFocused: false});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        const data = {
            id: this.state.id,
            password: this.state.password
        }
        
        axios.post('/api/users/reset-password', data).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error: res.error, loading: false});
                return;
            }

            this.setState({passwordReset: true});
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

    renderPasswordNotReset() {
        return (
            <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onSubmit.bind(this)}>
                <a href="/" id="authLogo"><img src={Logo}/></a>

                <h1 className="mediumTitle">Reset your password.</h1>
                <p className="mediumParagraph">Enter the new password for your account.</p>

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
                    inputProps={{ name: "password", disabled: this.state.loading || this.state.error, value: this.state.password, type: this.state.viewPassword ? "text" : "password", required: true, placeholder: "at least 8 characters", className: "authField" }}/>       

                    <svg onClick={() => this.setState({viewPassword: !this.state.viewPassword})} aria-hidden="true" className="viewToggle" height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        {this.state.viewPassword ? <path d="M15.707.293a1 1 0 0 1 .083 1.32l-.083.094-14 14a1 1 0 0 1-1.497-1.32l.083-.094 2.448-2.45C1.061 10.43 0 8.715 0 8c0-1.314 3.582-6 8-6 1.29 0 2.508.4 3.587.997L14.293.293a1 1 0 0 1 1.414 0zm-1.422 4.839C15.359 6.285 16 7.444 16 8c0 1.314-3.582 6-8 6-.765 0-1.505-.14-2.205-.38l1.659-1.657a4 4 0 0 0 4.51-4.51l2.32-2.321zM8 4a4 4 0 0 0-3.447 6.031l1.514-1.514a2.003 2.003 0 0 1 2.45-2.45l1.514-1.514A3.981 3.981 0 0 0 8 4z"></path> : <path d="M8 14c-4.418 0-8-4.686-8-6s3.582-6 8-6 8 4.686 8 6-3.582 6-8 6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fillRule="evenodd"></path>}
                    </svg>
                </div>

                {this.state.error ? this.renderError() : null}

                <div className="authButton">
                    <Button disabled={this.state.loading || this.state.error} type="button" className="black" noLink>Reset password</Button>
                    {this.state.loading ? <Spinner/> : null}
                </div>
            </form>
        )
    }

    renderPasswordReset() {
        return (
            <form id="authForm" className={this.state.error ? 'formError' : ''} onSubmit={this.onSubmit.bind(this)}>
                <a href="/" id="authLogo"><img src={Logo}/></a>

                <p className="authNotice">
                    Your password has been reset. <br/>
                    You can go ahead and <a className="accent" href="/dashboard/login"><strong>sign in</strong></a>.
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
                    {this.state.passwordReset ? this.renderPasswordReset() : this.renderPasswordNotReset()}
                </div>
            </div>
        )
    }
}

export default Reset;