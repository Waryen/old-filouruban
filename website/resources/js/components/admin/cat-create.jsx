import axios from 'axios'
import React from 'react'

class CategoryCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catName: '',
            catDesc: '',
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    handleCancel(e) {
        e.preventDefault()
        this.setState({
            catName: '',
            catDesc: '',
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const name = this.state.catName
        const description = this.state.catDesc

        axios.post(`${this.props.url}/api/category?api_token=${this.props.api}`, {
            name: name,
            description: description,
        })

        this.setState({
            catName: '',
            catDesc: '',
        })
    }

    render() {
        return(
            <div>
                <h2>Créer une catégorie</h2>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="cat-name">Nom: </label>
                        <input type="text" name="catName" id="cat-name" value={this.state.catName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="cat-desc">Description: </label>
                        <input type="text" name="catDesc" id="cat-desc" value={this.state.catDesc} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button onClick={this.handleCancel}>Annuler</button>
                        <button type="submit">Créer</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CategoryCreate