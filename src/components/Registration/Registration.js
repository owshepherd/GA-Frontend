import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const { username, email, password } = this.state;

      const postUser = "https://git-answer-backend.now.sh/users";
      const response = await axios.post(postUser, {
        username,
        password,
        email
      });
      console.log(response);
      this.setState({ data: response.data });
      this.props.login(username, password);
    } catch (err) {
      console.log(err.response);
    }
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </form>
        </div>
      );
    } else {
      return <Redirect to="/profile" />;
    }
  }
}

export default Registration;
