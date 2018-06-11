import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import AccountCircle from '@material-ui/icons/AccountCircle';
import Create from "@material-ui/icons/Create";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NavLink } from 'react-router-dom';
import Routes from '../Routes';

import Login from "../components/Login";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  state = {
    auth: true,
    anchorEl: null,
    openLogin : false,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLoginDialog = () => {
    this.setState({
      ...this.state,
      openLogin : !this.state.openLogin
    })
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, openLogin } = this.state;
    const { handleLoginDialog } = this;
    const open = Boolean(anchorEl);

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                ETHEREUM BOARD
              </Typography>

              <Button color="inherit" onClick={handleLoginDialog}>
                LOGIN
              </Button>

              <Login
                open={openLogin}
                onClose={handleLoginDialog}
              />

              <Button 
                color="inherit" 
                component={NavLink}
                to="/signup"
              >
                SIGN UP
              </Button>

              <div>
                <IconButton
                    component={NavLink}
                    to="/writing"
                    color="inherit"
                >
                  <Create />
                </IconButton>
              </div>

              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose} component={NavLink} to="/">Profile</MenuItem>
                    <MenuItem onClick={this.handleClose} component={NavLink} to="/logout">Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>

          <main style={{marginTop: '4rem'}}>
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
