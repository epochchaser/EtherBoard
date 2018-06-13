import React, { Component } from 'react';
import PostList from '../components/PostList';

class Home extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {

  }

  render() {
    const posts = [
      {
        id : 1,
        content : 'NICE',
        nickName : "Chorizo Paella"
      },
      {
        id : 2,
        content : 'FANTASTIC',
        nickName : "La pele"
      },
      {
        id : 3,
        content : 'BABY',
        nickName : "Horuseza"
      },
    ]

    return (
        <div>
          <PostList posts={posts}/>
        </div>
    );
  }
}

export default Home;