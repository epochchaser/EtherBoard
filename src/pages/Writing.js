import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withWeb3 } from '../contexts/Web3Context';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    contentState : '',
  }

  setWritingSuccess = (value) =>{
    this.setState({
      writingSuccess : value
    })
  }

  handleRegister = (data) => {
    const { contractAddress, abi } = this.props;
    const { setWritingSuccess } = this;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    
    etherBoard.writePost(data, 0, function(err,r){
      if(!err){
        const writeCallback = etherBoard.WriteCallback();
        writeCallback.watch(function(err ,r){
          if(!err){
            setWritingSuccess(true);
            alert('successfuly written on blockchain.');
          }
          else{
            setWritingSuccess(false);
            alert('there is problem to register post.');
          }

          //writeCallback.stopWatching();
        });
      }
    });
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState : contentState,
    });
  };

      render() {
        const { classes } = this.props;
        const { contentState } = this.state;
        const { handleRegister } = this;

        return (
          this.state.writingSuccess 
          ? <Redirect to="/"/>
          :
          <Grid container spacing={32} direction="column">
            <Grid container item spacing={0} justify="center" key={0}>
                <Grid item xs={8}>
                      <Editor 
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onContentStateChange={this.onContentStateChange}
                      />
                </Grid>
            </Grid>
      
            <Grid container item spacing={0} justify="center" key={1}>
                <Grid item xs={8}>
                  <Button variant="contained" color="primary" className={classes.button} onClick={() => handleRegister(JSON.stringify(contentState, null, 4))}>
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

