import axios from 'axios'
import React from 'react'

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
    }

    render() {
        const list = []
        const commentaries = this.state.commentaries
        const articles = this.state.articles

        // Rendu de la liste des commentaires
        commentaries.forEach(el => {
            let articleName
            for(let i = 0; i < articles.length; i++) {
                if(el.articles_id === articles[i].id) {
                    articleName = articles[i].name
                }
            }
            list.push(
                <li key={el.id}>
                    <h3>{el.firstname} {el.lastname}</h3>
                    <p>Contenu du commentaire:<br></br>{el.content}</p>
                    <p>Date du commentaire: {el.date}</p>
                    <p>Article concerné: {articleName}</p>
                    <button value={el.id} onClick={this.deleteCommentary} >Supprimer le commentaire</button>
                </li>
            )
        })

        return(
            <div>
                <h2>Liste des commentaires</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default CommentaryList