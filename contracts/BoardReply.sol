pragma solidity ^0.4.23;
import "./BoardPost.sol";

contract BoardReply is BoardPost {
    event OnReplied(string _title, uint _postId);
    
    uint public replyCounter;
    mapping(uint => address) public replyIdToOwner;
    mapping(uint => uint) public replyIdToPostId;
    Reply[] public replies;

    struct Reply {
        string data;
    }

    function getReplyCount() public view returns(uint) {
        return replies.length;
    }

    function getReply(uint _index) public view returns(string) {
        return replies[_index].data;
    }

    function writeReply(uint _postId, string _data) public validateId(_postId) {
        replyIdToOwner[replyCounter] = msg.sender;
        replyIdToPostId[replyCounter] = _postId;
        replies.push(Reply(_data));
        replyCounter++;
        emit OnReplied(_data, _postId);
    }
}