import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import ReplyList from '../components/ReplyList';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

class Reply extends Component {
  state = {
    expanded: false,
    like : 0,
    dislike : 0,
    replies : [],
    repliesCount : 0
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

  handleExpanded = async(id) =>{
    const { expanded } = this.state;

    if(false === expanded){
      const {replies, repliesCount} = await this.loadReplies(id);
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

  shouldComponentUpdate = (nextProps, nextState) => {
    return (this.state !== nextState ? true : false);
  }

  render() {
    const { classes, content, timestamp, id } = this.props;
    const date = new Date(timestamp * 1000);
    const dateString = date.toDateString();
    
    return (
      <Fragment>
        <ListItem button className={classes.nested} onClick={() => this.handleExpanded(id)}>
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText primary={content} secondary={dateString}/>
          {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <ReplyList replies={this.state.replies}/>
        </Collapse>
      </Fragment>
    );
  }
}

Reply.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Reply);
