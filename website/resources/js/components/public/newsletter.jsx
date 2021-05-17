import axios from 'axios'
import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

class Newsletter extends React.Component {
    constructor(props) {
        super(props)
        this.child = React.createRef()
        this.state = {
            newSubscriber: '',
            captcha: '',
            submited: false,
        }

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

    handleChange(e) {
        const value = e.target.value

        this.setState({ newSubscriber: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        // Enregistre le nouveau subscriber si il n'existe pas encore dans la DB
        if(this.state.submited == false) {
            if(this.state.captcha) {
                const data = {
                    email: this.state.newSubscriber,
                    captcha: this.state.captcha
                }

                axios.post(`${this.props.url}/api/subscriber?api_token=${this.props.api}`, data)
                .then(response => {
                    if(response.status == 200) {
                        if(response.data.id) {
                            alert('Vous avez été inscrit(e) à la newsletter !')
                            this.setState({ submited: true })
                        } else if(response.data == 0) {
                            alert("Votre captcha n'a pas été validée !")
                        } else if(response.data == 2) {
                            alert('Vous êtes déja inscrit(e) à la newsletter !')
                        }
                    }
                })
            }
        }

        this.setState({
            newSubscriber: '',
            captcha: ''
        })

        this.resetCaptcha()
    }

    render() {
        return(
            <form method="post" className="newsletter-form" onSubmit={this.handleSubmit}>
                <div className="newsletter-email">
                    <label htmlFor="newsletter-email">S'abonner à notre newsletter</label>
                    <input type="email" name="email" value={this.state.newSubscriber} id="newsletter-email" required onChange={this.handleChange} />
                </div>
                <div className="h-captcha">
                    <HCaptcha
                        ref={this.child}
                        sitekey="25830f50-7442-4826-9111-3517e9f53d2c"
                        onVerify={(token, ekey) => this.handleVerificationSuccess(token, ekey)}
                    />
                </div>
                <div className="newsletter-btn">
                    <button type="submit">S'abonner</button>
                </div>
            </form>
        )
    }
}

export default Newsletter