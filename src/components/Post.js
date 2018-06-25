import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    cardHeader: {
      cursor : 'pointer'
    },
    cardContent: {
      cursor : 'pointer'
    },
    media: {
      transitionDuration: '0.3s',
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    avatar: {
      backgroundColor: red[500],
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });

class Post extends Component {
  state = {
    routeToFullPost : false
  }

  handleLikeClick = () => {
    const { contractAddress, abi, id, setLike } = this.props;
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
                          setLike(id, res4[i].args.count.toNumber());
                        }
                      }
                    })
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
    });
  }

  handleDislikeClick = () => {
    const { contractAddress, abi, id, setDislike } = this.props;
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
                          setDislike(id, res4[i].args.count.toNumber());
                        }
                      }
                    })
                  }
                });

                filter.stopWatching((err, res) => {
                  if(err){
                    console.log(err);
                  }
                });
              });    
            }
          });
        }
    });
  }

  handleCardDetail = () =>{
    this.setState({
      routeToFullPost : true
    });
  }

  
  render() {
    const { classes, id, thumbnailSrc, summary, title, like, dislike, timestamp, repliesCount } = this.props;
    const date = new Date(timestamp * 1000);
    const dateString = date.toDateString();
    
    return (
      this.state.routeToFullPost 
      ? <Redirect to={`/post/${id}`}/>
      : (
        <div>
        <Card className={classes.card}>
          <CardHeader onClick={this.handleCardDetail} className={classes.cardHeader}
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                <PersonIcon/>
              </Avatar>
            }
            title={title}
            subheader={dateString}
          />

          {thumbnailSrc &&
            <CardMedia
              onClick={this.handleCardDetail}
              className={classes.media}
              image={thumbnailSrc}
              title="Summary"
            />
          }
          
          <CardContent onClick={this.handleCardDetail} className={classes.cardContent}>
            <Typography component="p">
              {summary}
            </Typography>
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
            <Chip label={`${repliesCount} replies`} className={classes.chip} />
          </CardActions>
        </Card>
      </div>
      )
    );
  }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Post);
