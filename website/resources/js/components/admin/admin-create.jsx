import axios from 'axios'
import React from 'react'

class AdminCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            su: 0,
            api: this.generateRandomString(100),
        }

        this.generateRandomString = this.generateRandomString.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Génère une chaîne de caractères aléatoire pour l'API token
    generateRandomString(num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let result = ''
        for(let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }

        return result
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value})
    }

    handleCheckBox() {
        const checkBox = document.querySelector('#admin-create-su')
        if(checkBox.checked === true) {
            this.setState({ su: 1 })
        } else {
            this.setState({ su: 0 })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            su: this.state.su,
            api_token: this.state.api,
        }

        axios.post(`${this.props.url}/api/admin?api_token=${this.props.api}`, data)
        .then(response => {
            if(response.status == 200) {
                this.props.update()
                alert('Administrateur créé !')
            } else {
                alert('Erreur réseau')
            }
        })

        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            su: 0,
            api: this.generateRandomString(100),
        })

        if(document.querySelector('#admin-create-su')) {
            document.querySelector('#admin-create-su').checked = false
        }
    }

    render() {
        let form
        let auth = JSON.parse(this.props.auth)
        
        if(auth.su == 0) {
            form = <form method="post" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="firstname">Prénom: </label>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="lastname">Nom: </label>
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Adresse email: </label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </div>
                <input type="hidden" name="api" value={this.state.api} />
                <input type="hidden" name="su" value="0" />
                <div>
                    <button type="submit">Créer</button>
                </div>
            </form>
        } else if (auth.su == 1) {
            form = <form method="post" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="firstname">Prénom: </label>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="lastname">Nom: </label>
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Adresse email: </label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="admin-create-su">Super Administrateur: </label>
                    <input type="checkbox" name="su" id="admin-create-su" value={this.state.su} onClick={this.handleCheckBox} />
                </div>
                <input type="hidden" name="api" value={this.state.api} />
                <div>
                    <button type="submit">Créer</button>
                </div>
            </form>
        }

        return(
            <div className="admins-create">
                <h3>Créer un administrateur</h3>
                {form}
            </div>
        )
    }
}

export default AdminCreate