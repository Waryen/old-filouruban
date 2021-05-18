import axios from 'axios'
import React from 'react'

class AdminList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.deleteAdmin = this.deleteAdmin.bind(this)
    }

    deleteAdmin(e) {
        if(confirm('Voulez-vous vraiment supprimer cet administrateur ? Cette action est irréversible')) {
            const id = e.target.value
            axios.delete(`${this.props.url}/api/admin/${id}?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.props.update()
                    alert('Administrateur supprimé !')
                } else {
                    alert('Erreur réseau')
                }
            })
        }
    }

    render() {
        const list = []
        const admins = this.props.admins
        const parsedAuth = JSON.parse(this.props.auth)
        const authSu = parsedAuth.su
        const authId = parsedAuth.id

        admins.forEach(el => {
            if(el.id !== authId && el.su !== 1 && authSu === 1) {

                let adminStatus
                el.su == 0 ? adminStatus = 'Administrateur' : adminStatus = 'Super Administrateur'

                list.push(
                    <li key={el.id}>
                        <p className="admin-name">{el.firstname} {el.lastname}</p>
                        <p className="admin-email">{el.email}</p>
                        <p className="admin-su">{adminStatus}</p>
                        <button className="admin-delete" value={el.id} onClick={this.deleteAdmin}>Supprimer</button>
                    </li>
                )
            } else {

                let adminStatus
                el.su == 0 ? adminStatus = 'Administrateur' : adminStatus = 'Super Administrateur'

                list.push(
                    <li key={el.id}>
                        <p  className="admin-name">{el.firstname} {el.lastname}</p>
                        <p  className="admin-email">{el.email}</p>
                        <p className="admin-su">{adminStatus}</p>
                    </li>
                )
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