import React from 'react';


class SearchBar extends React.Component {

  state = {
    searchTerm: ""
  }

  searchHandler = (event) => {
    this.setState({
      searchTerm: event.currentTarget.value
    })

  }

  clickHandler = () => {
    this.props.changeSearch(this.state.searchTerm)

  }

  render() {
    return (
      
      <div className="searchBar">
      
        <input className="searchInput" type="text" name="Search..." id="" placeholder="" onChange={this.searchHandler} value={this.state.searchTerm} />
        <button className="searchButton" onClick={this.clickHandler}>{this.props.buttonTitle}</button>
        
      </div>
    )
    
  }

}

export default SearchBar;