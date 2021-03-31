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
            su: 1,
            api: this.generateRandomString(100),
        }

        this.generateRandomString = this.generateRandomString.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

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

    handleSubmit(e) {
        e.preventDefault()

        axios.post(`${this.props.url}/api/admin?api_token=${this.props.api}`, {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            su: this.state.su,
            api_token: this.state.api,
        }).then(Response => console.log(Response))
    }

    render() {
        return(
            <div>
                <h2>Créer un administrateur</h2>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="firstname">Prénom: </label>
                        <input type="text" name="firstname" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastname">Nom: </label>
                        <input type="text" name="lastname" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Adresse email: </label>
                        <input type="email" name="email" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe: </label>
                        <input type="password" name="password" onChange={this.handleChange} />
                    </div>
                    <input type="hidden" name="su" value={this.state.su} />
                    <input type="hidden" name="api" value={this.state.api} />
                    <div>
                        <button type="submit">Créer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdminCreate