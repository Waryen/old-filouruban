import axios from 'axios'
import React from 'react'

class MessageCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            active: 0,
            adminId: undefined,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Récupère l'Id de l'admin actuellement connecté
    componentDidMount() {
        const auth = JSON.parse(this.props.auth)
        this.setState({ adminId: auth.id })
    }

    // Gère les changements du formulaire
    handleChange(e) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    handleCheckBox() {
        const checkBox = document.querySelector('#active-create')
        if(checkBox.checked === true) {
            this.setState({ active: 1 })
        } else {
            this.setState({ active: 0 })
        }
    }

    // Annule les changements du formulaire
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            title: '',
            content: '',
            active: 0,
        })
    }

    // Envoi le formulaire
    handleSubmit(e) {
        e.preventDefault()
        const data = {
            title: this.state.title,
            content: this.state.content,
            active: this.state.active,
            admins_id: this.state.adminId,
        }
        axios.post(`${this.props.url}/api/message?api_token=${this.props.api}`, data)
        .then(response => {
            if(response.status == 200) {
                this.props.update()
                alert('Message créé !')
            } else {
                alert('Erreur réseau')
            }
        })
        this.handleCancel(e)
    }

    render() {
        return(
            <div className="message-create">
                <h3>Créer un message</h3>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="msg-title">
                        <label htmlFor="title">Titre: </label>
                        <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="msg-content">
                        <label htmlFor="content">Contenu: </label>
                        <textarea type="text" name="content" id="content" maxLength="1000" value={this.state.content} onChange={this.handleChange} />
                    </div>
                    <div className="msg-active">
                        <label htmlFor="active-create">Afficher le message</label>
                        <input type="checkbox" name="active" id="active-create" value={this.state.active} onChange={this.handleCheckBox} />
                    </div>
                    <div className="msg-btns">
                        <button className="btn-submit" type="submit">Créer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MessageCreate