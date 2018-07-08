const state = {
    contractAddress : '0xde612d976d143754bc9f82f7e142c70d12aed174',
    abi : [
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
        "inputs": [],
        "name": "OnReplied",
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
        "name": "OnIncreasedViewsCount",
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
            "name": "_postId",
            "type": "uint256"
            }
        ],
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
        "name": "getPost",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            },
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
            "name": "_id",
            "type": "uint256"
            }
        ],
        "name": "getPostById",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            },
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
            "name": "_parentId",
            "type": "uint256"
            },
            {
            "name": "_index",
            "type": "uint256"
            }
        ],
        "name": "getReply",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            },
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
        "constant": false,
        "inputs": [
            {
            "name": "_sender",
            "type": "address"
            },
            {
            "name": "_parentId",
            "type": "uint256"
            },
            {
            "name": "_content",
            "type": "string"
            }
        ],
        "name": "writeReply",
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
            "name": "_postId",
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
            "name": "_sender",
            "type": "address"
            },
            {
            "name": "_postId",
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
        "constant": false,
        "inputs": [
            {
            "name": "_postId",
            "type": "uint256"
            },
            {
            "name": "count",
            "type": "uint256"
            }
        ],
        "name": "increaseViewCount",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
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
            "name": "_postIndex",
            "type": "uint256"
            }
        ],
        "name": "existPostIndex",
        "outputs": [
            {
            "name": "isExist",
            "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    ],
    posts : []
}

export default state;