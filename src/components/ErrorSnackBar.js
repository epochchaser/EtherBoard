import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    }
  });

class ErrorSnackBar extends Component {
    render(){
        const {classes, errMsg, isOpen, onClose } = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={onClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{errMsg}</span>}
                action={[
                  <Button key="OK" color="secondary" size="small" onClick={onClose}>
                    OK
                  </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                  ]}
                />
        );
    };
}

ErrorSnackBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorSnackBar);