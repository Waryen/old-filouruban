import axios from 'axios'
import React from 'react'

class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            articles: [],
            catId: undefined,
            newCatName: '',
            newCatDesc: '',
        }

        this.modifyCategory = this.modifyCategory.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
    }

    // Récupère la liste des catégories et des articles
    componentDidMount() {
        document.querySelector('.category-modify').style.display = 'none'
        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
            .then(res => {
                this.setState({ categories: res.data })
            })
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(res => {
                const list = res.data
                list.forEach(el => {
                    this.setState({ articles: [...this.state.articles, el.categories_id] })
                })
            })
    }

    // Récupère les données d'une catégorie pour le formulaire de modification
    modifyCategory(e) {
        e.preventDefault()
        const id = e.target.value

        document.querySelector('.category-list').style.display = 'none'
        document.querySelector('.category-modify').style.display = 'block'

        axios.get(`${this.props.url}/api/category/${id}?api_token=${this.props.api}`)
            .then(res => {
                this.setState({
                    catId: id,
                    newCatName: res.data.name,
                    newCatDesc: res.data.description,
                })
            })
    }

    // Annule les modifications du formulaire
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            newCatName: '',
            newCatDesc: '',
        })
        document.querySelector('.category-list').style.display = 'block'
        document.querySelector('.category-modify').style.display = 'none'
    }

    // Gère les changements du formulaire
    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    // Envoi les modifications du formulaire
    handleModify(e) {
        e.preventDefault()
        axios.patch(`${this.props.url}/api/category/${this.state.catId}?api_token=${this.props.api}`, {
            name: this.state.newCatName,
            description: this.state.newCatDesc,
        })
        document.querySelector('.category-list').style.display = 'block'
        document.querySelector('.category-modify').style.display = 'none'
    }

    // Supprime une catégorie
    deleteCategory(e) {
        e.preventDefault()
        const id = e.target.value
        axios.delete(`${this.props.url}/api/category/${id}?api_token=${this.props.api}`)
    }

    render() {
        const list = []
        const articles = this.state.articles
        const categories = this.state.categories

        // Rendu de la liste des catégories
        categories.forEach(el => {
            let check = null
            for(let i = 0; i < articles.length; i++) {
                if(el.id === articles[i]) {
                    check = true
                }
            }
            if(check) {
                list.push(
                    <li key={el.id}>
                        <h3>{el.name}</h3>
                        <p>{el.description}</p>
                        <button value={el.id} onClick={this.modifyCategory} >Modifier</button>
                    </li>
                )
            } else {
                list.push(
                    <li key={el.id}>
                        <h3>{el.name}</h3>
                        <p>{el.description}</p>
                        <button value={el.id} onClick={this.modifyCategory} >Modifier</button>
                        <button value={el.id} onClick={this.deleteCategory} >Supprimer</button>
                    </li>
                )
            }
        })

        return(
            <div>
                <div className="category-list">
                    <h2>Liste des catégories</h2>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className="category-modify">
                    <h2>Modifier une catégorie</h2>
                    <form method="post" onSubmit={this.handleModify}>
                        <div>
                            <label htmlFor="cat-name">Nom: </label>
                            <input type="text" name="newCatName" id="cat-name" value={this.state.newCatName} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="cat-desc">Description: </label>
                            <input type="text" name="newCatDesc" id="cat-desc" value={this.state.newCatDesc} onChange={this.handleChange} />
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

export default CategoryList