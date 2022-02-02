import axios from 'axios'
import React from 'react'

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: undefined,
            imageName: '',
            imagePreview: undefined,
            category: undefined,
            admin: undefined,
            categories: [],
        }

        this.generateRandomString = this.generateRandomString.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Récupère la liste des catégories
    componentDidMount() {
        const parsedAuth = JSON.parse(this.props.auth)
        this.setState({
            admin: parsedAuth.id,
            imageName: this.generateRandomString(10),
        })

        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
        .then(res => {
            this.setState({ categories: res.data })
            this.setState({ category: res.data[0].id })
        })
    }

    // Génère une chaîne de caractères aléatoire pour le nom de l'image
    generateRandomString(num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let result = ''
        for(let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }

        return result
    }

    // Gère les changements du formulaire
    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
    
        this.setState({
          [name]: value
        });
    }

    // Gère la sélection de l'image et la prévisualisation
    handleImageChange(e) {
        e.preventDefault()
        const file = e.target.files[0]
        if(file.size > 500000) {
            document.querySelector('#image').value = ''
            alert('Fichier trop volumineux !')
        } else {
            const ext = file.name.split('.').pop(1)
            const newFile = new File([file], `article-${this.state.imageName}.${ext}`)
            this.setState({ image: newFile })

            const reader = new FileReader()
            reader.onloadend = () => {
                this.setState({ imagePreview: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    // Annule les changements du formulaire et de la sélection de l'image
    handleCancel(e) {
        e.preventDefault()
        document.querySelector('#image').value = ''
        this.setState({
            name: '',
            description: '',
            image: undefined,
            imageName: this.generateRandomString(10),
            imagePreview: undefined,

        })
    }

    // Envoi le formulaire et l'image
    handleSubmit(e) {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', this.state.image)
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        // Crée un slug
        const slug = this.state.name.replace(/\s+/g, '-').toLocaleLowerCase()

        const data = {
            name: this.state.name,
            description: this.state.description,
            categories_id: this.state.category,
            admins_id: this.state.admin,
            image_id: this.state.imageName,
            slug: slug,
        }

        axios.post(`${this.props.url}/api/article?api_token=${this.props.api}`, data)
        .then(response => {
            if(response.status == 200) {
                axios.post('uploadArticleImage', fd, config)
                this.props.update()
                alert('Article créé !')
            } else {
                alert("Erreur réseau")
            }
        })

        this.handleCancel(e)
    }

    render() {
        // Rendu de la liste des catégories et de la prévisualisation de l'image
        let list = []
        let imgPrev
        const catList = this.state.categories

        catList.forEach(el => {
            list.push(
                <option key={el.id} value={el.id}>{el.name}</option>
            )
        })

        if(this.state.imagePreview) {
            imgPrev = <img src={this.state.imagePreview} alt="Image de l'article" className="img-preview" />
        }

        return(
            <div className="article-create">
                <h3>Créer un article</h3>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="article-name">
                        <label htmlFor="name">Nom: </label>
                        <input type="text" name='name' value={this.state.name} onChange={this.handleChange} required />
                    </div>
                    <div className="article-desc">
                        <label htmlFor="description">Description: </label>
                        <textarea type="text" name='description' maxLength="1000" value={this.state.description} onChange={this.handleChange} required />
                    </div>
                    <div className="article-img">
                        <label htmlFor="image">Sélectionner une image (taille maximale autorisée: 500 Ko): </label>
                        <input type="file" name="image" id="image" accept="image/jpg" onChange={this.handleImageChange} required />
                        {imgPrev}
                    </div>
                    <div className="article-cat">
                        <label htmlFor="categories_id">Catégorie: </label>
                        <select name="category" id="categories_id" value={this.state.category} onChange={this.handleChange} required >
                            {list}
                        </select>
                    </div>
                    <div className="article-btns">
                        <button className="btn-submit" type="submit">Créer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ArticleCreate