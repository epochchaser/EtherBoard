var BoardUser = artifacts.require("./BoardUser.sol");
var BoardPost = artifacts.require("./BoardPost.sol");
var BoardReply = artifacts.require("./BoardReply.sol");

module.exports = function(deployer) {
  deployer.deploy(BoardUser)
  .then(function() {
    return deployer.deploy(BoardPost, BoardUser.address);
  })
  .then(function() {
    return deployer.deploy(BoardReply, BoardPost.address);
  });
};
