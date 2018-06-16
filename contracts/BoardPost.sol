pragma solidity ^0.4.23;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract BoardPost is Ownable {
    event OnWritten(string _title, string _data);
    event OnLiked(uint count);
    event OnDisliked(uint count);
    
    uint public postCounter;
    mapping(uint => address) public postIdToOwner;
    Post[] public posts;
    
    struct Post {
        string title;
        string data;
        uint32 like;
        uint32 dislike;
    }

    function getPostsCount() public view returns(uint) {
        return posts.length;
    }

    function getPost(uint _index) public view returns(string, string, uint32, uint32) {
        return (
            posts[_index].title,
            posts[_index].data,
            posts[_index].like,
            posts[_index].dislike
        );
    }

    function writePost(string _title, string _data) public {
        postIdToOwner[postCounter] = msg.sender;
        posts.push(Post(_title, _data, 0, 0));
        postCounter++;
        emit OnWritten(_title, _data);
    }

    function likePost(uint _index) public {
        uint32 count = posts[_index].like + 1;
        posts[_index].like = count;
        emit OnLiked(count);
    }

    function dislikePost(uint _index) public {
        uint32 count = posts[_index].dislike + 1;
        posts[_index].dislike = count;
        emit OnDisliked(count);
    }

    modifier validateId(uint _id) {
        require(_id >= 0);
        _;
    }
}