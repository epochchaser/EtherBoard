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
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  });

class Post extends Component {
  state = {
    expanded: false,
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleLikeClick = () => {
    const { contractAddress, abi, id, setLike } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')

    etherBoard.likePost(id, (err, res) =>{
      if(!err){
        const txHash = res;
        filter.watch(function(err1, res1) {
          web3.eth.getTransaction(txHash, function(err2,res2){
            if (res2 != null && res2.blockNumber > 0) {
              
              const onLikedEvent = etherBoard.OnLiked({},{fromBlock: res2.blockNumber, toBlock: 'latest'});
              onLikedEvent.get((err3, res3) => {
                if (!err3){
                  for (let i = 0; i < res3.length; i++) { 
                    setLike(id, res3[i].args.count.toNumber());
                  }
                }
              })
            }
          });
        });    
      }
    });
  }

  handleDislikeClick = () => {
    const { contractAddress, abi, id, setDislike } = this.props;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    const filter = web3.eth.filter('latest')

    console.log(setDislike);

    etherBoard.dislikePost(id, (err, res) =>{
      if(!err){
        const txHash = res;
        filter.watch(function(err1, res1) {
          web3.eth.getTransaction(txHash, function(err2,res2){
            if (res2 != null && res2.blockNumber > 0) {
              
              const onDislikedEvent = etherBoard.OnDisliked({},{fromBlock: res2.blockNumber, toBlock: 'latest'});
              onDislikedEvent.get((err3, res3) => {
                if (!err3){
                  for (let i = 0; i < res3.length; i++) { 
                    setDislike(id, res3[i].args.count.toNumber());
                  }
                }
              })
            }
          });
        });    
      }
    });
  }

  render() {
    const { classes, title, content, like, dislike } = this.props;
    console.log(`title : ${title}, content : ${content}`);

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
              이부분에 댓글들 가즈아!!!!!!!!!!!!!!!!!!!!!!!!!!
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
