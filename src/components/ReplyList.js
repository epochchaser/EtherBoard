import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Reply from './Reply';
import List from '@material-ui/core/List';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
  });

class ReplyList extends Component{
    state = {
        spacing: '16',
      };

    render(){
        const { replies, contractAddress, abi } = this.props;

        return (
            <div>
                <List>
                    {
                        replies.map((reply, index) => (
                            <Reply
                                key={index}
                                timestamp={reply.timestamp}
                                content={reply.content} 
                                contractAddress={contractAddress}
                                abi={abi}/>
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