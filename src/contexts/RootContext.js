import React, { Component, createContext } from 'react';

const Context = createContext(); 
const { Provider, Consumer: RootConsumer } = Context; 

class RootProvider extends Component {
  state = {
    contractAddress : '0xde612d976d143754bc9f82f7e142c70d12aed174',
    abi : [
      {
        "constant": true,
        "inputs": [],
        "name": "postCounter",
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
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "posts",
        "outputs": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "data",
            "type": "string"
          },
          {
            "name": "like",
            "type": "uint32"
          },
          {
            "name": "dislike",
            "type": "uint32"
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
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "replyCounter",
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
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "replies",
        "outputs": [
          {
            "name": "data",
            "type": "string"
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
        "constant": false,
        "inputs": [
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
        "constant": false,
        "inputs": [
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
        "inputs": [],
        "name": "getPostsCount",
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
            "name": "_title",
            "type": "string"
          },
          {
            "name": "_data",
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
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "postIdToOwner",
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
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "replyIdToOwner",
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
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "replyIdToPostId",
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
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_title",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "_postId",
            "type": "uint256"
          }
        ],
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
            "name": "_data",
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
        "inputs": [],
        "name": "getReplyCount",
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
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getReply",
        "outputs": [
          {
            "name": "",
            "type": "string"
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
            "name": "_postId",
            "type": "uint256"
          },
          {
            "name": "_data",
            "type": "string"
          }
        ],
        "name": "writeReply",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    posts : [{
      id : 0,
      title : '',
      content : '',
      like : 0,
      dislike : 0
    }]
  }

  actions = {
    setLike : (id, like) => {
      const { posts } = this.state;
      const modifiedPosts = posts.map(item => item.id === id
        ? ({ ...item, like: like }) 
        : item);

        this.setState({
            posts : modifiedPosts
        });
    },

    setDislike : (id, dislike) => {
      const { posts } = this.state;
      const modifiedPosts = posts.map(item => item.id === id
        ? ({ ...item, dislike: dislike }) 
        : item);

        this.setState({
            posts : modifiedPosts
        });
    },

    setPosts : (posts) => {
      this.setState({
        posts: posts
      })
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
              setLike={actions.setLike}
              setDislike={actions.setDislike}
              setPosts={actions.setPosts}
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