import React, { Component } from 'react';
import axios from 'axios';


class Signup extends Component {

  state = { username: "", password: "" };


  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    axios.post("/api/user-signup", { username, password })
      .then(() => {
        this.setState({ username: "", password: "" });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleFormSubmit}>
          <label className="usn">Username</label> <br />
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          <br />
          <label className="psw">Password</label>
          <br />
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          <br />
          <input className="submitButton" type="submit" value="Submit" />
         

        </form>

      </div>
    )
  }
}

export default Signup;


