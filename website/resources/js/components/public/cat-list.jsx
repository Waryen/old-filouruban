import React from 'react'
import axios from 'axios'

class CategoriesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
        }
    }

    // Récupère la liste des catégories
    componentDidMount() {
        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ categories: response.data })
                }
            })
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
                    <a href={`articles/${el.id}`} className="cat-img"><img src={`${this.props.url}/media/images/categories/category-${el.image_id}.jpg`} alt={`Image de la catégorie: ${el.name}`} width="200px" height="200px" /></a>
                    <a href={`articles/${el.id}`} className="link-to-art">Voir les articles</a>
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