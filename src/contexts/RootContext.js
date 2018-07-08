import React, { Component, createContext } from 'react';
import state from './RootState';

const Context = createContext(); 
const { Provider, Consumer: RootConsumer } = Context; 

class RootProvider extends Component {
  state = state;

  actions = {
    setLike : (id, like) => {
      const { posts } = this.state;
      const modifiedPosts = posts.map(item => item.id === id
        ? (
            {
             ...item, 
             replies :[
              ...item.replies
             ],
             like: like 
            }
          ) 
        : item);

        console.log(modifiedPosts);
        this.setState({
            posts : modifiedPosts
        });
    },

    setDislike : (id, dislike) => {
      const { posts } = this.state;
      const modifiedPosts = posts.map(item => item.id === id
        ? (
            {
               ...item,
               replies :[
                ...item.replies
               ],
                dislike: dislike 
            }
          ) 
        : item);

        this.setState({
            posts : modifiedPosts
        });
    },

    setPosts : (posts) => {
      this.setState({
        posts: posts
      })
    },

    setReplies : (postId, replies) => {
      const { posts } = this.state;
     
      const modifiedPosts = posts.map(post => post.id === postId
        ? {...post, replies : replies, repliesCount : replies.length}
        : post);

        this.setState({
          posts : modifiedPosts
        });
    },

    getAccounts : () => {
      const web3 = window.web3;

      return new Promise((resolve, reject) => {
        if(!web3)
          reject(new  Error("please activate your wallet first."));

        web3.eth.getAccounts((err, res) => {
          if(!err){
            resolve(res);
          }
          else{
            reject(err);
          }
        });
      })
    },

    writePost : (accountAddr, title, content) => {
      const { abi, contractAddress } = this.state;
      const web3 = window.web3;
      
      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.writePost(accountAddr, title, content, (err, res) =>{
          if(!err){
            resolve(res);
          }else{
            reject(err);
          }
        });
      })
    },

    getPostCount : () => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;
      
      return new Promise((resolve, reject) => {
        const etherBoardContract = web3.eth.contract(abi);
        
        if(!etherBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = etherBoardContract.at(contractAddress);
        
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getPostCount((err, res) => {
          if(!err){
            resolve(res.toNumber());
          } else{
            reject(err);
          }
        });
      });
    },

    getPost : index => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;

      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getPost(index , (err, res) => {
          if(!err){
            resolve(res);
          }else{
            reject(err);
          }
        });
      });
    },

    getPostById : postId => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;

      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getPostById(postId , (err, res) => {
          if(!err){
            resolve(res);
          }else{
            reject(err);
          }
        });
      });
    },

    getReplyCount : postId => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;

      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getReplyCount(postId , (err, res) => {
          if(!err){
            resolve(res.toNumber());
          }else{
            reject(err);
          }
        });
      });
    },

    getReply : (postId, index) => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;

      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getReply(postId, index , (err, res) => {
          if(!err){
            resolve(res);
          }else{
            reject(err);
          }
        });
      });
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };

    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

function withRoot(WrappedComponent) {
  return function WithRoot(props) {
    return (
      <RootConsumer>
        {
          ({ state, actions }) => (
            <WrappedComponent
              contractAddress={state.contractAddress}
              abi={state.abi}
              posts={state.posts}
              setPosts={actions.setPosts}
              setLike={actions.setLike}
              setDislike={actions.setDislike}
              setReplies={actions.setReplies}
              getAccounts={actions.getAccounts}
              writePost={actions.writePost}
              getPostCount={actions.getPostCount}
              getPost={actions.getPost}
              getPostById={actions.getPostById}
              getReplyCount={actions.getReplyCount}
              getReply={actions.getReply}
              routeTo={actions.routeTo}
            />
          )
        }
      </RootConsumer>
    )
  }
}

export {
  RootProvider,
  RootConsumer,
  withRoot
};