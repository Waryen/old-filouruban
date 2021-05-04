import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'

class CommentaryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentaries: [],
            articles: [],
        }

        this.deleteCommentary = this.deleteCommentary.bind(this)
    }

    // Récupération de la liste des commentaires et des articles
    componentDidMount() {
        axios.get(`${this.props.url}/api/commentary?api_token=${this.props.api}`)
            .then(res => {
                this.setState({ commentaries: res.data })
            })
            axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(res => {
                this.setState({ articles: res.data })
            })
    }

    // Supprime un commentaire
    deleteCommentary(e) {
        e.preventDefault()
        const id = e.target.value
        axios.delete(`${this.props.url}/api/commentary/${id}?api_token=${this.props.api}`)
        this.componentDidMount()
    }

    render() {
        const list = []
        const commentaries = this.state.commentaries
        const articles = this.state.articles

        // Rendu de la liste des commentaires
        commentaries.forEach(el => {
            let articleName
            let articleId
            for(let i = 0; i < articles.length; i++) {
                if(el.articles_id === articles[i].id) {
                    articleName = articles[i].name
                    articleId = articles[i].id
                }
            }
            list.push(
                <li key={el.id}>
                    <h4>{el.firstname} {el.lastname}</h4>
                    <p className="com-content"><span>Contenu du commentaire:</span><br></br>{el.content}</p>
                    <p className="com-date"><span>Date du commentaire:</span> {el.date}</p>
                    <p className="com-art"><span>Article concerné:</span> <Link to={`article#article-${articleId}`}>{articleName}</Link></p>
                    <button value={el.id} onClick={this.deleteCommentary} >Supprimer</button>
                </li>
            )
        })

        return(
            <div className="com-list">
                <h3>Liste des commentaires</h3>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default CommentaryList