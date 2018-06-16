import React, { Component } from 'react';
import PostList from '../components/PostList';
import { withRoot } from '../contexts/RootContext';
import draftToHtml from 'draftjs-to-html';

class Home extends Component {
  loadPosts = () => {
    const { contractAddress, abi, setPosts } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    
    etherBoard.getPostsCount((err, r) => {
        let newPosts = [];
        const count = r.toNumber();
        
        for(let i = 0; i < count; i++){
          etherBoard.getPost(i , function(err, r) {
            const title = String(r[0]);
            const content = draftToHtml(JSON.parse(String(r[1])));
            const like = parseInt(r[2], 10);
            const dislike = parseInt(r[3], 10);

            newPosts.push({id : i, title: title, content: content, like: like, dislike: dislike});

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
    const { posts, contractAddress, abi, setLike, setDislike } = this.props;

    return (
        <div>
          <PostList 
            posts={posts}
            contractAddress={contractAddress}
            abi={abi}
            setLike={setLike}
            setDislike={setDislike}/>
        </div>
    );
  }
}

export default withRoot(Home);