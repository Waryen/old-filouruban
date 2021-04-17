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
            newStartDate: '',
            newEndDate: '',
            messageId: undefined,
        }

        this.deleteMessage = this.deleteMessage.bind(this)
        this.modifyMessage = this.modifyMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
                    newStartDate: res.data.start_date,
                    newEndDate: res.data.end_date,
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

    // Annule les changements du formulaire de modification
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            newTitle: '',
            newContent: '',
            newStartDate: '',
            newEndDate: '',
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
            start_date: this.state.newStartDate,
            end_date: this.state.newEndDate,
        })
        this.handleCancel(e)

        document.querySelector('.message-modify').style.display = 'none'
        document.querySelector('.message-list').style.display = 'block'
    }

    // Supprime le message
    deleteMessage(e) {
        e.preventDefault()
        const id = e.target.value
        axios.delete(`${this.props.url}/api/message/${id}?api_token=${this.props.api}`)
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
                        <h3>{el.title}</h3>
                        <p>{el.content}</p>
                        <p>Date de début: {el.start_date}</p>
                        <p>Date de fin: {el.end_date}</p>
                        <p>Créé par: {adminName}</p>
                        <button value={el.id} onClick={this.modifyMessage}>Modifer</button>
                        <button value={el.id} onClick={this.deleteMessage}>Supprimer</button>
                    </li>
                )
            } else if(adminSu === 1) {
                list.push(
                    <li key={el.id}>
                        <h3>{el.title}</h3>
                        <p>{el.content}</p>
                        <p>Date de début: {el.start_date}</p>
                        <p>Date de fin: {el.end_date}</p>
                        <p>Créé par: {adminName}</p>
                        <button value={el.id} onClick={this.modifyMessage}>Modifer</button>
                        <button value={el.id} onClick={this.deleteMessage}>Supprimer</button>
                    </li>
                )
            } else {
                list.push(
                    <li key={el.id}>
                        <h3>{el.title}</h3>
                        <p>{el.content}</p>
                        <p>Date de début: {el.start_date}</p>
                        <p>Date de fin: {el.end_date}</p>
                        <p>Créé par: {adminName}</p>
                    </li>
                )
            }
        })

        return(
            <div>
                <h2>Liste des messages</h2>
                <div className="message-list">
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className="message-modify">
                    <h2>Modifer un message</h2>
                    <form method="post" onSubmit={this.handleModify}>
                        <div>
                            <label htmlFor="title">Titre: </label>
                            <input type="text" name="newTitle" id="title" value={this.state.newTitle} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="content">Contenu: </label>
                            <input type="text" name="newContent" id="content" value={this.state.newContent} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="newStartDate">Date de début: </label>
                            <input type="date" name="newStartDate" id="newStartDate" value={this.state.newStartDate} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="newEndDate">Date de fin: </label>
                            <input type="date" name="newEndDate" id="newEndDate" value={this.state.newEndDate} onChange={this.handleChange} />
                        </div>
                        <div>
                            <button onClick={this.handleCancel}>Annuler</button>
                            <button type="submit">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList