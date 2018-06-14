pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract EtherBoard is Ownable {
    mapping(uint => address) public postIdToOwner;
    Post[] posts;

    event WriteCallback(string _data, uint8 _kind);
    struct Post{
        string data;
        uint32 like;
        uint32 unlike;
        uint8 kind;
        uint timestamp;
    }

    constructor(){
    }

    function getPostsCount() public constant returns(uint) {
        return posts.length;
    }

    function getPost(uint _index) public constant returns(string, uint32, uint32, uint8, uint) {
        return (posts[_index].data, posts[_index].like, posts[_index].unlike, posts[_index].kind, posts[_index].timestamp);
    }

    function writePost(string _data, uint8 _kind) public onlyOwner {

        posts.push(Post(_data, 0, 0, _kind, now));
        emit WriteCallback(_data, _kind);
    }
}