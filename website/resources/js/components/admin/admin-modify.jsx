import axios from 'axios'
import React from 'react'

export default class AdminModify extends React.Component {
    constructor(props) {
        super(props)
        const json = JSON.parse(this.props.auth)
        this.state = {
            firstname: json.firstname,
            lastname: json.lastname,
            email: json.email,
            password: '',
            passwordConf: '',
            send: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    handleCancel(e) {
        e.preventDefault()
        const json = JSON.parse(this.props.auth)
        this.setState({
            firstname: json.firstname,
            lastname: json.lastname,
            email: json.email,
            password: '',
            passwordConf: ''
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const pwdConf = this.state.passwordConf
        let id = JSON.parse(this.props.auth)
        id = id.id
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        if(this.state.send != true) {
            if(confirm('Souhaitez-vous vraiment enregistrer vos modifications ?')) {
                if(data.password !== pwdConf) {
                    alert('Vos mots de passes ne sont pas identiques !')
                    this.handleCancel(e)
                } else if(data.password.length == 0) {
                    axios.patch(`${this.props.url}/api/admin/${id}?api_token=${this.props.api}`, {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }).then(response => {
                        if(response.status == 200 && response.data == 'ok') {
                            alert('Votre profil a bien été modifié')
                            this.setState({ send: true })
                            this.props.update()
                        } else {
                            alert('Erreur réseau')
                        }
                    })
                } else {
                    axios.patch(`${this.props.url}/api/admin/${id}?api_token=${this.props.api}`, data)
                    .then(response => {
                        if(response.status == 200 && response.data == 'ok') {
                            alert('Votre profil a bien été modifié')
                            this.setState({ send: true })
                            this.props.update()
                        } else {
                            alert('Erreur réseau')
                        }
                    })
                }
            } else {
                this.handleCancel(e)
            }
        } else {
            alert('Veuillez recharger la page afin de pouvoir envoyer à nouveau vos modifications au serveur.')
        }
    }

    render() {
        return(
            <div className="admins-modify">
                <h3>Modifier votre profil</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="admin-fn">
                        <label htmlFor="admin-fn">Votre prénom</label>
                        <input type="text" name="firstname" id="admin-fn" value={this.state.firstname} onChange={this.handleChange} />
                    </div>
                    <div className="admin-ln">
                        <label htmlFor="admin-ln">Votre nom</label>
                        <input type="text" name="lastname" id="admin-ln" value={this.state.lastname} onChange={this.handleChange} />
                    </div>
                    <div className="admin-mail">
                        <label htmlFor="admin-mail">Votre adresse e-mail</label>
                        <input type="email" name="email" id="admin-mail" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="admin-pwd">
                        <label htmlFor="admin-pwd">Votre nouveau mot de passe</label>
                        <input type="password" name="password" id="admin-pwd" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="admin-pwd-conf">
                        <label htmlFor="admin-pwd-conf">Confirmez votre nouveau mot de passe</label>
                        <input type="password" name="passwordConf" id="admin-pwd-conf" value={this.state.passwordConf} onChange={this.handleChange} />
                    </div>
                    <div className="btns">
                        <button onClick={this.handleCancel}>Annuler</button>
                        <button type="submit">Modifier</button>
                    </div>
                </form>
            </div>
        )
    }
}