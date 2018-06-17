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
        const { posts, contractAddress, abi, setLikeToPost, setDislikeToPost, setRepliesToPost } = this.props;

        return (
            <Grid container spacing={32} direction="column">
                {
                    posts.map(post => (
                        <Grid container item spacing={0} justify="center" key={post.id}>
                            <Grid item xs={8}>
                                <Post 
                                    id={post.id} 
                                    title={post.title} 
                                    content={post.content} 
                                    like={post.like} 
                                    dislike={post.dislike}
                                    replies={post.replies}
                                    repliesCount={post.repliesCount}
                                    contractAddress={contractAddress}
                                    abi={abi}
                                    setLikeToPost={setLikeToPost}
                                    setDislikeToPost={setDislikeToPost}
                                    setRepliesToPost={setRepliesToPost}/>    
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