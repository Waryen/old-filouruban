import axios from 'axios'
import React from 'react'

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            remember: false,
            error: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
    
        this.setState({
          [name]: value
        });
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
        }

        axios.post('login-check', data)
            .then(response => {
                if(response.data === 'error') {
                    this.setState({error: true})
                } else if(response.data === 'ok') {
                    window.location.replace(`${this.props.url}/admin`)
                }
            })
    }

    render() {
        let error
        if(this.state.error) {
            error = <div>
                <h3>Les identifiants que vous avez fournis sont incorrectes.</h3>
            </div> 
        }
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
                    <div>
                        <button type="submit">Connexion</button>
                    </div>
                </form>
                {error}
            </div>
        )
    }
}

export default AdminLogin