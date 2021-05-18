import axios from 'axios'
import React from 'react'
import MessageCreate from './message-create'
import MessageList from './message-list'

export default class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            admins: [],
        }

        this.getAdmins = this.getAdmins.bind(this)
        this.getMessage = this.getMessage.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    componentDidMount() {
        this.getAdmins()
        this.getMessage()
    }

    getAdmins() {
        axios.get(`${this.props.url}/api/admin?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ admins: response.data })
            }
        })
    }

    getMessage() {
        axios.get(`${this.props.url}/api/message?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ messages: response.data })
            }
        })
    }

    updateData() {
        this.getAdmins()
        this.getMessage()
    }

    render() {
        return(
            <div className="admin-message">
                <h2>Messages</h2>
                <MessageCreate url={this.props.url} api={this.props.api} auth={this.props.auth} update={this.updateData} />
                <MessageList url={this.props.url} api={this.props.api} auth={this.props.auth} messages={this.state.messages} admins={this.state.admins} update={this.updateData} />
            </div>
        )
    }
}