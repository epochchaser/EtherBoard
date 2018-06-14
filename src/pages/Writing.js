import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Web3 from 'web3';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Writing extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    address: undefined,
  }

  componentDidMount = () => {
    let web3 = window.web3;

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    web3.eth.getAccounts((err,r) => {
      if (!err && r.length > 0) {
        this.state.address = r[0];
      }

      console.log(r);
    });
  }

  handleRegister = (data) => {
    if (!this.state.address) {
      alert ('Please Login');
      return;
    }
    
    var contractAddress = '0xf1f7516880f62732060a7ab78868807ab14c5ac7';
    var abi = [
      {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "postIdToOwner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_data",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "_kind",
            "type": "uint8"
          }
        ],
        "name": "WriteCallback",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipRenounced",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getPostsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getPost",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint32"
          },
          {
            "name": "",
            "type": "uint8"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_data",
            "type": "string"
          },
          {
            "name": "_kind",
            "type": "uint8"
          }
        ],
        "name": "writePost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    
	  etherBoard.writePost(data, 0, function(err,r){
      console.log("writtend on block");
	  });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

      render() {
        const { classes } = this.props;
        const { editorState } = this.state;
        const { handleRegister } = this;

        return (
          <Grid container spacing={32} direction="column">
            <Grid container item spacing={0} justify="center" key={0}>
                <Grid item xs={8}>
                      <Editor 
                        editorState={editorState} 
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                      />
                </Grid>
            </Grid>

            <Grid container item spacing={0} justify="center" key={1}>
                <Grid item xs={8}>
                  <Button variant="contained" color="primary" className={classes.button} onClick={() => handleRegister("what the")}>
                    Register
                  </Button>
                </Grid>
            </Grid>
          </Grid>
        );
      }
    }

Writing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Writing);
