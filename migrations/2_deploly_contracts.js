var BoardUser = artifacts.require("./BoardUser.sol");
var BoardPost = artifacts.require("./BoardPost.sol");

module.exports = function(deployer) {
  deployer.deploy(BoardUser)
  .then(function() {
    return deployer.deploy(BoardPost, BoardUser.address);
  })
};
