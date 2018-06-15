import React, { Component } from 'react';
import PostList from '../components/PostList';
import { withWeb3 } from '../contexts/Web3Context';
import draftToHtml from 'draftjs-to-html';

class Home extends Component {
  state = {
    posts : []
  }

  setPosts = (newPosts) =>{
    this.setState({
      posts : newPosts
    })
  }

  extract

  loadPosts = () => {
    const { contractAddress, abi } = this.props;
    const { setPosts } = this;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    
    etherBoard.getPostsCount((err, r) => {
      let newPosts = [];
      const count = r.toNumber();
      console.log(count);
      for(let i = 0; i < count; i++){
        etherBoard.getPost(i , function(err, r) {
          const title = String(r[0]);
          const data = draftToHtml(JSON.parse(String(r[1])));
          const like = parseInt(r[2], 10);
          const unlike = parseInt(r[3], 10);
          const kind = parseInt(r[4], 10);
          newPosts.push({id : i, title: title, content: data, like: like, unlike: unlike, kind: kind});

          if(i === count - 1){
            setPosts(newPosts);
          }
        });
      }
    });
  }

  shouldComponentUpdate = (nextProps, nextState) =>{
    return true;
  }

  componentDidMount = () =>{
    this.loadPosts();
  }

  render() {
    return (
        <div>
          <PostList posts={this.state.posts}/>
        </div>
    );
  }
}

export default withWeb3(Home);