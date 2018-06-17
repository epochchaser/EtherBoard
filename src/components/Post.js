import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Reply from './Reply';
import { Button } from '@material-ui/core';
import ReplyList from './ReplyList';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
    },
    media: {
      height: 0,
      //paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    repliesCount:{
      marginLeft: 'auto',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    button: {
      margin: theme.spacing.unit,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });

class Post extends Component {
  state = {
    expanded: false,
    commentOnEdit : ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerComment = (comment) => {
    const { contractAddress, abi, setRepliesToPost, id } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')
    let newReplies = [];

    web3.eth.getAccounts((err, res) => {
      if(!err){
        if(res.length === 0)return;

        etherBoard.writeReplyToPost(res[0], id, comment, (err1, res1) =>{
          if(!err1){
            const txHash = res1;

            filter.watch(function(err2, res2) {
              if(!err2){
                web3.eth.getTransaction(txHash, function(err3, res3){
                  if (res3 != null && res3.blockNumber > 0) {
                    etherBoard.getReplyCountFromPost(id , (err4, res4) => {
                      if(!err4){
                        const repliesCount = res4.toNumber();
            
                        for(let i = 0; i < repliesCount; i++){
                          etherBoard.getReplyFromPost(id, i, (err5, res5) => {
                              if(!err5){
                                const content = String(res5[0]);
                                const like = parseInt(res5[1], 10);
                                const dislike = parseInt(res5[2], 10);
                                newReplies.push(
                                  {
                                    content : content,
                                    like : like,
                                    dislike : dislike
                                  });
            
                                if(i === repliesCount - 1){
                                  console.log(newReplies);
                                  setRepliesToPost(id, newReplies);
                                }
                              }
                          });
                        }
                      }
                    });        
                  }
                });
              }
            });    
          }
        });
      }
    });
    
  }

  handleExpandClick = () => {
    const { expanded } = this.state;
    const { contractAddress, abi, setRepliesToPost, id } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);

    if(true === expanded){
      setRepliesToPost(id, []);
    }else{
      let newReplies = [];

      etherBoard.getReplyCountFromPost(id, (err, res) =>{
        if(!err){
          const repliesCount = res.toNumber();
          for(let i = 0; i < repliesCount; i++){
            etherBoard.getReplyFromPost(id, i , (err1, res1) => {
              if(!err1){
                const content = String(res1[0]);
                const like = parseInt(res1[1], 10);
                const dislike = parseInt(res1[2], 10);
                newReplies.push(
                  {
                    content : content,
                    like : like,
                    dislike : dislike
                  });
                  
                if(i === repliesCount - 1){
                  setRepliesToPost(id, newReplies);
                }
              }
            });
          }
        }
      });
    }

    this.setState({ expanded: !this.state.expanded });
  };

  handleLikeClick = () => {
    const { contractAddress, abi, id, setLikeToPost } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')

    web3.eth.getAccounts((err, res) => {
      if(!err){
        if(res.length === 0)return;

        etherBoard.likePost(res[0], id, (err1, res1) =>{
          if(!err1){
            const txHash = res1;
            filter.watch(function(err2, res2) {
              if(!err2){
                web3.eth.getTransaction(txHash, function(err3,res3){
                  if (res3 != null && res3.blockNumber > 0) {
                    
                    const onLikedEvent = etherBoard.OnLiked({},{fromBlock: res3.blockNumber, toBlock: 'latest'});
                    onLikedEvent.get((err4, res4) => {
                      if (!err4){
                        for (let i = 0; i < res4.length; i++) { 
                          setLikeToPost(id, res4[i].args.count.toNumber());
                        }
                      }
                    })
                  }
                });
              }
            });    
          }
        });
      }
    });
  }

  handleDislikeClick = () => {
    const { contractAddress, abi, id, setDislikeToPost } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')

    web3.eth.getAccounts((err, res) => {
      if(!err){
        if(res.length === 0)return;

          etherBoard.dislikePost(res[0], id, (err1, res1) =>{
            if(!err1){
              const txHash = res1;
              filter.watch(function(err2, res2) {
                web3.eth.getTransaction(txHash, function(err3,res3){
                  if (res3 != null && res3.blockNumber > 0) {
                    
                    const onDislikedEvent = etherBoard.OnDisliked({},{fromBlock: res3.blockNumber, toBlock: 'latest'});
                    onDislikedEvent.get((err4, res4) => {
                      if (!err4){
                        for (let i = 0; i < res4.length; i++) { 
                          setDislikeToPost(id, res4[i].args.count.toNumber());
                        }
                      }
                    })
                  }
                });
              });    
            }
          });
        }
    });
  }

  render() {
    const { classes, title, content, like, dislike, replies, repliesCount } = this.props;
    const { contractAddress, abi } = this.props;
    const { registerComment, handleChange } = this;
    
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title={title}
            subheader="June 14, 2018"
          />
          
          <CardContent dangerouslySetInnerHTML={{__html: content}}>
            
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="like" onClick={this.handleLikeClick}>
              <ThumbUpIcon />
            </IconButton>
            <span>{like}</span>
            <IconButton aria-label="dislike" onClick={this.handleDislikeClick}>
              <ThumbDownIcon />
            </IconButton>
            <span>{dislike}</span>
            <span className={classes.repliesCount}>{repliesCount} replies</span>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid container spacing={32} direction="row">
                <Grid container item spacing={0}>
                  <Grid item xs={8}>
                    <TextField
                      id="commentOnEdit"
                      label="Type your Comment here."
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange('commentOnEdit')}
                      placeholder="Comment"
                      helperText=" "
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>


                <ReplyList replies={replies}/>

                <Grid container item spacing={0}>
                  <Grid item xs={2}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => registerComment(this.state.commentOnEdit)}>
                      REGISTER
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Post);
