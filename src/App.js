import React from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import Routes from "./Routes";
import axios from "axios";

class App extends React.Component {
  state = {
    loggedIn: false
  };

  login = async (username, password) => {
    const URL = "https://git-answer-backend.now.sh/users/login";
    try {
      const response = await axios.post(URL, {
        username: username,
        password: password
      });
      localStorage.setItem("token", response.data);
      this.setState({
        loggedIn: true
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  handleLogout = () => {
    console.log("clicked");
    localStorage.removeItem("token");
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <NavBar handleLogout={this.handleLogout} />
        <Header />
        <Routes
          loggedIn={this.state.loggedIn}
          handleLogout={this.handleLogout}
          login={this.login}
        />
      </div>
    );
  }
}

export default App;
