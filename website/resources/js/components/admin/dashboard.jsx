import React from 'react'
import axios from 'axios'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            admins: [],
            articles: [],
            categories: [],
            commentaries: [],
            messages: [],
            contacts: [],
            subscribers: [],
        }
    }

    // Récupère toutes les données
    componentDidMount() {
        axios.get(`${this.props.url}/api/admin?api_token=${this.props.api}`)
            .then(response => this.setState({ admins: response.data }))
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => this.setState({ articles: response.data }))
        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
            .then(response => this.setState({ categories: response.data }))
        axios.get(`${this.props.url}/api/commentary?api_token=${this.props.api}`)
            .then(response => this.setState({ commentaries: response.data }))
        axios.get(`${this.props.url}/api/message?api_token=${this.props.api}`)
            .then(response => this.setState({ messages: response.data }))
        axios.get(`${this.props.url}/api/contact?api_token=${this.props.api}`)
            .then(response => this.setState({ contacts: response.data }))
        axios.get(`${this.props.url}/api/subscriber?api_token=${this.props.api}`)
            .then(response => this.setState({ subscribers: response.data }))
    }

    render() {
        // Rendu du nombre total de chaque tables
        const admins = this.state.admins
        const articles = this.state.articles
        const categories = this.state.categories
        const commentaries = this.state.commentaries
        const messages = this.state.messages
        const contacts = this.state.contacts
        const subscribers = this.state.subscribers

        let adminsNum = 0
        let articlesNum = 0
        let categoriesNum = 0
        let commentariesNum = 0
        let messagesNum = 0
        let contactsNum = 0
        let subscribersNum = 0

        for(let i = 0; i < admins.length; i++) {
            adminsNum ++
        }

        for(let i = 0; i < articles.length; i++) {
            articlesNum ++
        }

        for(let i = 0; i < categories.length; i++) {
            categoriesNum ++
        }

        for(let i = 0; i < commentaries.length; i++) {
            commentariesNum ++
        }

        for(let i = 0; i < messages.length; i++) {
            messagesNum ++
        }

        for(let i = 0; i < contacts.length; i++) {
            contactsNum ++
        }

        for(let i = 0; i < subscribers.length; i++) {
            subscribersNum ++
        }

        return(
            <div className="admin-dashboard">
                <h2 className="dash-title">Tableau de bord</h2>
                <p className="dash-admin">Nombre d'admins <br/> <span>{adminsNum}</span></p>
                <p className="dash-art">Nombre d'articles <br/> <span>{articlesNum}</span></p>
                <p className="dash-cat">Nombre de catégories <br/> <span>{categoriesNum}</span></p>
                <p className="dash-com">Nombre de commentaires <br/> <span>{commentariesNum}</span></p>
                <p className="dash-mes">Nombre de messages <br/> <span>{messagesNum}</span></p>
                <p className="dash-con">Nombre de contacts <br/> <span>{contactsNum}</span></p>
                <p className="dash-sub">Nombre d'abonnés à la newsletter <br/> <span>{subscribersNum}</span></p>
            </div>
        )
    }
}

export default Dashboard