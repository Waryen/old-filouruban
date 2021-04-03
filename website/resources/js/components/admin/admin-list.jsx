import axios from 'axios'
import React from 'react'

class AdminList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }

        this.deleteAdmin = this.deleteAdmin.bind(this)
    }

    componentDidMount() {
        axios.get(`${this.props.url}/api/admin?api_token=${this.props.api}`)
            .then(res => {
                if(res.data) {
                    this.setState({ list: res.data })
                }
            })
    }

    deleteAdmin(e) {
        const id = e.target.value
        axios.delete(`${this.props.url}/api/admin/${id}?api_token=${this.props.api}`)
    }

    render() {
        const list = []
        const parsedAuth = JSON.parse(this.props.auth)
        const authSu = parsedAuth.su
        const authId = parsedAuth.id

        this.state.list.forEach(el => {
            if(el.id !== authId && el.su !== 1 && authSu === 1) {
                list.push(
                    <li key={el.id}>
                        <p>{el.firstname}</p>
                        <p>{el.lastname}</p>
                        <p>{el.email}</p>
                        <p>{el.su}</p>
                        <button value={el.id} onClick={this.deleteAdmin}>Supprimer</button>
                    </li>
                )
            } else {
                list.push(
                    <li key={el.id}>
                        <p>{el.firstname}</p>
                        <p>{el.lastname}</p>
                        <p>{el.email}</p>
                        <p>{el.su}</p>
                    </li>
                )
            }
        })

        return(
            <div>
                <h3>Liste des administrateurs</h3>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default AdminList