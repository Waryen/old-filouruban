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
        if(confirm('Voulez-vous vraiment supprimer ce contact ? Cette action est irréversible')) {
            const id = e.target.value
            axios.delete(`${this.props.url}/api/contact/${id}?api_token=${this.props.api}`)
            this.componentDidMount()
        }
    }

    render() {
        // Rendu de la liste des contacts
        const messages = this.state.contacts
        const list = []

        messages.forEach(el => {
            list.push(
                <li key={el.id}>
                    <h4 className="name">{el.firstname} {el.lastname}</h4>
                    <p className="email"><a href={`mailto:${el.email}`}>{el.email}</a></p>
                    <p className="content">{el.content}</p>
                    <button className="delete" value={el.id} onClick={this.deleteContact}>Supprimer</button>
                </li>
            )
        })


        return(
            <div className="contact-list">
                <h3>Liste des contacts</h3>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default ContactList