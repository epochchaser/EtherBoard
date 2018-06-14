var EtherBoard = artifacts.require("./EtherBoard.sol");

module.exports = function(deployer) {
  deployer.deploy(EtherBoard);
};
