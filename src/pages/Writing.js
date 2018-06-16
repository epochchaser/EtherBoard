import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withRoot } from '../contexts/RootContext';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    flex : 1,
    margin: theme.spacing.unit * 2,
  }
});

class Writing extends React.Component {
  state = {
    writingSuccess : false,
    editorState : EditorState.createEmpty(),
    title : '',
    loading : false,
  }

  setWritingSuccess = (value) =>{
    this.setState({
      writingSuccess : value
    })
  }

  setLoading = (value) => {
    this.setState({
      loading : value
    })
  }

  handleRegister = (title, data) => {
    const { contractAddress, abi } = this.props;
    const { setWritingSuccess, setLoading } = this;
    let web3 = window.web3;

    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')

    etherBoard.writePost(title, data, (err, res) =>{
      if(!err){
        const txHash = res;
        setLoading(true);
        filter.watch(function(err, r) {
          web3.eth.getTransaction(txHash, function(e,r){
            if (r != null && r.blockNumber > 0) {
              console.log(`txHash : ${txHash}, blockNumber : ${r.blockNumber}`);
              setLoading(false);
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
      : (
        this.state.loading 
        ? <div className={classes.root}>
            <CircularProgress className={classes.progress} size={50} />
          </div>
        : (
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
          )
        )
      );
    }
  }

Writing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Writing));

