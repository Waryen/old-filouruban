import axios from 'axios'
import React from 'react'

class ContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
        }

        this.deleteContact = this.deleteContact.bind(this)
    }

    // Récupère la liste des contacts
    componentDidMount() {
        axios.get(`${this.props.url}/api/contact?api_token=${this.props.api}`)
            .then(res => {
                this.setState({ contacts: res.data })
            })
    }

    deleteContact(e) {
        e.preventDefault()
        const id = e.target.value
        axios.delete(`${this.props.url}/api/contact/${id}?api_token=${this.props.api}`)
    }

    render() {
        // Rendu de la liste des contacts
        const messages = this.state.contacts
        const list = []

        messages.forEach(el => {
            list.push(
                <li key={el.id}>
                    <h3>{el.firstname} {el.lastname}</h3>
                    <p><a href={`mailto:${el.email}`}>{el.email}</a></p>
                    <p>{el.content}</p>
                    <button value={el.id} onClick={this.deleteContact}>Supprimer</button>
                </li>
            )
        })


        return(
            <div>
                <h2>Liste des contacts</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default ContactList