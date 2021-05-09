import axios from 'axios'
import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

class Newsletter extends React.Component {
    constructor(props) {
        super(props)
        this.child = React.createRef()
        this.state = {
            listSubscribers: [],
            newSubscriber: '',
            captcha: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleVerificationSuccess = this.handleVerificationSuccess.bind(this)
        this.resetCaptcha = this.resetCaptcha.bind(this)
    }

    componentDidMount() {
        // Récupère la liste des subscribers
        axios.get(`${this.props.url}/api/subscriber?api_token=${this.props.api}`)
            .then(res => {
                const list = res.data.map(el => el.email)
                if(list) {
                    this.setState({ listSubscribers: list })
                }
            })
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

        const list = this.state.listSubscribers
        const newSub = this.state.newSubscriber
        let check = true

        // Vérifie si le nouveau subscriber existe déjà dans la DB
        for(let i = 0; i < list.length; i++) {
            if(list[i] === newSub) {
                check = false
                break
            }
        }

        // Enregistre le nouveau subscriber si il n'existe pas encore dans la DB
        if(check === true && this.state.captcha) {
            axios.post(`${this.props.url}/api/subscriber?api_token=${this.props.api}`, {
                email: newSub,
                captcha: this.state.captcha
            }).then(res => {
                if(res.data === 'ok') {
                    alert('Vous avez été inscrit(e) à la newsletter !')
                    this.setState({ listSubscribers: [...this.state.listSubscribers, newSub] })
                } else {
                    alert("Votre captcha n'a pas été validée !")
                }
            })
        } else {
            alert('Vous êtes déja inscrit(e) à la newsletter !')
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