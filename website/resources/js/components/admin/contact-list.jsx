import axios from 'axios'
import React from 'react'

class ContactList extends React.Component {
    constructor(props) {
        super(props)

        this.deleteContact = this.deleteContact.bind(this)
    }

    deleteContact(e) {
        e.preventDefault()
        if(confirm('Voulez-vous vraiment supprimer ce contact ? Cette action est irréversible')) {
            const id = e.target.value
            axios.delete(`${this.props.url}/api/contact/${id}?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.props.update()
                    alert('Contact supprimé !')
                } else {
                    alert('Erreur réseau')
                }
            })
        }
    }

    // Ajoute des sauts de ligne dans le contenu du message
    divide(txt) {
        txt = txt.split('\n')
        let array = []

        for(let i = 0; i < txt.length; i++) {
            array.push(
                <p key={i}>{txt[i]}</p>
            )
        }

        return array
    }

    render() {
        // Rendu de la liste des contacts
        const messages = this.props.contacts
        const list = []

        messages.forEach(el => {
            let desc = this.divide(String(el.content))
            list.push(
                <li key={el.id}>
                    <h4 className="name">{el.firstname} {el.lastname}</h4>
                    <p className="email"><a href={`mailto:${el.email}`}>{el.email}</a></p>
                    <div className="content">
                        {desc}
                    </div>
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