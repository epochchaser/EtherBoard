pragma solidity ^0.4.23;
import "./BoardPost.sol";

contract BoardReply is BoardPost {
    event OnReplied();
    
    struct Reply {
        string content;
        uint32 like;
        uint32 dislike;
    }

    mapping(address => uint[]) private userReplies;
    mapping(uint => uint[]) private postIdToReplyIds;
    mapping(uint => uint[]) private replyIdToReplyIds;
    Reply[] private replies;

    function getReplyFromPost(uint _postId, uint _index) public view validateId(_postId) returns(string, uint32, uint32) {
        uint[] memory replyIds = postIdToReplyIds[_postId];
        uint replyId = replyIds[_index];
        return (replies[replyId].content, replies[replyId].like, replies[replyId].dislike);
    }

    function getReplyFromReply(uint _replyId, uint _index) public view validateId(_replyId) returns(string, uint32, uint32) {
        uint[] memory replyIds = replyIdToReplyIds[_replyId];
        uint replyId = replyIds[_index];
        return (replies[replyId].content, replies[replyId].like, replies[replyId].dislike);
    }

    function getReplyCountFromPost(uint _postId) public view validateId(_postId) returns(uint){
        uint[] memory replyIds = postIdToReplyIds[_postId];
        return replyIds.length;
    }

    function getReplyCountFromReply(uint _replyId) public view validateId(_replyId) returns(uint){
        uint[] memory replyIds = replyIdToReplyIds[_replyId];
        return replyIds.length;
    }

    function writeReplyToPost(address _sender, uint _postId, string _content) public validateId(_postId) onlySender(_sender) {
        uint replyLength = replies.push(Reply(_content, 0, 0));
        postIdToReplyIds[_postId].push(replyLength - 1);
        emit OnReplied();
    }

    function writeReplyToReply(address _sender, uint _replyId, string _content) public validateId(_replyId) onlySender(_sender){
        uint replyLength = replies.push(Reply(_content, 0, 0));
        replyIdToReplyIds[_replyId].push(replyLength - 1);
        emit OnReplied();
    }
}