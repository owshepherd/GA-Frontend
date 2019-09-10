import React, { Component } from "react";
import "./Landing.css";
import PostPreview from "./PostPreview";
import TrendingPosts from "./TrendingPosts";
import Loading from "./Loader";
const API = "https://git-answer-backend.now.sh/posts";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const posts = await response.json();
      this.setState({ posts: posts });
    } catch (error) {
      console.log("Fetch Error: Landing.js, componentDidMount");
      console.error(error);
    }
  }

  render() {
    if (!this.state.posts) {
      return <Loading />;
    }
    return (
      <div className="content">
        <div className="main-container">
          <h2>Latest Solutions</h2>
          <hr />
          {this.state.posts.map(post => (
            <PostPreview key={post._id} data={post} />
          ))}
        </div>

        <div className="right-side-container">
          <div className="trending-container">
            <h2>Trending</h2>
            <TrendingPosts key="0" data={this.state.posts[0]} />
            <TrendingPosts key="1" data={this.state.posts[1]} />
            <TrendingPosts key="2" data={this.state.posts[2]} />
            <TrendingPosts key="3" data={this.state.posts[3]} />
            <TrendingPosts key="4" data={this.state.posts[4]} />
          </div>
        </div>
      </div>
    );
  }
}
