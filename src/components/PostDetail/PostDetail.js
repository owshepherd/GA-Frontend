import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class PostDetail extends Component {
  state = {
    redirect: false
  };
  async componentDidMount() {
    console.log("inside component did mount");
    const { id } = this.props.match.params;
    let API = `https://git-answer-backend.now.sh/posts/${id}`;
    try {
      const response = await axios.get(API);
      this.setState({
        post: response.data
      });
      console.log(this.state.post);
    } catch (err) {
      console.log(err.response);
    }
  }

  handleDelete = async id => {
    console.log(id);
    const response = await axios.delete(
      `https://git-answer-backend.now.sh/posts/${id}`
    );
    this.setState({ redirect: true });
  };

  render() {
    console.log("inside render");
    console.log(this.state);
    // return <p>Loading</p>;
    // console.log(this.props.match.params);
    const btn = {
      border: "1px solid black"
    };
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (!this.state.post) {
      return null;
    } else {
      return (
        <div>
          <h1>Post Detail</h1>

          {this.state.post && (
            <div>
              <h2>{this.state.post.title}</h2>
              <p>{this.state.post.author.username}</p>
              <p>{this.state.post.date}</p>
              <p>{this.state.post.text}</p>
              <Link to={`/auth/edit-post/${this.state.post._id}`}>
                <div style={btn}>Edit post</div>
              </Link>
            </div>
          )}
        </div>
      );
    }
  }
}

export default PostDetail;
