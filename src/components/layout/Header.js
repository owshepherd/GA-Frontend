import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-text">
          <h1>Sharing coding solutions</h1>
          <h1>has never been easier</h1>
          <h3>What would you like to discover today?</h3>
        </div>
        <div className="header-search">
          <div className="search-bar">
            <i className="fa fa-search search-icon" />
            <input type="text" />
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>
    );
  }
}
