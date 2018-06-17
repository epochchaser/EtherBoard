import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    
  });

class Reply extends Component {
  render() {
    const { classes, content, id } = this.props;

    return (
      <div>
        {content}
      </div>
    );
  }
}

Reply.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Reply);
