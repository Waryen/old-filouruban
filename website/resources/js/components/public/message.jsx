import React from 'react'
import axios from 'axios'

export default class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            loaded: false,
        }
    }

    // Récupère les messages qui ont le status "active" à 1
    componentDidMount() {
        axios.get(`${this.props.url}/api/message?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                response.data.forEach(el => {
                    if(el.active == 1) {
                        this.setState({ messages: [...this.state.messages, el ] })
                    }
                })
            }
        })
        .then(this.setState({ loaded: true }))
    }

    render() {
        if(this.state.loaded == true && this.state.messages.length) {
            let messages = this.state.messages
            let list = []

            messages.forEach(el => {
                list.push(
                    <li key={el.id}>
                        <p className="message-content">{el.content}</p>
                    </li>
                )
            })

            return(
                <div className="home-message">
                    <ul>
                        {list}
                    </ul>
                </div>
            )
        } else {
            return(
                <div className="home-message" style={{display: 'none'}}></div>
            )
        }
    }
}