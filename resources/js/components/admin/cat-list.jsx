import axios from 'axios'
import React from 'react'

class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            catId: undefined,
            newCatName: '',
            newCatDesc: '',
            image: undefined,
            imagePreview: undefined,
        }

        this.modifyCategory = this.modifyCategory.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
    }

    // Récupère la liste des catégories et des articles
    componentDidMount() {
        document.querySelector('.category-modify').style.display = 'none'
        
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
        .then(res => {
            if(res.status == 200) {
                const list = res.data
                list.forEach(el => {
                    this.setState({ articles: [...this.state.articles, el.categories_id] })
                })
            }
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
            if(res.status == 200) {
                this.setState({
                    catId: id,
                    newCatName: res.data.name,
                    newCatDesc: res.data.description,
                    imagePreview: `${this.props.url}/media/images/categories/category-${res.data.image_id}.jpg`,
                })
            }
        })
    }

    // Annule les modifications du formulaire
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            newCatName: '',
            newCatDesc: '',
            image: undefined,
            imagePreview: undefined,
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

    // Gère la sélection de l'image et la prévisualisation
    handleImageChange(e) {
        e.preventDefault()

        const name = this.state.imagePreview
        const url = name.split('-').pop(1)
        const newName = url.split('.').shift(1)

        const file = e.target.files[0]
        if(file.size > 500000) {
            document.querySelector('#category-img').value = ''
            alert('Fichier trop volumineux !')
        } else {
            const ext = file.name.split('.').pop(1)
            const newFile = new File([file], `category-${newName}.${ext}`)
            this.setState({ image: newFile })

            const reader = new FileReader()
            reader.onloadend = () => {
                this.setState({ imagePreview: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    // Envoi les modifications du formulaire
    handleModify(e) {
        e.preventDefault()

        // Crée un slug
        const slug = this.state.newCatName.replace(/\s+/g, '-').toLocaleLowerCase()

        axios.patch(`${this.props.url}/api/category/${this.state.catId}?api_token=${this.props.api}`, {
            name: this.state.newCatName,
            description: this.state.newCatDesc,
            slug: slug,
        }).then(response => {
            if(response.status == 200) {
                if(this.state.image) {
                    const fd = new FormData()
                    fd.append('image', this.state.image)
                    const config = { headers: { 'content-type': 'multipart/form-data' } }
                    axios.post('uploadCategoryImage', fd, config)
                }
                this.props.update()
                alert('Catégorie modifiée !')
            } else {
                alert("Erreur réseau")
            }
        })

        document.querySelector('.category-list').style.display = 'block'
        document.querySelector('.category-modify').style.display = 'none'
    }

    // Supprime une catégorie
    deleteCategory(e) {
        e.preventDefault()
        if(confirm('Voulez-vous vraiment supprimer cette catégorie ? Cette action est irréversible')) {
            const id = e.target.value
            const categories = this.props.categories
            let name
            
            categories.forEach(el => {
                if(el.id == id) {
                    name = el.image_id
                }
            })
    
            const fd = new FormData()
            fd.append('name', name)
    
            axios.delete(`${this.props.url}/api/category/${id}?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    axios.post('deleteCategoryImage', fd)
                    this.props.update()
                    alert('Catégorie supprimée !')
                } else {
                    alert('Erreur réseau')
                }
            })
        }
    }

    render() {
        const list = []
        const articles = this.state.articles
        const categories = this.props.categories
        let imgPrev

        if(this.state.imagePreview) {
            imgPrev = <img src={this.state.imagePreview} alt="Image de l'article" className="img-preview" width="200px" height="200px" />
        }

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
                        <h4>{el.name}</h4>
                        <img src={`${this.props.url}/media/images/categories/category-${el.image_id}.jpg`} alt={`Image de la catégorie: ${el.name}`} width="200px" height="200px" />
                        <button value={el.id} onClick={this.modifyCategory} >Modifier</button>
                    </li>
                )
            } else {
                list.push(
                    <li key={el.id}>
                        <h4>{el.name}</h4>
                        <img src={`${this.props.url}/media/images/categories/category-${el.image_id}.jpg`} alt={`Image de la catégorie: ${el.name}`} width="200px" height="200px" />
                        <div>
                            <button value={el.id} onClick={this.modifyCategory} >Modifier</button>
                            <button value={el.id} onClick={this.deleteCategory} >Supprimer</button>
                        </div>
                    </li>
                )
            }
        })

        return(
            <div>
                <div className="category-list">
                    <h3>Liste des catégories</h3>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className="category-modify">
                    <h3>Modifier une catégorie</h3>
                    <form method="post" onSubmit={this.handleModify}>
                        <div className="category-name">
                            <label htmlFor="cat-name">Nom: </label>
                            <input type="text" name="newCatName" id="cat-name" value={this.state.newCatName} onChange={this.handleChange} required />
                        </div>
                        <div className="category-desc">
                            <label htmlFor="cat-desc">Description: </label>
                            <textarea type="text" name="newCatDesc" id="cat-desc" maxLength="1000" value={this.state.newCatDesc} onChange={this.handleChange} required />
                        </div>
                        <div className="category-img">
                            <label htmlFor="category-img">Image (taille maximale autoirsée 500 Ko): </label>
                            <input type="file" name="image" id="category-img" accept="image/jpg" onChange={this.handleImageChange} />
                            {imgPrev}
                        </div>
                        <div className="category-btns">
                            <button className="btn-cancel" onClick={this.handleCancel}>Annuler</button>
                            <button className="btn-submit" type="submit">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CategoryList