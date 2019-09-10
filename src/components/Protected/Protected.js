import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

class Protected extends Component {
  state = {
    currentUser: null
  };
  async componentDidMount() {
    // get the token
    const token = localStorage.getItem("token");
    try {
      // hit the current user endpoint
      const response = await axios.get(
        "https://git-answer-backend.now.sh/users/current-user",
        {
          headers: { "x-auth-token": token }
        }
      );
      this.setState({
        currentUser: response.data
      });
      // if it returns true then user can access views
    } catch (err) {
      // console.log(err.response);
      this.setState({
        error: true
      });
    }
    // otherwise user is redirected back to login page
  }

  render() {
    const { currentUser, error } = this.state;
    if (error) {
      return <Redirect to="/login" />;
    } else if (currentUser) {
      return <PrivateRoutes currentUser={currentUser} />;
    } else {
      return null;
    }
  }
}

export default Protected;
