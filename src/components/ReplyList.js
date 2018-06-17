import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Reply from './Reply';

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
            <Grid container spacing={32} direction="column">
                {
                    replies.map((reply, index) => (
                        <Grid container item spacing={0} justify="center" key={index}>
                            <Grid item xs={8}>
                                <Reply 
                                    content={reply.content} 
                                    contractAddress={contractAddress}
                                    abi={abi}
                                />    
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}

ReplyList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ReplyList);