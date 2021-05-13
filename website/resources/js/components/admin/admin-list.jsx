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
        if(confirm('Voulez-vous vraiment supprimer cet administrateur ? Cett action est irréversible')) {
            const id = e.target.value
            axios.delete(`${this.props.url}/api/admin/${id}?api_token=${this.props.api}`)
            this.componentDidMount()
        }
    }

    render() {
        const list = []
        const parsedAuth = JSON.parse(this.props.auth)
        const authSu = parsedAuth.su
        const authId = parsedAuth.id

        this.state.list.forEach(el => {
            if(el.id !== authId && el.su !== 1 && authSu === 1) {
                if(el.su == 0) {
                    list.push(
                        <li key={el.id}>
                            <p className="admin-name">{el.firstname} {el.lastname}</p>
                            <p className="admin-email">{el.email}</p>
                            <p className="admin-su">Administrateur</p>
                            <button className="admin-delete" value={el.id} onClick={this.deleteAdmin}>Supprimer</button>
                        </li>
                    )
                } else {
                    list.push(
                        <li key={el.id}>
                            <p className="admin-name">{el.firstname} {el.lastname}</p>
                            <p className="admin-email">{el.email}</p>
                            <p className="admin-su">Super Administrateur</p>
                            <button className="admin-delete" value={el.id} onClick={this.deleteAdmin}>Supprimer</button>
                        </li>
                    )
                }
            } else {
                if(el.su == 0) {
                    list.push(
                        <li key={el.id}>
                            <p  className="admin-name">{el.firstname} {el.lastname}</p>
                            <p  className="admin-email">{el.email}</p>
                            <p className="admin-su">Administrateur</p>
                        </li>
                    )
                } else {
                    list.push(
                        <li key={el.id}>
                            <p  className="admin-name">{el.firstname} {el.lastname}</p>
                            <p  className="admin-email">{el.email}</p>
                            <p className="admin-su">Super Administrateur</p>
                        </li>
                    )
                }
            }
        })

        return(
            <div className="admins-list">
                <h3>Liste des administrateurs</h3>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default AdminList