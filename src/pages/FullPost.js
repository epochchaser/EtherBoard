import React, { Component } from 'react';
import { withRoot } from '../contexts/RootContext';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router' 
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ReplyList from '../components/ReplyList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  }),
  button: {
    margin: theme.spacing.unit,
  },
  writingReplyRegion : {
    margin : '16px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  column: {
    flexBasis: '33.33%',
  },
});

class FullPost extends Component {
  state = {
    id : 0,
    title : '',
    content : '',
    like : 0,
    dislike : 0,
    timestamp : '',
    replies : [],
    repliesCount : 0,
    writingComment : '',
    expanded: false,
  }

  updateReplies = (newReplies, repliesCount) => {
    this.setState({
      replies : newReplies,
      repliesCount
    })
  }

  updateWritingComment = (newComment) =>{
    this.setState({
      writingComment : newComment
    })
  }

  registerComment = async(comment) => {
    const { contractAddress, abi, getAccounts } = this.props;
    const { id } = this.state;
    const { updateReplies, updateWritingComment } = this;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')
    let newReplies = [];

    try
    {
      const accounts = await getAccounts();
      if(accounts.length === 0) throw new Error("please activate your wallet first.");

      etherBoard.writeReply(accounts[0], id, comment, (err1, res1) =>{
        if(!err1){
          const txHash = res1;
          filter.watch(function(err2, res2) {
            if(!err2){
              web3.eth.getTransaction(txHash, function(err3, res3){
                if (res3 != null && res3.blockNumber > 0) {
                  etherBoard.getReplyCount(id , (err4, res4) => {
                    if(!err4){
                      const repliesCount = res4.toNumber();
                      
                      for(let i = repliesCount - 1; i >= 0; i--){
                        etherBoard.getReply(id, i, (err5, res5) => {
                            if(!err5){
                              const id = parseInt(res5[0]);
                              const title = String(res5[1]);
                              const content = String(res5[2]);
                              const like = parseInt(res5[3], 10);
                              const dislike = parseInt(res5[4], 10);
                              const timestamp = parseInt(res5[5], 10);

                              newReplies.push(
                                {
                                  id,
                                  title,
                                  content,
                                  like,
                                  dislike,
                                  timestamp
                                });
          
                              if(i === 0){
                                updateReplies(newReplies, repliesCount);
                                updateWritingComment('');
                              }
                            }
                        });
                      }
                    }
                  });        
                }
              });
            }

            filter.stopWatching((err, res) => {
              if(err){
                console.log(err);
              }
            });
          });    
        }
      });
    }
    catch(err){
      console.log(err);
    }
  }

  loadReplies = async(postId) => {
    const { getReplyCount, getReply } = this.props;
    const newReplies = [];
    
    try
    {
        const repliesCount = await getReplyCount(postId);
        
        for(let i = repliesCount - 1; i >= 0; i--){
          const reply = await getReply(postId, i);
          newReplies.push(
            {
              id : parseInt(reply[0],10),
              title : String(reply[1]),
              content : String(reply[2]),
              like : parseInt(reply[3], 10),
              dislike : parseInt(reply[4], 10),
              timestamp : parseInt(reply[5], 10)
            });
        }

        return {
          replies : newReplies,
          repliesCount : repliesCount
        }
    }catch(err){
      console.log(err);
    }
  }

  loadPost = async(postId) => {
    const { getPostById, getReplyCount } = this.props;

    try
    {
      const post = await getPostById(postId);
      const repliesCount = await getReplyCount(postId);
      const id = parseInt(post[0], 10);
      const title = String(post[1]);
      const content = String(post[2]);
      const like = parseInt(post[3], 10);
      const dislike = parseInt(post[4], 10);
      const timestamp = parseInt(post[5], 10);
      
      this.setState({
        id,
        title,
        content,
        like,
        dislike,
        timestamp,
        repliesCount
      });
    }
    catch(err){
      console.log(err);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleExpanded = async(postId) =>{
    const { expanded } = this.state;

    if(false === expanded){
      const {replies, repliesCount} = await this.loadReplies(postId);
      this.setState({
        expanded : !expanded,
        replies,
        repliesCount
      })
    }
    else{
      this.setState({
        expanded : !expanded,
        replies : []
      })
    }
  }

  componentDidMount = async() =>{
    const { match } = this.props;
    this.loadPost(match.params.id);
  }

  render() {
    const { id, content, title, replies, repliesCount} = this.state;
    const { registerComment } = this;
    const { contractAddress, abi, getReplyCount, getReply, classes } = this.props;

    return (
      <Grid container spacing={32} direction="column">
        <Grid container item spacing={0} justify="center" key={0}>
          <Grid item xs={4}>
            <div>
              <h1>{title}</h1>
              <Paper className={classes.paper}>
                <div dangerouslySetInnerHTML={{__html: content}}>
                </div>
              </Paper>

              <Paper className={classes.paper}>
                <List>
                  <ListItem>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                    <TextField className={classes.writingReplyRegion}
                      placeholder="Write reply..."
                      value={this.state.writingComment}
                      onChange={this.handleChange('writingComment')}
                      fullWidth
                      margin="normal"
                      />
                      <Button variant="contained" color="primary" className={classes.button} onClick={() => registerComment(this.state.writingComment)}>
                        Reply
                      </Button>
                  </ListItem>
                </List>
              </Paper>

              <ExpansionPanel expanded={this.state.expanded} onChange={() => this.handleExpanded(id)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.column}>
                    <Typography className={classes.heading}>Replies</Typography>
                  </div>
                  <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{repliesCount} replies</Typography>
                  </div>
                </ExpansionPanelSummary>
                <Divider />

                 <ExpansionPanelDetails >
                  <ReplyList 
                    replies={replies}
                    contractAddress={contractAddress}
                    abi={abi}
                    getReplyCount={getReplyCount}
                    getReply={getReply}
                   />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

FullPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withRouter(withStyles(styles)(FullPost)));