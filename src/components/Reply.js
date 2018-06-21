import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import classnames from 'classnames';

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
});

class Reply extends Component {
  state = {
    expanded: false,
  }

  render() {
    const { classes, content, timestamp, id } = this.props;
    const date = new Date(timestamp * 1000);
    const dateString = date.toDateString();
    
    return (
      <ListItem>
        <Avatar>
          <PersonIcon/>
        </Avatar>
        <ListItemText primary={content} secondary={dateString} />
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
        </ListItem>
    );
  }
}

Reply.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Reply);
