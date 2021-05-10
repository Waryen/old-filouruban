import axios from 'axios'
import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
        this.child = React.createRef()
        this.state = {
            email: '',
            password: '',
            remember: false,
            captcha: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleVerificationSuccess = this.handleVerificationSuccess.bind(this)
        this.resetCaptcha = this.resetCaptcha.bind(this)
    }

    handleVerificationSuccess(token, ekey) {
        this.setState({ captcha: token })
    }

    resetCaptcha() {
        this.child.current.resetCaptcha()
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

        if(this.state.captcha) {
            const data = {
                email: this.state.email,
                password: this.state.password,
                remember: this.state.remember,
                captcha: this.state.captcha,
            }
    
            axios.post('login-check', data)
                .then(response => {
                    if(response.data === 'error') {
                        alert('Les identifiants que vous avez fournis sont incorrectes')
                    } else if(response.data === 'ok') {
                        window.location.replace(`${this.props.url}/admin`)
                    } else if(response.data == 0) {
                        alert("Votre captcha n'a pas été validé !")
                    }
                })
        } else {
            alert("Veuillez valider votre captcha !")
        }

        this.setState({
            email: '',
            password: '',
            captcha: '',
        })
        this.resetCaptcha()
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
                    <div className="h-captcha">
                        <HCaptcha
                            ref={this.child}
                            sitekey="25830f50-7442-4826-9111-3517e9f53d2c"
                            onVerify={(token, ekey) => this.handleVerificationSuccess(token, ekey)}
                        />
                    </div>
                    <div>
                        <button type="submit">Connexion</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdminLogin