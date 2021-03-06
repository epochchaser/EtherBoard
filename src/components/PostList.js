import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Post from './Post';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
  });

class PostList extends Component{
    state = {
        spacing: '16',
      };

    render(){
        const { posts, contractAddress, abi, setLike, setDislike, setReplies } = this.props;

        return (
            <Grid container spacing={32} direction="column">
                {
                    posts.map(post => (
                        <Grid container item spacing={0} justify="center" key={post.id}>
                            <Grid item xs={4}>
                                <Post 
                                    id={post.id} 
                                    thumbnailSrc={post.thumbnailSrc}
                                    summary={post.summary}
                                    title={post.title} 
                                    content={post.content} 
                                    like={post.like} 
                                    dislike={post.dislike}
                                    timestamp={post.timestamp}
                                    replies={post.replies}
                                    repliesCount={post.repliesCount}
                                    contractAddress={contractAddress}
                                    abi={abi}
                                    setLike={setLike}
                                    setDislike={setDislike}
                                    setReplies={setReplies}/>    
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}

PostList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(PostList);