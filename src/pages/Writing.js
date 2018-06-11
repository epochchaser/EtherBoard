import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
});

class Writing extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        글쓰기
      </div>
    );
  }
}

Writing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Writing);
