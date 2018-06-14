import React, { Component } from 'react';
import PostList from '../components/PostList';

class Home extends Component {
  state = {
    posts : [
      {
        id : 0,
        content : "FIRST"
      },
      {
        id : 1,
        content : "SECOND"
      },
      {
        id : 2,
        content : "THIRD"
      }
    ]
  }

  componentDidMount = () =>{
  }

  render() {
    return (
        <div>
          <PostList posts={this.state.posts}/>
        </div>
    );
  }
}

export default Home;