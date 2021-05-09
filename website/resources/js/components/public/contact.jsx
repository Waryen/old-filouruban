import axios from 'axios'
import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.child = React.createRef()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            content: '',
            captcha: '',
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleVerificationSuccess = this.handleVerificationSuccess.bind(this)
        this.resetCaptcha = this.resetCaptcha.bind(this)
    }

    handleVerificationSuccess(token, ekey) {
        this.setState({ captcha: token })
    }

    resetCaptcha() {
        this.child.current.resetCaptcha()
    }

    // Gère les changements du formulaire
    handleChange(e) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    // Annule les changements du formulaire
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            content: '',
            captcha: '',
        })

        this.resetCaptcha()
    }

    // Envoi le forumulaire
    handleSubmit(e) {
        e.preventDefault()
        if(this.state.captcha) {
            const data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                content: this.state.content,
                captcha: this.state.captcha
            }
            axios
                .post(`${this.props.url}/api/contact?api_token=${this.props.api}`, data)
                .then(response => {
                    if(response.data == false) {
                        alert("Votre captcha n'a pas été validé !")
                    }
                })
    
            this.handleCancel(e)
        } else {
            alert('Veuillez valider le captcha !')
        }
    }

    render() {
        return(
            <div className="form-contact-wrapper">
                <form onSubmit={this.handleSubmit} className="form-contact">
                    <div className="form-firstname">
                        <label htmlFor="form-firstname">Votre prénom</label>
                        <input type="text" name="firstname" id="form-firstname" value={this.state.firstname} onChange={this.handleChange} required />
                    </div>
                    <div className="form-lastname">
                        <label htmlFor="form-lastname">Votre nom</label>
                        <input type="text" name="lastname" id="form-lastname" value={this.state.lastname} onChange={this.handleChange} required />
                    </div>
                    <div className="form-email">
                        <label htmlFor="form-email">Votre adresse email</label>
                        <input type="email" name="email" id="form-email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div className="form-content">
                        <label htmlFor="form-content">Votre message</label>
                        <textarea type="text" name="content" id="form-content" maxLength="1000" value={this.state.content} onChange={this.handleChange} required />
                    </div>
                    <div className="h-captcha">
                        <HCaptcha
                            ref={this.child}
                            sitekey="25830f50-7442-4826-9111-3517e9f53d2c"
                            onVerify={(token, ekey) => this.handleVerificationSuccess(token, ekey)}
                        />
                    </div>
                    <div className='form-btn'>
                        <button className="btn-cancel" onClick={this.handleCancel}>Annuler</button>
                        <button className="btn-submit" type="submit">Envoyer</button>
                    </div>
                    <div className="form-info">
                        <p>Tous les champs sont obligatoires</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Contact