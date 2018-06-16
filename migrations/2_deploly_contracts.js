var BoardPost = artifacts.require("./BoardPost.sol");
var BoardReply = artifacts.require("./BoardReply.sol");

module.exports = function(deployer) {
  deployer.deploy(BoardPost)
  .then(function() {
    return deployer.deploy(BoardReply, BoardPost.address);
  });
};
