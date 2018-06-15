import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withWeb3 } from '../contexts/Web3Context';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    writingSuccess : false,
    editorState : EditorState.createEmpty(),
    title : '',
  }

  setWritingSuccess = (value) =>{
    this.setState({
      writingSuccess : value
    })
  }

  handleRegister = (title, data) => {
    const { contractAddress, abi } = this.props;
    const { setWritingSuccess } = this;
    let web3 = window.web3;

    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);

    etherBoard.writePost(title, data, 0, (err, res) =>{
      if(!err){
        const txHash = res;
        const filter = web3.eth.filter('latest')
        
        filter.watch(function(err, r) {
          web3.eth.getTransaction(txHash, function(e,r){
            if (r != null && r.blockNumber > 0) {
              console.log(`txHash : ${txHash}, bnumber : ${r.blockNumber}`);
              //filter.stopWatching();
              setWritingSuccess(true);
            }
          });
        });    
      }
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState : editorState,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

      render() {
        const { classes } = this.props;
        const { editorState, title } = this.state;
        const { handleRegister, onEditorStateChange } = this;

        return (
          this.state.writingSuccess 
          ? <Redirect to="/"/>
          :
          <Grid container spacing={32} direction="column">
          <Grid container item spacing={0} justify="center" key={0}>
              <Grid item xs={8}>
              <TextField id="title" label="Title" InputLabelProps={{shrink: true,}}
                placeholder="Title"
                helperText="Please type your title."
                fullWidth
                onChange={this.handleChange('title')}
                margin="normal"/>
              </Grid>
            </Grid>

            <Grid container item spacing={0} justify="center" key={1}>
                <Grid item xs={8}>
                      <Editor 
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorStateChange}
                      />
                </Grid>
            </Grid>
      
            <Grid container item spacing={0} justify="center" key={2}>
                <Grid item xs={8}>
                  <Button variant="contained" color="primary" className={classes.button} onClick={() => handleRegister(title, JSON.stringify(convertToRaw(editorState.getCurrentContent())))}>
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

export default withWeb3(withStyles(styles)(Writing));

