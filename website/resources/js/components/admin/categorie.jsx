import axios from 'axios'
import React from 'react'
import CategoryCreate from './cat-create'
import CategoryList from './cat-list'

export default class Categorie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
        }

        this.getCategories = this.getCategories.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    componentDidMount() {
        this.getCategories()
    }

    getCategories() {
        axios.get(`${this.props.url}/api/category?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ categories: response.data })
            }
        })
    }

    updateData() {
        this.getCategories()
    }

    render() {
        return(
            <div className="admin-category">
                <h2>Catégories</h2>
                <CategoryCreate url={this.props.url} api={this.props.api} auth={this.props.auth} update={this.updateData} />
                <CategoryList url={this.props.url} api={this.props.api} categories={this.state.categories} update={this.updateData} />
            </div>
        )
    }
}