import React, { Component, createContext } from 'react';

const Context = createContext(); 
const { Provider, Consumer: RootConsumer } = Context; 

class RootProvider extends Component {
  state = {
    contractAddress : '0x3227bf316f7828654a17b5052a997cc644a96ff7',
    abi : [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_sender",
            "type": "address"
          },
          {
            "name": "_title",
            "type": "string"
          },
          {
            "name": "_content",
            "type": "string"
          }
        ],
        "name": "writePost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getPost",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_sender",
            "type": "address"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "likePost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_postIndex",
            "type": "uint256"
          }
        ],
        "name": "existPost",
        "outputs": [
          {
            "name": "isExist",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "getUser",
        "outputs": [
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getUserCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getPostCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "existUser",
        "outputs": [
          {
            "name": "isExist",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_sender",
            "type": "address"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "dislikePost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userIndex",
            "type": "uint256"
          }
        ],
        "name": "getUserByIndex",
        "outputs": [
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "OnReplied",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_title",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "_content",
            "type": "string"
          }
        ],
        "name": "OnWritten",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "count",
            "type": "uint256"
          }
        ],
        "name": "OnLiked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "count",
            "type": "uint256"
          }
        ],
        "name": "OnDisliked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipRenounced",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_postId",
            "type": "uint256"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getReplyFromPost",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_replyId",
            "type": "uint256"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getReplyFromReply",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_postId",
            "type": "uint256"
          }
        ],
        "name": "getReplyCountFromPost",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_replyId",
            "type": "uint256"
          }
        ],
        "name": "getReplyCountFromReply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_sender",
            "type": "address"
          },
          {
            "name": "_postId",
            "type": "uint256"
          },
          {
            "name": "_content",
            "type": "string"
          }
        ],
        "name": "writeReplyToPost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_sender",
            "type": "address"
          },
          {
            "name": "_replyId",
            "type": "uint256"
          },
          {
            "name": "_content",
            "type": "string"
          }
        ],
        "name": "writeReplyToReply",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    posts : []
  }

  actions = {
    setLikeToPost : (id, like) => {
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

        this.setState({
            posts : modifiedPosts
        });
    },

    setDislikeToPost : (id, dislike) => {
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

    setRepliesToPost : (postId, replies) => {
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

    getPost : postId => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;

      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getPost(postId , (err, res) => {
          if(!err){
            resolve(res);
          }else{
            reject(err);
          }
        });
      });
    },

    getReplyCountFromPost : postId => {
      const { abi, contractAddress } = this.state;
      let web3 = window.web3;

      return new Promise((resolve, reject) => {
        const ehterBoardContract = web3.eth.contract(abi);
        if(!ehterBoardContract)
          reject(new Error("incorrect abi."));

        const etherBoard = ehterBoardContract.at(contractAddress);
        if(!etherBoard)
          reject(new Error("incorrect contractAddress."));;

        etherBoard.getReplyCountFromPost(postId , (err, res) => {
          if(!err){
            resolve(res.toNumber());
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
              setLikeToPost={actions.setLikeToPost}
              setDislikeToPost={actions.setDislikeToPost}
              setRepliesToPost={actions.setRepliesToPost}
              getAccounts={actions.getAccounts}
              writePost={actions.writePost}
              getPostCount={actions.getPostCount}
              getPost={actions.getPost}
              getReplyCountFromPost={actions.getReplyCountFromPost}
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