import React from "react";
import axios from "axios";

class CommentForm extends React.Component {
  handleChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const postPath = "https://git-answer-backend.now.sh/comments";
    axios
      .post(postPath, { author: this.state.author, text: this.state.text })
      .then(res => {
        console.log(res);
      });
  };
  render() {
    return (
      <div>
        <h1>Comment Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            onChange={this.handleChange}
            className="titlepost"
          />

          <label htmlFor="text">Body</label>
          <input
            type="text"
            name="text"
            onChange={this.handleChange}
            className="bodypost"
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CommentForm;
