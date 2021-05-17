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
        }

        this.getInfos = this.getInfos.bind(this)
    }

    componentDidMount() {
        this.getInfos()
    }

    countInfos(el) {
        let count = 0
        for(let i = 0; i < el.length; i++) {
            count ++
        }

        return count
    }

    // Récupère toutes les données
    getInfos() {
        const url = this.props.url
        const api = this.props.api

        function getAdmins() {
            return axios.get(`${url}/api/admin?api_token=${api}`)
        }

        function getArticles() {
            return axios.get(`${url}/api/article?api_token=${api}`)
        }

        function getCategories() {
            return axios.get(`${url}/api/category?api_token=${api}`)
        }

        function getCommentaries() {
            return axios.get(`${url}/api/commentary?api_token=${api}`)
        }

        function getMessages() {
            return axios.get(`${url}/api/message?api_token=${api}`)
        }

        function getContacts() {
            return axios.get(`${url}/api/contact?api_token=${api}`)
        }

        Promise.all([
            getAdmins(),
            getArticles(),
            getCategories(),
            getCommentaries(),
            getContacts(),
            getMessages(),
        ])
        .then(results => {
            const admins = results[0]
            const articles = results[1]
            const categories = results[2]
            const commentaries = results[3]
            const contacts = results[4]
            const messages = results[5]

            this.setState({
                admins: admins.data,
                articles: articles.data,
                categories: categories.data,
                commentaries: commentaries.data,
                contacts: contacts.data,
                messages: messages.data,
            })
        })
    }

    render() {
        // Rendu du nombre total de chaque tables
        const admins = this.state.admins
        const articles = this.state.articles
        const categories = this.state.categories
        const commentaries = this.state.commentaries
        const messages = this.state.messages
        const contacts = this.state.contacts

        let adminsNum = this.countInfos(admins)
        let articlesNum = this.countInfos(articles)
        let categoriesNum = this.countInfos(categories)
        let commentariesNum = this.countInfos(commentaries)
        let messagesNum = this.countInfos(messages)
        let contactsNum = this.countInfos(contacts)

        return(
            <div className="admin-dashboard">
                <h2 className="dash-title">Tableau de bord</h2>
                <p className="dash-admin">Nombre d'admins <br/> <span>{adminsNum}</span></p>
                <p className="dash-art">Nombre d'articles <br/> <span>{articlesNum}</span></p>
                <p className="dash-cat">Nombre de catégories <br/> <span>{categoriesNum}</span></p>
                <p className="dash-com">Nombre de commentaires <br/> <span>{commentariesNum}</span></p>
                <p className="dash-mes">Nombre de messages <br/> <span>{messagesNum}</span></p>
                <p className="dash-con">Nombre de contacts <br/> <span>{contactsNum}</span></p>
            </div>
        )
    }
}

export default Dashboard