import axios from 'axios'
import React from 'react'

class CommentaryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentaries: [],
            articles: [],
        }

        this.setId = this.setId.bind(this)
        this.deleteCommentary = this.deleteCommentary.bind(this)
    }

    setId(catId, artId) {
        sessionStorage.setItem('catId', catId)
        sessionStorage.setItem('artId', artId)
    }

    // Supprime un commentaire
    deleteCommentary(e) {
        e.preventDefault()
        if(confirm('Voulez-vous vraiment supprimer ce commentaire ? Cette action est irréversible')) {
            const id = e.target.value
            axios.delete(`${this.props.url}/api/commentary/${id}?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.props.update()
                    alert('Commentaire supprimé !')
                } else {
                    alert('Erreur réseau')
                }
            })
        }
    }

    render() {
        const list = []
        const commentaries = this.props.commentaries
        const articles = this.props.articles

        // Rendu de la liste des commentaires
        commentaries.forEach(el => {
            let articleName
            let articleCat
            let articleId
            for(let i = 0; i < articles.length; i++) {
                if(el.articles_id === articles[i].id) {
                    articleName = articles[i].name
                    articleCat  = articles[i].categories_id
                    articleId = articles[i].id
                }
            }
            list.push(
                <li key={el.id}>
                    <h4>{el.firstname} {el.lastname}</h4>
                    <p className="com-content"><span>Contenu du commentaire:</span><br></br>{el.content}</p>
                    <p className="com-date"><span>Date du commentaire:</span> {el.date}</p>
                    <p className="com-art"><span>Article concerné:</span> <a href={`/articles/${articleCat}/${articleId}`} onClick={() => {this.setId(articleCat, articleId)}}>{articleName}</a></p>
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