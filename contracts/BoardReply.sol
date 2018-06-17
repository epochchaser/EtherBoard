pragma solidity ^0.4.23;
import "./BoardPost.sol";

contract BoardReply is BoardPost {
    event OnReplied(string _title, uint _postId);
    
    mapping(uint => Reply[]) postIdToReplies;

    struct Reply {
        address sender;
        string data;
    }

    function getReply(uint _postId, uint _index) public view validateId(_postId) returns(string) {
        Reply[] memory replies = postIdToReplies[_postId];
        return (replies[_index].data);
    }

    function getReplyCount(uint _postId) public view validateId(_postId) returns(uint){
        Reply[] memory replies = postIdToReplies[_postId];
        return replies.length;
    }

    function writeReply(uint _postId, string _data) public validateId(_postId) {
        postIdToReplies[_postId].push(Reply(msg.sender, _data));
        emit OnReplied(_data, _postId);
    }
}