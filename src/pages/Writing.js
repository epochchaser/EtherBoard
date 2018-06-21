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
import draftToHtml from 'draftjs-to-html';
import ErrorSnackBar from '../components/ErrorSnackBar';

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
    openErrorSnackBar : false,
    snackBarErrorMsg : ''
  }

  handleOpenErrorSnackBar = (snackBarErrorMsg) => {
    this.setState(
      {
         openErrorSnackBar: true ,
         snackBarErrorMsg : snackBarErrorMsg
      }
    );
  };

  handleCloseErrorSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openErrorSnackBar: false });
  };

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

  handleRegister = async (title, content) =>{
    const { getAccounts, writePost } = this.props;
    const { setWritingSuccess, setLoading, handleOpenErrorSnackBar } = this;
    let web3 = window.web3;
    const filter = web3.eth.filter('latest')

    try
    {
      const accounts = await getAccounts();
      if(accounts.length === 0) throw new Error("please activate your wallet first.");
      const txHash = await writePost(accounts[0], title, content);

      setLoading(true);
      filter.watch(function(err, res) {
        if(!err){
          web3.eth.getTransaction(txHash, function(err1, res1){
            if (res1 != null && res1.blockNumber > 0) {
              setLoading(false);
              setWritingSuccess(true);
            }
          });
        }
      });    
    }
    catch(err){
      handleOpenErrorSnackBar(err.message);
      setLoading(false);
      setWritingSuccess(false);
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
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
          <div>
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
                  <Button variant="contained" color="primary" className={classes.button} onClick={() => handleRegister(title, draftToHtml(convertToRaw(editorState.getCurrentContent())))}>
                      Register
                  </Button>
                </Grid>
            </Grid>
          </Grid>

          <ErrorSnackBar errMsg={this.state.snackBarErrorMsg} isOpen={this.state.openErrorSnackBar} onClose={this.handleCloseErrorSnackBar}/>
          </div>
          )
        )
      );
    }
  }

Writing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Writing));

