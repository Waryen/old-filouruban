import React from 'react'
import axios from 'axios'

export default class Subscriber extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subs: [],
        }

        this.deleteSub = this.deleteSub.bind(this)
    }

    componentDidMount() {
        axios
            .get(`${this.props.url}/api/subscriber?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ subs: response.data })
                }
            })
    }

    deleteSub(id) {
        if(confirm('Voulez-vous vraiment supprimer cet(te) abonné(e) ? Cette action est irréversible')) {
            axios.delete(`${this.props.url}/api/subscriber/${id}?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.componentDidMount()
                }
            })
        }
    }

    render() {
        const subs = this.state.subs
        let list = []

        subs.forEach(el => {
            list.push(
                <li key={el.id}>
                    <p>{el.email}</p>
                    <button className="delete" onClick={() => {this.deleteSub(el.id)}}>Supprimer</button>
                </li>
            )
        })

        return(
            <div className="admin-subscriber">
                <h2 className="sub-title">Liste des abonnés</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}