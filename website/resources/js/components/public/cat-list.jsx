import React from 'react'
import axios from 'axios'

class CategoriesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
        }

        this.saveId = this.saveId.bind(this)
    }

    // Récupère la liste des catégories
    componentDidMount() {
        axios
            .get(`${this.props.url}/api/category?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ categories: response.data })
                }
            })

        /*if(sessionStorage.getItem('catId')) {
            sessionStorage.removeItem('catId')
        }*/
    }

    saveId (value) {
        return function() {
            const id = value
            sessionStorage.setItem('catId', id)
        }
    }

    render() {
        // Rendu des catégories
        const categories = this.state.categories
        let list = []
        categories.forEach(el => {
            list.push(
                <li key={el.id}>
                    <h3>{el.name}</h3>
                    <p>{el.description}</p>
                    <a href={`articles/${el.id}`} className="cat-img" onClick={this.saveId(el.id)}><img src={`${this.props.url}/media/images/categories/category-${el.image_id}.jpg`} alt={`Image de la catégorie: ${el.name}`} /></a>
                    <a href={`articles/${el.id}`} className="link-to-art" onClick={this.saveId(el.id)}>Voir les articles</a>
                </li>
            )
        })

        return(
            <div>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default CategoriesList