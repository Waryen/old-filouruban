import axios from 'axios'
import React from 'react'

class CategoryCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catName: '',
            catDesc: '',
            image: undefined,
            imageName: '',
            imagePreview: undefined,
        }

        this.generateRandomString = this.generateRandomString.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Génère un nom pour l'image au montage du composant
    componentDidMount() {
        this.setState({
            imageName: this.generateRandomString(10)
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
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
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
            const newFile = new File([file], `category-${this.state.imageName}.${ext}`)
            this.setState({ image: newFile })

            const reader = new FileReader()
            reader.onloadend = () => {
                this.setState({ imagePreview: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    // Annule les changements du formulaire
    handleCancel(e) {
        e.preventDefault()
        document.querySelector('#image').value = ''
        this.setState({
            catName: '',
            catDesc: '',
            image: undefined,
            imageName: this.generateRandomString(10),
            imagePreview: undefined,
        })
    }

    // Envoi le formulaire
    handleSubmit(e) {
        e.preventDefault()
        const name = this.state.catName
        const description = this.state.catDesc
        const fd = new FormData()
        fd.append('image', this.state.image)
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        // Crée un slug
        const slug = this.state.catName.replace(/\s+/g, '-').toLocaleLowerCase()

        axios.post(`${this.props.url}/api/category?api_token=${this.props.api}`, {
            name: name,
            description: description,
            image_id: this.state.imageName,
            slug: slug,
        }).then(response => {
            if(response.status == 200) {
                axios.post('uploadCategoryImage', fd, config)
                this.props.update()
                alert('Catégorie crée !')
            } else {
                alert("Erreur réseau")
            }
        })

        this.handleCancel(e)
    }

    render() {
        // Rendu de la prévisualisation de l'image
        let imgPrev
        if(this.state.imagePreview) {
            imgPrev = <img src={this.state.imagePreview} alt="Image de la catégorie" className="img-preview" width="200px" height="200px" />
        }

        return(
            <div className="category-create">
                <h3>Créer une catégorie</h3>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="category-name">
                        <label htmlFor="cat-name">Nom: </label>
                        <input type="text" name="catName" id="cat-name" value={this.state.catName} onChange={this.handleChange} required />
                    </div>
                    <div className="category-desc">
                        <label htmlFor="cat-desc">Description: </label>
                        <textarea type="text" name="catDesc" id="cat-desc" maxLength="1000" value={this.state.catDesc} onChange={this.handleChange} required />
                    </div>
                    <div className="category-img">
                        <label htmlFor="image">Sélectionner une image (taille maximale autoirsée: 500 Ko): </label>
                        <input type="file" name="image" id="image" accept="image/jpg" onChange={this.handleImageChange} required />
                        {imgPrev}
                    </div>
                    <div className="category-btns">
                        <button className="btn-submit" type="submit">Créer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CategoryCreate