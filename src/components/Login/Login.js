import React from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    console.log(this.props);
    if (!this.props.loggedIn) {
      return (
        <div>
          <h1>Login</h1>
          <form>
            <label>
              Name:
              <input onChange={this.handleChange} type="text" name="username" />
            </label>
            <label>
              Password:
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
              />
            </label>
            <input type="submit" value="Submit" onClick={this.handleLogin} />
          </form>
        </div>
      );
    } else {
      return <Redirect to="/profile" />;
    }
  }
}

export default Login;
