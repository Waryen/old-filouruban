import axios from 'axios'
import React from 'react'

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            remember: false,
            trap: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleHoneyPot = this.handleHoneyPot.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
    
        this.setState({ [name]: value });
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

    handleCheckbox() {
        const checkBox = document.querySelector('#login-remember-checkbox')
        if(checkBox.checked == true) {
            this.setState({ remember: true })
        } else {
            this.setState({ remember: false })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password,
            remember: this.state.remember,
            captcha: this.state.captcha,
        }

        if(this.state.trap == false) {
            axios.post('login-check', data)
            .then(response => {
                if(response.status == 200 && response.data == 0) {
                    alert('Les identifiants que vous avez fournis sont incorrectes')
                } else if(response.status == 200 && response.data == 1) {
                    window.location.replace(`${this.props.url}/admin`)
                } else {
                    alert('Erreur réseau')
                }
            })
        }

        this.setState({
            email: '',
            password: '',
        })
    }

    render() {
        return(
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Adresse email: </label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe: </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="remember">Se souvenir de moi: </label>
                        <input type="checkbox" name="remember" id="login-remember-checkbox" onClick={this.handleCheckbox} />
                    </div>
                    <div className="forgot-password">
                        <a href="/forgot-password">Mot de passe oublié ?</a>
                    </div>
                    <div>
                        <button type="submit">Connexion</button>
                    </div>
                    <input type="checkbox" name="fax" onChange={this.handleHoneyPot} className="trap-input" tabIndex="-1" autoComplete="off" />
                </form>
            </div>
        )
    }
}

export default AdminLogin