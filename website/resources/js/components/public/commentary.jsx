import React from 'react'
import axios from 'axios'
import moment from 'moment'

class Commentary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentaries: [],
            firstname: '',
            lastname: '',
            content: '',
            date: this.now(),
        }

        this.now = this.now.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.hanldeCancel = this.hanldeCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Récupération des commentaires
    componentDidMount() {
        axios
            .get(`${this.props.url}/api/commentary?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ commentaries: response.data })
                }
            })
    }

    // Renvoi la date actuelle
    now() {
        let now = moment().format("YYYY-MM-DD")
        return now
    }

    // Gère le changement du formulaire
    handleChange(e) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    // Gère l'annulation des changements du formulaire
    hanldeCancel(e) {
        e.persist()
        this.setState({
            firstname: '',
            lastname: '',
            content: '',
            date: this.now(),
        })
    }

    // Gère l'envoi du formulaire
    handleSubmit(e) {
        e.preventDefault()
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            content: this.state.content,
            date: this.state.date,
            articles_id: this.props.artId,
        }

        axios
            .post(`${this.props.url}/api/commentary?api_token=${this.props.api}`, data)
            .then(response => {
                if(response.status == 200) {
                    this.hanldeCancel(e)
                    this.componentDidMount()
                } else {
                    alert("Impossible d'envoyer votre commentaire pour le moment.")
                }
            })
    }

    render() {
        // Rendu des commentaires de l'article
        const commentaires = this.state.commentaries
        const artId = this.props.artId
        let comList = commentaires.filter(el => el.articles_id == artId)
        let renderList

        if(comList.length) {
            renderList = []
            comList.forEach(el => {
                renderList.push(
                    <li key={el.id}>
                        <h3>{el.firstname} {el.lastname}</h3>
                        <p>{el.content}</p>
                        <p>Envoyé le: {el.date}</p>
                    </li>
                )
            })
        } else {
            renderList = <p>Il n'y pas encore de commentaires</p>
        }

        return(
            <div className="com-card">
                <div className="com-list">
                    <h2>Avis des internautes</h2>
                    <ul>
                        {renderList}
                    </ul>
                </div>
                <div className="com-create">
                    <h2>Donner votre avis</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="com-firstname">Votre prénom: </label>
                            <input type="text" name="firstname" id="com-firstname" value={this.state.firstname} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="com-lastname">Votre nom: </label>
                            <input type="text" name="lastname" id="com-lastname" value={this.state.lastname} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="com-content">Votre commentaire: </label>
                            <input type="text" name="content" maxLength="300" id="com-content" value={this.state.content} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <button onClick={this.hanldeCancel}>Annuler</button>
                            <button type="submit">Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Commentary