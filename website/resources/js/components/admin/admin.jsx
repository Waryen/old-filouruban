import axios from 'axios'
import React from 'react'
import AdminCreate from './admin-create'
import AdminList from './admin-list'

export default class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            admins: [],
        }

        this.getAdmins = this.getAdmins.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    componentDidMount() {
        this.getAdmins()
    }

    getAdmins() {
        axios.get(`${this.props.url}/api/admin?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ admins: response.data })
            }
        })
    }

    updateData() {
        this.getAdmins()
    }

    render() {
        return(
            <div className="admin-admins">
                <h2>Administrateurs</h2>
                <AdminCreate url={this.props.url} api={this.props.api} auth={this.props.auth} update={this.updateData} />
                <AdminList url={this.props.url} api={this.props.api} auth={this.props.auth} update={this.updateData} admins={this.state.admins} />
            </div>
        )
    }
}