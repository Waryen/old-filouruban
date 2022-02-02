import axios from 'axios'
import React from 'react'

class AdminLogout extends React.Component {
    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        let auth = JSON.parse(this.props.auth)
        const data = {
            email: auth.email,
            password: auth.password,
        }
        
        axios.post('logout', data)
            .then(response => {
                if(response.data === 'ok') {
                    window.location.replace('login')
                }
            })
    }

    render() {
        return(
            <div>
                <button onClick={this.handleLogout}>Se déconnecter</button>
            </div>
        )
    }
}

export default AdminLogout