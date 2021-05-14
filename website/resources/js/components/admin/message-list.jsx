import axios from 'axios'
import React from 'react'

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            admins: [],
            newTitle: '',
            newContent: '',
            newActive: false,
            messageId: undefined,
        }

        this.deleteMessage = this.deleteMessage.bind(this)
        this.modifyMessage = this.modifyMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    // Récupère la liste des messages et des admins
    componentDidMount() {
        document.querySelector('.message-modify').style.display = 'none'
        document.querySelector('.message-list').style.display = 'block'

        axios.get(`${this.props.url}/api/message?api_token=${this.props.api}`)
        .then(res => this.setState({ messages: res.data }))
        axios.get(`${this.props.url}/api/admin?api_token=${this.props.api}`)
        .then(res => this.setState({ admins: res.data }))
    }

    // Récupère les données du formulaire de modification
    modifyMessage(e) {
        e.preventDefault()
        document.querySelector('.message-modify').style.display = 'block'
        document.querySelector('.message-list').style.display = 'none'
        const id = e.target.value

        axios.get(`${this.props.url}/api/message/${id}?api_token=${this.props.api}`)
        .then(res => {
            this.setState({
                newTitle: res.data.title,
                newContent: res.data.content,
                newActive: res.data.active,
                messageId: id,
            })
        })
    }

    // Gère les changements du formulaire de modification
    handleChange(e) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    handleCheckBox() {
        const checkBox = document.querySelector('#active-modify')
        if(checkBox.checked === true) {
            this.setState({ newActive: 1 })
        } else {
            this.setState({ newActive: 0 })
        }
    }

    // Annule les changements du formulaire de modification
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            newTitle: '',
            newContent: '',
            newActive: false,
            messageId: undefined,
        })

        document.querySelector('.message-modify').style.display = 'none'
        document.querySelector('.message-list').style.display = 'block'
    }

    // Envoi les données du formulaire de modification
    handleModify(e) {
        e.preventDefault()
        const id = this.state.messageId
        axios.patch(`${this.props.url}/api/message/${id}?api_token=${this.props.api}`, {
            title: this.state.newTitle,
            content: this.state.newContent,
            active: this.state.newActive
        })
        this.handleCancel(e)
        this.componentDidMount()

        document.querySelector('.message-modify').style.display = 'none'
        document.querySelector('.message-list').style.display = 'block'
    }

    // Supprime le message
    deleteMessage(e) {
        e.preventDefault()
        if(confirm('Voulez-vous vraiment supprimer ce message ? Cette action est irréversible')) {
            const id = e.target.value
            axios.delete(`${this.props.url}/api/message/${id}?api_token=${this.props.api}`)
            this.componentDidMount()
        }
    }

    render() {
        // Rendu de la liste des messages
        const messages = this.state.messages
        const admins = this.state.admins
        const auth = JSON.parse(this.props.auth)
        const adminId = auth.id
        const adminSu = auth.su
        let adminName
        const list = []

        messages.forEach(el => {
            for(let i = 0; i < admins.length; i++) {
                if(el.admins_id === admins[i].id) {
                    adminName = admins[i].firstname + ' '
                    adminName += admins[i].lastname
                }
            }

            if(el.admins_id === adminId && adminSu === 0) {
                list.push(
                    <li key={el.id}>
                        <h4 className="title">{el.title}</h4>
                        <p className="content">{el.content}</p>
                        <p className="active">Message affiché: <span>{el.active}</span></p>
                        <p className="admin">Créé par: {adminName}</p>
                        <div className="btns">
                            <button className="modify" value={el.id} onClick={this.modifyMessage}>Modifer</button>
                            <button className="delete" value={el.id} onClick={this.deleteMessage}>Supprimer</button>
                        </div>
                    </li>
                )
            } else if(adminSu === 1) {
                list.push(
                    <li key={el.id}>
                        <h4 className="title">{el.title}</h4>
                        <p className="content">{el.content}</p>
                        <p className="active">Message affiché: <span>{el.active}</span></p>
                        <p className="admin">Créé par: {adminName}</p>
                        <div className="btns">
                            <button className="modify" value={el.id} onClick={this.modifyMessage}>Modifer</button>
                            <button className="delete" value={el.id} onClick={this.deleteMessage}>Supprimer</button>
                        </div>
                    </li>
                )
            } else {
                list.push(
                    <li key={el.id}>
                        <h4 className="title">{el.title}</h4>
                        <p className="content">{el.content}</p>
                        <p className="active">Message affiché: <span>{el.active}</span></p>
                        <p className="admin">Créé par: {adminName}</p>
                    </li>
                )
            }
        })

        // Coche ou décoche le bouton "afficher message" dans le formulaire de modification
        if(document.querySelector('.message-modify')) {
            let check = document.querySelector('#active-modify')
            if(this.state.newActive == 1) {
                check.checked = true
            } else {
                check.checked = false
            }
        }

        return(
            <div>
                <div className="message-list">
                    <h3>Liste des messages</h3>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className="message-modify">
                    <h3>Modifer un message</h3>
                    <form method="post" onSubmit={this.handleModify}>
                        <div className="msg-title">
                            <label htmlFor="title">Titre: </label>
                            <input type="text" name="newTitle" id="title" value={this.state.newTitle} onChange={this.handleChange} />
                        </div>
                        <div className="msg-content">
                            <label htmlFor="content">Contenu: </label>
                            <textarea type="text" name="newContent" id="content" maxLength="1000" value={this.state.newContent} onChange={this.handleChange} />
                        </div>
                        <div className="msg-active">
                            <label htmlFor="active-modify">Afficher le message: </label>
                            <input type="checkbox" name="newActive" id="active-modify" value={this.state.newActive} onChange={this.handleCheckBox} />
                        </div>
                        <div className="msg-btns">
                            <button className="btn-cancel" onClick={this.handleCancel}>Annuler</button>
                            <button className="btn-submit" type="submit">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList