import axios from 'axios'
import React from 'react'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            content: '',
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        })
    }

    // Envoi le forumulaire
    handleSubmit(e) {
        e.preventDefault()
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            content: this.state.content,
        }
        axios
            .post(`${this.props.url}/api/contact?api_token=${this.props.api}`, data)
            .then(response => console.log(response))

        this.handleCancel(e)
    }

    render() {
        return(
            <div>
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
                    <div className='form-btn'>
                        <button onClick={this.handleCancel}>Annuler</button>
                        <button type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Contact