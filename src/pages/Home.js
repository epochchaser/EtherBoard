import React, { Component } from 'react';
import PostList from '../components/PostList';
import { withWeb3 } from '../contexts/Web3Context';

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

  loadPosts = () => {
    const { contractAddress, abi } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    
    etherBoard.getPostsCount((err, r) => {
      let newPosts = [];

      for(let i = 0; i < r.toNumber(); i++){
        etherBoard.getPost(i , function(err, r) {
          const data = String(r[0]);
          newPosts.push({id : i, content: data});
        });
      }

      this.setState({
        posts : newPosts
      })

    });
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