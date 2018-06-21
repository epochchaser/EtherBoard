import React, { Component } from 'react';
import { withRoot } from '../contexts/RootContext';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router' 
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  })
});

class FullPost extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    title : '',
    content : '',
    like : 0,
    dislike : 0,
    timestamp : '',
    replies : []
  }

  loadPost = async(id) => {
    const { getPost } = this.props;

    try
    {
      const post = await getPost(id);
      const title = String(post[0]);
      const content = String(post[1]);
      const like = parseInt(post[2], 10);
      const dislike = parseInt(post[3], 10);
      const timestamp = parseInt(post[4], 10);
      
      this.setState({
        title,
        content,
        like,
        dislike,
        timestamp
      });
    }
    catch(err){
      console.log(err);
    }
  }

  componentDidMount = () =>{
    const { match } = this.props;
    this.loadPost(match.params.id);
  }

  render() {
    const { content, title} = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={32} direction="column">
        <Grid container item spacing={0} justify="center" key={0}>
          <Grid item xs={8}>
            <div>
              <h1>{title}</h1>
              <Paper className={classes.root} elevation={4}>
                <Typography component="p">
                  <div dangerouslySetInnerHTML={{__html: content}}>
                  </div>
                </Typography>
              </Paper>
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