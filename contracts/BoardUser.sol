pragma solidity ^0.4.23;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract BoardUser is Ownable {
    struct User{
        uint32 userEmail;
        string nickName;
        uint index;
    }

    mapping(address => User) private users;
    address[] private userIndex;

    function getUserCount() public view returns(uint){
        return userIndex.length;
    }    

    function getUser(address _userAddress) public view returns(uint32, string, uint){
        if(existUser(_userAddress)) revert();

        return (
            users[_userAddress].userEmail, 
            users[_userAddress].nickName,
            users[_userAddress].index);
    }

    function getUserByIndex(uint _userIndex) public view returns(uint32, string, uint){
        return (
            users[userIndex[_userIndex]].userEmail, 
            users[userIndex[_userIndex]].nickName,
            users[userIndex[_userIndex]].index);
    }

    function existUser(address _userAddress) public view returns(bool isExist) {
        if(userIndex.length == 0) return false;
        return (userIndex[users[_userAddress].index] == _userAddress);
    }

    modifier validateId(uint _id) {
        require(_id >= 0);
        _;
    }

    modifier onlySender(address _address){
        require(_address == msg.sender);
        _;
    }
}