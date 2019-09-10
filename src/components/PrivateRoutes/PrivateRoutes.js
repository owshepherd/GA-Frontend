import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import EditPost from "../EditPost/Editpost";
import NewPost from "../NewPost/NewPost";
import Profile from "../Profile";

class PrivateRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/auth/edit-post/:id"
          render={props => {
            return <EditPost {...props} currentUser={this.props.currentUser} />;
          }}
        />
        <Route
          path="/auth/new-post/"
          render={props => {
            return <NewPost {...props} currentUser={this.props.currentUser} />;
          }}
        />
        <Route
          path="/auth/profile/"
          render={props => {
            return <Profile {...props} currentUser={this.props.currentUser} />;
          }}
        />
      </Switch>
    );
  }
}

export default PrivateRoutes;
