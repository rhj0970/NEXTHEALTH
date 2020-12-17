import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../../components/Input/Button';
import Axios from 'axios';
import { signOut } from '../../../store/actions/authActions';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {conversations: [], professionals: [], startingConversation: false, composingMessage: '', convoFilter: ''};
    }

    componentDidMount() {
        if (!this.props.auth.authenticated) {
            window.location.href = "/dashboard/login";
            return;
        }

        Axios.post('/api/messages/getConversations').then(res => res.data).then(res => {
            const { conversations } = res;
            this.setState({conversations});
        })

        Axios.post('/api/users/professional').then(res => res.data).then(res => {
            this.setState({professionals: res});
        });
    }

    startConversation(user) {
        Axios.post('/api/messages/startConversation', {user}).then(res => res.data).then(res => {
            if (res.conversation) {
                this.setState({conversations: [
                    ...this.state.conversations,
                    res.conversation
                ]});
            }

            this.setState({startingConversation: false});
        });
    }

    renderNoConversations() {
        return (
            <div className="noConversations">
                <h1 className="noConvoPrompt">You don't have any conversations.<br/><a href="#" onClick={() => this.setState({startingConversation: true})}>Start one?</a></h1>
            </div>
        )
    }

    renderConversations() {
        return (
            <div className="conversations">
                {this.state.conversations.map(conversation => {
                    const other = conversation.professional.id == this.props.auth.user.id ? conversation.client : conversation.professional;

                    if (this.state.convoFilter.length > 0 && other.username.toLowerCase().indexOf(this.state.convoFilter.toLowerCase()) == -1) {
                        return null;
                    }

                    return (
                        <div className="conversation" onClick={() => this.setState({selectedConversation: conversation})}>
                            <img className="profilePicture" src={other.image}/>
                            <h1 className="name">{other.username}</h1>
                        </div>
                    )
                })}
            </div>
        )
    }

    renderNoSelectedConversation() {
        return (
            null
        )
    }

    renderSelectedConversation() {
        const other = this.state.selectedConversation.professional.id == this.props.auth.user.id ? this.state.selectedConversation.client : this.state.selectedConversation.professional;

        return (
            <React.Fragment>
                <div className="otherInfo">
                    <img className="profilePicture" src={other.image}/>
                    <h1 className="name">{other.username}</h1>
                </div>

                <div className="messagesList">
                    {this.state.selectedConversation.messages.map(message => {
                        const fromMe = message.sender == this.props.auth.user.id;
                        const time = new Date(message.time).toLocaleTimeString();

                        if (fromMe) {
                            return (
                                <div className='message to'>
                                    <div className="messageBubble">
                                        <p>{message.message}</p>
                                    </div>
                                    <span className="messageTimestamp">{time}</span>
                                </div>
                            );
                        }

                        return (
                            <div className='message'>
                                <span className="messageTimestamp">{time}</span>
                                <div className="messageBubble">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="composer">
                    <form onSubmit={this.sendMessage.bind(this)}>
                        <input type="text" value={this.state.composingMessage} onChange={(e) => this.setState({composingMessage: e.target.value})} placeholder="Type your message..."></input>
                        <Button className="black" disabled={this.state.composingMessage.length <= 0} type="button" noLink>Send</Button>
                    </form>
                </div>
            </React.Fragment>
        )
    }  

    renderStartingConversation() {
        return (
            <div className="startingConversation">
                <div className="overlay" onClick={() => this.setState({startingConversation: false})}></div>
        
                <div className="professionalList">
                    <h1>Professionals</h1>

                    <div className="professionals">
                        {this.state.professionals.map(professional => (
                            <a className="professional" onClick={() => this.startConversation(professional.id)}>
                                <img className="profilePicture" src={professional.image}/>
                                <div className="profileInfo">
                                    <div className="name">{professional.username}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    sendMessage(e) {
        e.preventDefault();

        const other = this.state.selectedConversation.professional.id == this.props.auth.user.id ? this.state.selectedConversation.client : this.state.selectedConversation.professional;

        const data = {
            conversation: this.state.selectedConversation.id,
            from: this.props.auth.user.id,
            to: other.id,
            message: this.state.composingMessage
        }

        Axios.post('/api/messages', data).then(res => res.data).then(res => {
            if (!res.message) {
                this.setState({composingMessage: ''});
                return;
            }

            this.state.selectedConversation.messages = [
                ...this.state.selectedConversation.messages,
                res.message
            ];

            this.setState({composingMessage: ''});
        });
    }

    render() {
        return (
            <div id="messages">
                <div className="navbar2">
                    <div className="logo">
                        <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                    </div>

                    <a href="#" onClick={() => this.props.signOut()}><i className="fa fa-fw fa-user"></i>Logout</a>
                    <a href="/dashboard/HomeClient"><i className="fa fa-fw fa-home"></i>Home</a>
                </div>

                <div className="messagesContainer">
                    <div className="conversationList">
                        <div className="convoHeader">
                            <input className="conversationFilter" onChange={(e) => this.setState({convoFilter: e.target.value})} placeholder="Search for a conversation..." type="text"/>
                            <Button className="newConversationButton black" onClick={() => this.setState({startingConversation: true})}>New</Button>
                        </div>
                        <div className="convoList">
                            {this.state.conversations.length <= 0 ? this.renderNoConversations() : this.renderConversations()}
                        </div>
                    </div>
                    <div className="selectedConversation">
                        {this.state.selectedConversation ? this.renderSelectedConversation() : this.renderNoSelectedConversation()}
                    </div>
                </div>

                {this.state.startingConversation ? this.renderStartingConversation() : null}
            </div>
        )
    }
}

Messages.propTypes = {
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
)(Messages);