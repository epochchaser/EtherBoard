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
    
    etherBoard.getPostCount((err, res) => {
      if(!err){
        console.log("카운트");
        let newPosts = [];
        const count = res.toNumber();
        
        for(let i = 0; i < count; i++){
          etherBoard.getPost(i , (err1, res1) => {
            if(!err1){
              console.log("포스트");
              const title = String(res1[0]);
              const content = draftToHtml(JSON.parse(String(res1[1])));
              const like = parseInt(res1[2], 10);
              const dislike = parseInt(res1[3], 10);

              etherBoard.getReplyCountFromPost(i , (err2, res2) => {
                if(!err2){
                  console.log("리플");
                  const repliesCount = res2.toNumber();
                  newPosts.push({id : i, title: title, content: content, like: like, dislike: dislike, replies: [], repliesCount: repliesCount});

                  if(i === count - 1){
                    setPosts(newPosts);
                  }
                }
              });
            }
          });
        }
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
    const { posts, contractAddress, abi, setLikeToPost, setDislikeToPost, setRepliesToPost } = this.props;

    return (
        <div>
          <PostList 
            posts={posts}
            contractAddress={contractAddress}
            abi={abi}
            setLikeToPost={setLikeToPost}
            setDislikeToPost={setDislikeToPost}
            setRepliesToPost={setRepliesToPost}/>
        </div>
    );
  }
}

export default withRoot(Home);