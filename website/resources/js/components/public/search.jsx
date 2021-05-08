import React from 'react'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const value = e.target.value
        this.setState({ search: value })
    }

    // Stocke la valeur du champs du formulaire dans le Local Storage
    handleSubmit(e) {
        e.preventDefault()
        const value = this.state.search
        if(value.length) {
            sessionStorage.setItem('search', value)
            this.setState({ search: '' })
        }

        window.location.href = `${this.props.url}/search`
    }

    render() {
        return(
            <form method="post" onSubmit={this.handleSubmit}>
                <input type="text" name="search" placeholder="Rechercher un article" value={this.state.search} id="search-input" className="form-search" onChange={this.handleChange} required />
                <button type="submit"><i className="fas fa-search"></i></button>
            </form>
        )
    }
}

export default Search