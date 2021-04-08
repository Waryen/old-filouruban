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

    // Gère la sélection de l'image
    handleImageChange(e) {
        e.preventDefault()
        const file = e.target.files[0]
        if(file.size > 100000) {
            document.querySelector('#image').value = ''
            alert('Fichier trop volumineux !')
        } else {
            const ext = file.name.split('.').pop(1)
            const newFile = new File([file], `article-${this.state.imageName}.${ext}`)
            this.setState({ image: newFile })
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

        })
    }

    // Envoi le formulaire et l'image
    handleSubmit(e) {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', this.state.image)
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        axios.post(`${this.props.url}/api/article?api_token=${this.props.api}`,
            {
                name: this.state.name,
                description: this.state.description,
                categories_id: this.state.category,
                admins_id: this.state.admin,
                image_id: this.state.imageName,
            }
        )

        axios.post('uploadArticleImage', fd, config)

        this.handleCancel(e)
    }

    render() {
        // Rendu de la liste des catégories
        let list = []
        const catList = this.state.categories

        catList.forEach(el => {
            list.push(
                <option key={el.id} value={el.id}>{el.name}</option>
            )
        })

        return(
            <div>
                <h2>Créer un article</h2>
                <form method="post" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Nom: </label>
                    <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input type="text" name='description' value={this.state.description} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="image">Sélectionner une image (taille maximale autoirsée: 100 Ko): </label>
                    <input type="file" name="image" id="image" accept="image/jpeg" onChange={this.handleImageChange} />
                </div>
                <div>
                    <label htmlFor="categories_id">Catégorie: </label>
                    <select name="category" id="categories_id" value={this.state.category} onChange={this.handleChange}>
                        {list}
                    </select>
                </div>
                <div>
                    <button onClick={this.handleCancel} >Annuler</button>
                    <button type="submit">Envoyer</button>
                </div>
            </form>
            </div>
        )
    }
}

export default ArticleCreate