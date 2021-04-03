import axios from 'axios'
import React from 'react'

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            category: undefined,
            admin: undefined,
            categories: [],
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const parsedAuth = JSON.parse(this.props.auth)
        this.setState({ admin: parsedAuth.id })

        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
            .then(res => {
                this.setState({ categories: res.data })
                this.setState({ category: res.data[0].id })
            })
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        axios.post(`${this.props.url}/api/article?api_token=${this.props.api}`,
            {
                name: this.state.name,
                description: this.state.description,
                categories_id: this.state.category,
                admins_id: this.state.admin,
            }
        )
    }

    render() {
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
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Nom: </label>
                    <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input type="text" name='description' value={this.state.description} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="categories_id">Catégorie: </label>
                    <select name="category" id="categories_id" value={this.state.category} onChange={this.handleChange}>
                        {list}
                    </select>
                </div>
                <div>
                    <button type="submit">Envoyer</button>
                </div>
            </form>
            </div>
        )
    }
}

export default ArticleCreate