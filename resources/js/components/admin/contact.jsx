import axios from 'axios'
import React from 'react'
import ContactList from './contact-list'

export default class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
        }

        this.getContacts = this.getContacts.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    componentDidMount() {
        this.getContacts()
    }

    getContacts() {
        axios.get(`${this.props.url}/api/contact?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ contacts: response.data })
            }
        })
    }

    updateData() {
        this.getContacts()
    }

    render() {
        return(
            <div className="admin-contact">
                <h2>Contact</h2>
                <ContactList url={this.props.url} api={this.props.api} contacts={this.state.contacts} update={this.updateData} />
            </div>
        )
    }
}