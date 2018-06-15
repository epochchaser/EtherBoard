pragma solidity ^0.4.23;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract EtherBoard is Ownable {
    mapping(uint => address) public postIdToOwner;
    Post[] public posts;
 
    event WriteCallback(string _title, string _data, uint8 _kind);
    
    struct Post {
        string title;
        string data;
        uint32 like;
        uint32 unlike;
        uint8 kind;
    }

    function getPostsCount() public view returns(uint) {
        return posts.length;
    }

    function getPost(uint index) public view returns(string, string, uint32, uint32, uint8) {
        return (
            posts[index].title,
            posts[index].data,
            posts[index].like,
            posts[index].unlike,
            posts[index].kind
        );
    }

    function writePost(string _title, string _data, uint8 _kind) public {

        posts.push(Post(_title, _data, 0, 0, _kind));
        emit WriteCallback(_title, _data, _kind);
    }
}