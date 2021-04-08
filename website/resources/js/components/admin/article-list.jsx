import axios from 'axios'
import React from 'react'

class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            categories: [],
            id: undefined,
            name: '',
            description: '',
            prevCatId: undefined,
            prevCatName: '',
            categories_id: undefined,
        }

        this.deleteArticle = this.deleteArticle.bind(this)
        this.modifyArticle = this.modifyArticle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    // Récupère la liste des articles et des catégories
    componentDidMount() {
        document.querySelector('.article-modify').style.display = 'none'

        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => this.setState({articles: response.data}))
        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
            .then(response => this.setState({categories: response.data}))
    }

    // Récupère les données d'un article pour le formulaire de modification
    modifyArticle(e) {
        const id = e.target.value
        const categories = this.state.categories
        let catName        

        document.querySelector('.article-list').style.display = 'none'
        document.querySelector('.article-modify').style.display = 'block'

        axios.get(`${this.props.url}/api/article/${id}?api_token=${this.props.api}`)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    description: res.data.description,
                    id: id,
                    prevCatId: res.data.categories_id,
                    categories_id: res.data.categories_id,
                })

                const catId = res.data.categories_id

                for(let i = 0; i < categories.length; i++) {
                    if(categories[i].id === catId) {
                        catName = categories[i].name
                        this.setState({ prevCatName: catName })
                    }
                }
            })
    }

    // Annule les modifications du formulaire de modification
    handleCancel(e) {
        e.preventDefault()

        this.setState({
            name: '',
            description: '',
            id: undefined,
            categories_id: undefined,
            prevCatId: undefined,
            prevCatName: '',
        })

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
            description: this.state.description,
            categories_id: this.state.categories_id,
        })

        document.querySelector('.article-list').style.display = 'block'
        document.querySelector('.article-modify').style.display = 'none'
    }

    // Supprime un article
    deleteArticle(e) {
        const articles = this.state.articles
        const id = e.target.value
        let name
        
        articles.forEach(el => {
            if(el.id == id) {
                name = el.image_id
            }
        })

        const fd = new FormData()
        fd.append('name', name)

        axios.delete(`${this.props.url}/api/article/${id}?api_token=${this.props.api}`)
        axios.post('deleteArticleImage', fd)
    }

    render() {
        const list = []
        const cat = []

        // Rendu des éléments de la liste des articles
        this.state.articles.forEach(el => {
            const catList = this.state.categories
            let catName
            for(let i = 0; i < catList.length; i++) {
                if(el.categories_id === catList[i].id) {
                    catName = catList[i].name
                }
            }

            list.push(
                <li key={el.id}>
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                    <p>{catName}</p>
                    <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.png`} alt={`Image de l'article: ${el.name}`} />
                    <button value={el.id} onClick={this.modifyArticle} >Modifier</button>
                    <button value={el.id} onClick={this.deleteArticle} >Supprimer</button>
                </li>
            )
        })

        // Rendu des options pour le choix de la catégorie du formulaire de modification
        this.state.categories.forEach(el => {
            cat.push(
                <option key={el.id} value={el.id}>{el.name}</option>
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
                    <h2>Modifier un article</h2>
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
                            <label htmlFor="article-cat">Catégorie: </label>
                            <select name="categories_id" id="article-cat" onChange={this.handleChange}>
                                <option value={this.state.prevCatId} >{this.state.prevCatName}</option>
                                {cat}
                            </select>
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