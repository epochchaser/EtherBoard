pragma solidity ^0.4.23;
import "./BoardUser.sol";

contract BoardPost is BoardUser {
    event OnWritten(string _title, string _content);
    event OnLiked(uint count);
    event OnDisliked(uint count);
    
    struct Post {
        string title;
        string content;
        uint32 like;
        uint32 dislike;
        uint timestamp;
    }

    mapping(address => uint[]) private userPosts;
    Post[] private posts;

    function getPostCount() public view returns(uint) {
        return posts.length;
    }

    function getPost(uint _index) public view returns(string, string, uint32, uint32, uint) {
        if(!existPost(_index)) revert();

        return (
            posts[_index].title,
            posts[_index].content,
            posts[_index].like,
            posts[_index].dislike,
            posts[_index].timestamp
        );
    }

    function writePost(address _sender, string _title, string _content) public onlySender(_sender) {
        uint postLength = posts.push(Post(_title, _content, 0, 0, now));
        userPosts[_sender].push(postLength - 1);
        emit OnWritten(_title, _content);
    }

    function likePost(address _sender,uint _index) public onlySender(_sender){
        if(!existPost(_index)) revert();

        uint32 count = posts[_index].like + 1;
        posts[_index].like = count;
        emit OnLiked(count);
    }

    function dislikePost(address _sender,uint _index) public onlySender(_sender){
        if(!existPost(_index)) revert();

        uint32 count = posts[_index].dislike + 1;
        posts[_index].dislike = count;
        emit OnDisliked(count);
    }

    function existPost(uint _postIndex) public view returns(bool isExist){
        return (posts.length > 0 && posts.length > _postIndex) ? true : false;
    }
}