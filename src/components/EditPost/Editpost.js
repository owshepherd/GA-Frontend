import React from "react";
import axios from "axios";

class EditPost extends React.Component {
  state = {
    posts: null,
    redirect: false
  };

  async componentDidMount() {
    console.log("inside component did mount");
    const { id } = this.props.match.params;
    let API = `https://git-answer-backend.now.sh/posts/${id}`;
    try {
      const response = await axios.get(API);
      console.log(response);
      this.setState({
        posts: response.data
      });
      console.log(this.state.posts);
    } catch (err) {
      console.log(err.response);
    }
  }

  handleChange = e => {
    const updatedPosts = this.state.posts;
    updatedPosts[e.target.id] = e.target.value;
    this.setState({
      posts: updatedPosts
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const {
      title,
      text,
      author: { _id: author }
    } = this.state.posts;
    const { id } = this.props.match.params;
    console.log(title);
    try {
      const response = await axios.put(
        `https://git-answer-backend.now.sh/posts/${id}`,
        {
          title,
          text,
          author
        },
        { headers: { "x-auth-token": token } }
      );
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };

  handleDelete = async id => {
    console.log(id);
    const response = await axios.delete(
      `https://git-answer-backend.now.sh/posts/${id}`
    );
    this.setState({ redirect: true });
  };

  checkIfUserOwnsPost = (currentUser, posts) => {
    // console.log(this.state.posts);
    // console.log(currentUser);
    const author = this.state.posts.author._id;
    const currentUserId = currentUser.currentUser._id;
    if (author !== currentUserId) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    console.log(this.state);
    const inputSize = {
      width: "100%",
      height: "50px"
    };
    const submitBtn = {
      border: "1px solid black"
    };
    if (!this.state.posts) {
      return null;
    } else {
      const authorized = this.checkIfUserOwnsPost(
        this.props.currentUser,
        this.state.posts
      );
      if (!authorized) {
        return <h1>Not authorized to edit this page!!!!! 🚨</h1>;
      }
      const { title, text } = this.state.posts;
      return (
        <div>
          <form>
            <label>Title</label>
            <input
              style={inputSize}
              type="text"
              name="title"
              id="title"
              defaultValue={title}
              onChange={this.handleChange}
            />
            <label>Body</label>
            <input
              style={inputSize}
              type="text"
              name="text"
              id="text"
              defaultValue={text}
              onChange={this.handleChange}
            />
            <label>Tags</label>
            <input style={inputSize} type="text" name="tags" id="tags" />
            <input
              style={submitBtn}
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            />
          </form>
          <button onClick={() => this.handleDelete(this.state.posts._id)}>
            Delete Button
          </button>
        </div>
      );
    }
  }
}

export default EditPost;
