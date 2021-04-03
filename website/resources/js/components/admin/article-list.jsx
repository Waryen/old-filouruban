import axios from 'axios'
import React from 'react'

class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            id: undefined,
            name: '',
            description: '',
        }

        this.deleteArticle = this.deleteArticle.bind(this)
        this.modifyArticle = this.modifyArticle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    // Récupère la liste des articles
    componentDidMount() {
        document.querySelector('.article-modify').style.display = 'none'
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => this.setState({articles: response.data}))
    }

    // Récupère les données d'un article pour le formulaire de modification
    modifyArticle(e) {
        const id = e.target.value
        document.querySelector('.article-list').style.display = 'none'
        document.querySelector('.article-modify').style.display = 'block'
        axios.get(`${this.props.url}/api/article/${id}?api_token=${this.props.api}`)
            .then(res => {
                this.setState({ name: res.data.name })
                this.setState({ description: res.data.description })
                this.setState({ id: id })
            })
    }

    // Annule les modifications du formulaire de modification
    handleCancel(e) {
        e.preventDefault()
        this.setState({ name: '' })
        this.setState({ description: '' })
        this.setState({ id: undefined })
        document.querySelector('.article-list').style.display = 'block'
        document.querySelector('.article-modify').style.display = 'none'
    }

    // Gère le changement des inputs du formulaire de modification
    handleChange(e) {
        const name = e.target.name
        const value = e.target.value

        this.setState({ [name]: value })
    }

    // Envoi les modifications du formulaire de modification au serveur
    handleModify(e) {
        e.preventDefault()
        axios.patch(`${this.props.url}/api/article/${this.state.id}?api_token=${this.props.api}`, {
            name: this.state.name,
            description: this.state.description
        })
        document.querySelector('.article-list').style.display = 'block'
        document.querySelector('.article-modify').style.display = 'none'
    }

    // Supprime un article
    deleteArticle(e) {
        const id = e.target.value
        axios.delete(`${this.props.url}/api/article/${id}?api_token=${this.props.api}`)
    }

    render() {
        const list = []
        this.state.articles.forEach(el => {
            list.push(
                <li key={el.id}>
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                    <button value={el.id} onClick={this.modifyArticle} >Modifier</button>
                    <button value={el.id} onClick={this.deleteArticle} >Supprimer</button>
                </li>
            )
        })

        return (
            <div>
                <div className="article-list">
                    <h2>Liste des articles</h2>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className="article-modify">
                    <h2>Modifier l'article: {this.state.name}</h2>
                    <form method="post" onSubmit={this.handleModify}>
                        <div>
                            <label htmlFor="article-name">Nom: </label>
                            <input type="text" name="name" id="article-name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="article-desc">Description: </label>
                            <input type="text" name="description" id="article-desc" value={this.state.description} onChange={this.handleChange} />
                        </div>
                        <div>
                            <button onClick={this.handleCancel}>Annuler</button>
                            <button type="submit">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ArticleList