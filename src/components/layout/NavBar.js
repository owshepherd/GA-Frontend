import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <header className="topnav">
        <h3>GitAnswer</h3>
        <div className="topnav-links">
          <Link to="/">Home</Link>
          <Link to="/auth/profile">Profile</Link>
          <Link to="/registration">Register</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/auth/new-post">New Post</Link>
          <button onClick={this.props.handleLogout}>Log Out</button>
        </div>
      </header>
    );
  }
}
