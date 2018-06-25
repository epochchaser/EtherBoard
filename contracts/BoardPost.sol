pragma solidity ^0.4.23;
import "./BoardUser.sol";

contract BoardPost is BoardUser {
    event OnWritten(string _title, string _content);
    event OnLiked(uint count);
    event OnDisliked(uint count);
    event OnReplied();

    struct Post {
        string title;
        string content;
        uint32 like;
        uint32 dislike;
        uint timestamp;
    }

    uint[] private onlyPosts;
    mapping(address => uint[]) private userPosts;
    mapping(uint => uint[]) private IdToReplyIds;
    Post[] private posts;

    function getPostCount() public view returns(uint) {
        return onlyPosts.length;
    }

    function getReplyCount(uint _postId) public view returns(uint){
        return IdToReplyIds[_postId].length;
    }

    function getPost(uint _index) public view returns(uint, string, string, uint32, uint32, uint) {
        if(!existPostIndex(_index)) revert();
        uint postId = onlyPosts[_index];

        return (
            postId,
            posts[postId].title,
            posts[postId].content,
            posts[postId].like,
            posts[postId].dislike,
            posts[postId].timestamp
        );
    }

    function getPostById(uint _id) public view returns(uint, string, string, uint32, uint32, uint) {
        if(!existPost(_id)) revert();

        return (
            _id,
            posts[_id].title,
            posts[_id].content,
            posts[_id].like,
            posts[_id].dislike,
            posts[_id].timestamp
        );
    }

    function getReply(uint _parentId, uint _index)public view returns(uint, string, string, uint32, uint32, uint) {
        if(!existPost(_parentId)) revert();
        uint[] memory replyIds = IdToReplyIds[_parentId];
        uint postId = replyIds[_index];

        return (
            postId,
            posts[postId].title,
            posts[postId].content,
            posts[postId].like,
            posts[postId].dislike,
            posts[postId].timestamp
        );
    }

    function writePost(address _sender, string _title, string _content) public onlySender(_sender) {
        uint postLength = posts.push(Post(_title, _content, 0, 0, now));
        userPosts[_sender].push(postLength - 1);
        onlyPosts.push(postLength - 1);
        emit OnWritten(_title, _content);
    }

    function writeReply(address _sender, uint _parentId, string _content) public validateId(_parentId) onlySender(_sender) {
        uint replyLength = posts.push(Post("", _content, 0, 0, now));
        userPosts[_sender].push(replyLength - 1);
        IdToReplyIds[_parentId].push(replyLength - 1);
        emit OnReplied();
    }

    function likePost(address _sender,uint _postId) public onlySender(_sender){
        if(!existPost(_postId)) revert();

        uint32 count = posts[_postId].like + 1;
        posts[_postId].like = count;
        emit OnLiked(count);
    }

    function dislikePost(address _sender,uint _postId) public onlySender(_sender){
        if(!existPost(_postId)) revert();

        uint32 count = posts[_postId].dislike + 1;
        posts[_postId].dislike = count;
        emit OnDisliked(count);
    }

    function existPost(uint _postId) public view returns(bool isExist){
        return (posts.length > 0 && posts.length > _postId) ? true : false;
    }

    function existPostIndex(uint _postIndex) public view returns(bool isExist){
        return (onlyPosts.length > 0 && onlyPosts.length > _postIndex) ? true : false;
    }
}