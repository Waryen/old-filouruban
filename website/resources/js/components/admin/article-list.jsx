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
            image: undefined,
            imagePreview: undefined,
            prevCatId: undefined,
            prevCatName: '',
            categories_id: undefined,
        }

        this.deleteArticle = this.deleteArticle.bind(this)
        this.modifyArticle = this.modifyArticle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
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
                    imagePreview: `${this.props.url}/media/images/articles/article-${res.data.image_id}.jpg`,
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
            image: undefined,
            imagePreview: undefined,
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

    // Gère la sélection de l'image et la prévisualisation
    handleImageChange(e) {
        e.preventDefault()

        const name = this.state.imagePreview
        const url = name.split('-').pop(1)
        const newName = url.split('.').shift(1)

        const file = e.target.files[0]
        if(file.size > 500000) {
            document.querySelector('#article-img').value = ''
            alert('Fichier trop volumineux !')
        } else {
            const ext = file.name.split('.').pop(1)
            const newFile = new File([file], `article-${newName}.${ext}`)
            this.setState({ image: newFile })

            const reader = new FileReader()
            reader.onloadend = () => {
                this.setState({ imagePreview: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    // Envoi les modifications du formulaire de modification au serveur
    handleModify(e) {
        e.preventDefault()

        if(this.state.image) {
            const fd = new FormData()
            fd.append('image', this.state.image)
            const config = { headers: { 'content-type': 'multipart/form-data' } }

            axios.post('uploadArticleImage', fd, config)
        }

        axios.patch(`${this.props.url}/api/article/${this.state.id}?api_token=${this.props.api}`, {
            name: this.state.name,
            description: this.state.description,
            categories_id: this.state.categories_id,
        })

        this.componentDidMount()

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

        axios.post('deleteArticleImage', fd)
        axios.delete(`${this.props.url}/api/article/${id}?api_token=${this.props.api}`)
        this.componentDidMount()
    }

    render() {
        const list = []
        const cat = []
        let imgPrev

        if(this.state.imagePreview) {
            imgPrev = <img src={this.state.imagePreview} alt="Image de l'article" className="img-preview" width="200px" height="200px" />
        }

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
                <li key={el.id} id={`article-${el.id}`}>
                    <h4>{el.name}</h4>
                    <p className="article-cat">{catName}</p>
                    <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Image de l'article: ${el.name}`} />
                    <div className="article-btns">
                        <button value={el.id} onClick={this.modifyArticle} >Modifier</button>
                        <button value={el.id} onClick={this.deleteArticle} >Supprimer</button>
                    </div>
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
                    <h3>Liste des articles</h3>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className="article-modify">
                    <h3>Modifier un article</h3>
                    <form method="post" onSubmit={this.handleModify}>
                        <div className="article-name">
                            <label htmlFor="article-name">Nom: </label>
                            <input type="text" name="name" id="article-name" value={this.state.name} onChange={this.handleChange} required />
                        </div>
                        <div className="article-desc">
                            <label htmlFor="article-desc">Description: </label>
                            <textarea type="text" name="description" id="article-desc" maxLength="1000" value={this.state.description} onChange={this.handleChange} required />
                        </div>
                        <div className="article-img">
                            <label htmlFor="article-img">Image (taille maximale autoirsée 500 Ko): </label>
                            <input type="file" name="image" id="article-img" accept="image/jpg" onChange={this.handleImageChange} />
                            {imgPrev}
                        </div>
                        <div className="article-cat">
                            <label htmlFor="article-cat">Catégorie: </label>
                            <select name="categories_id" id="article-cat" onChange={this.handleChange} required >
                                <option value={this.state.prevCatId} >{this.state.prevCatName}</option>
                                {cat}
                            </select>
                        </div>
                        <div className="article-btns">
                            <button className="btn-cancel" onClick={this.handleCancel}>Annuler</button>
                            <button className="btn-submit" type="submit">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ArticleList