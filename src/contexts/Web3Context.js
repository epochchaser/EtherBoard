import React, { Component, createContext } from 'react';

const Context = createContext(); 
const { Provider, Consumer: Web3Consumer } = Context; 

class Web3Provider extends Component {
  state = {
    contractAddress : '0xf1f7516880f62732060a7ab78868807ab14c5ac7',
    abi : [
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
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_data",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "_kind",
            "type": "uint8"
          }
        ],
        "name": "WriteCallback",
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
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint8"
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
            "name": "_data",
            "type": "string"
          },
          {
            "name": "_kind",
            "type": "uint8"
          }
        ],
        "name": "writePost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  }

  actions = {
    someMethod : () => {
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

function withWeb3(WrappedComponent) {
  return function WithWeb3(props) {
    return (
      <Web3Consumer>
        {
          ({ state, actions }) => (
            <WrappedComponent
              contractAddress={state.contractAddress}
              abi={state.abi}
            />
          )
        }
      </Web3Consumer>
    )
  }
}

export {
  Web3Provider,
  Web3Consumer,
  withWeb3
};