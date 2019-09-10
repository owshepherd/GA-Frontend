import React from "react";
import axios from "axios";

class NewPost extends React.Component {
  handleChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTags = tags => {
    return tags.split(", ");
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const tags = this.handleTags(this.state.tags);
    const postPath = "https://git-answer-backend.now.sh/posts";
    const token = localStorage.getItem("token");
    axios
      .post(
        postPath,
        {
          title: this.state.title,
          text: this.state.text,
          tags: tags
        },
        { headers: { "x-auth-token": token } }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <div>
        <h1>Create new post</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            className="titlepost"
          />

          <label htmlFor="text">Body</label>
          <input
            type="textarea"
            name="text"
            onChange={this.handleChange}
            className="bodypost"
          />

          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            onChange={this.handleChange}
            className="tagpost"
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NewPost;
