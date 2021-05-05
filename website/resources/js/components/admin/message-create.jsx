import axios from 'axios'
import React from 'react'

class MessageCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            startDate: '',
            endDate: '',
            adminId: undefined,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Récupère l'Id de l'admin actuellement connecté
    componentDidMount() {
        const auth = JSON.parse(this.props.auth)
        this.setState({ adminId: auth.id })
    }

    // Vide le state au démontage du composant
    componentWillUnmount() {
        this.setState({
            title: '',
            content: '',
            startDate: '',
            endDate: '',
            adminId: undefined,
        })
    }

    // Gère les changements du formulaire
    handleChange(e) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    // Annule les changements du formulaire
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            title: '',
            content: '',
            startDate: '',
            endDate: '',
        })
    }

    // Envoi le formulaire
    handleSubmit(e) {
        e.preventDefault()
        axios.post(`${this.props.url}/api/message?api_token=${this.props.api}`, {
            title: this.state.title,
            content: this.state.content,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            admins_id: this.state.adminId,
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
                    <div className="msg-start-date">
                        <label htmlFor="startDate">Date de début: </label>
                        <input type="date" name="startDate" id="startDate" value={this.state.startDate} onChange={this.handleChange} />
                    </div>
                    <div className="msg-end-date">
                        <label htmlFor="endDate">Date de fin: </label>
                        <input type="date" name="endDate" id="endDate" value={this.state.endDate} onChange={this.handleChange} />
                    </div>
                    <div className="msg-btns">
                        <button className="btn-cancel" onClick={this.handleCancel} >Annuler</button>
                        <button className="btn-submit" type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MessageCreate