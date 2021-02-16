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
      <div>
        <input type="text" name="" id="" placeholder="Search ..." onChange={this.searchHandler} value={this.state.searchTerm} />
        <button onClick={this.clickHandler}>Submit</button>
      </div>
    )
  }

}

export default SearchBar;