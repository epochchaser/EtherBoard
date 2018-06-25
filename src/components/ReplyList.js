import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Reply from './Reply';
import List from '@material-ui/core/List';

const styles = theme => ({
    root: {
        width : "100%"
    },
  });

class ReplyList extends Component{
    render(){
        const { replies, contractAddress, abi, getReply, getReplyCount, classes } = this.props;
        
        return (
            <div className={classes.root}>
                <List component="div" disablePadding>
                    {
                        replies.map(reply => (
                            <Reply
                                key={reply.id}
                                id={reply.id}
                                timestamp={reply.timestamp}
                                content={reply.content} 
                                contractAddress={contractAddress}
                                abi={abi}
                                getReply={getReply}
                                getReplyCount={getReplyCount}/>
                        ))
                    }
                </List>
            </div>
        )
    }
}

ReplyList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ReplyList);