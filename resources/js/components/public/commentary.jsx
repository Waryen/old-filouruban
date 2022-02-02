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
            submited: false,
            trap: false,
        }

        this.now = this.now.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleHoneyPot = this.handleHoneyPot.bind(this)
        this.hanldeCancel = this.hanldeCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Récupération des commentaires
    componentDidMount() {
        axios.get(`${this.props.url}/api/commentary?api_token=${this.props.api}`)
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

    // Gère le honeypot
    handleHoneyPot() {
        const trapBox = document.querySelector('.trap-input')
        if(trapBox.checked == true) {
            this.setState({ trap: true })
        } else {
            this.setState({ trap: false })
        }
    }

    // Gère l'annulation des changements du formulaire
    hanldeCancel() {
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

        if(this.state.trap == false && this.state.submited == false) {
            axios.post(`${this.props.url}/api/commentary?api_token=${this.props.api}`, data)
            .then(response => {
                if(response.status == 200 && response.data == 1) {
                    this.componentDidMount()
                    this.setState({ submited: true })
                    alert('Votre commentaire a été envoyé !')
                } else {
                    alert("Erreur réseau")
                }
            })
            this.hanldeCancel()
        }
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
                        <h4>{el.firstname} {el.lastname}</h4>
                        <p className="com-content">{el.content}</p>
                        <p className="com-date">Envoyé le: {el.date}</p>
                    </li>
                )
            })
        } else {
            renderList = <p className="empty">Il n'y pas encore de commentaires, soyez-le premier !</p>
        }

        return(
            <div className="com-card">
                <div className="com-list">
                    <h3>Commentaires des internautes</h3>
                    <ul>
                        {renderList}
                    </ul>
                </div>
                <div className="com-create">
                    <h3>Déposez votre commentaire</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="com-firstname">
                            <label htmlFor="com-firstname">Votre prénom</label>
                            <input type="text" name="firstname" id="com-firstname" value={this.state.firstname} onChange={this.handleChange} required />
                        </div>
                        <div className="com-lastname">
                            <label htmlFor="com-lastname">Votre nom</label>
                            <input type="text" name="lastname" id="com-lastname" value={this.state.lastname} onChange={this.handleChange} />
                        </div>
                        <div className="com-content">
                            <label htmlFor="com-content">Votre commentaire</label>
                            <textarea type="text" name="content" maxLength="300" id="com-content" value={this.state.content} onChange={this.handleChange} required />
                        </div>
                        <div className="com-btn">
                            <button className="btn-submit" type="submit">Envoyer</button>
                        </div>
                        <input type="checkbox" name="fax" onChange={this.handleHoneyPot} className="trap-input" tabIndex="-1" autoComplete="off" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Commentary