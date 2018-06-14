import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import Create from "@material-ui/icons/Create";
import { NavLink } from 'react-router-dom';
import Routes from '../Routes';
import Login from "../components/Login";
import Web3 from 'web3';
import Home from '@material-ui/icons/Home';

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
    anchorEl: null,
    openLogin : false,
    myAddress : undefined,
    accountChecker : ''
  };

  handleWritingRegister = (rawData) => {
    const { myAddress } = this.state;

    if(myAddress){
      //여기 컨트랙트로 보내는 로직
      console.log(rawData);
    } else {
      alert('You need to login to MetaMask first.');
        return;	  
    }
  }

  handleLoginDialog = () => {
    this.setState({
      ...this.state,
      openLogin : !this.state.openLogin
    })
  }

  updateMyAddress = (address) =>{
    this.setState({
      myAddress : address
    })
  }

  componentDidMount = () =>{
    const { updateMyAddress } = this;
    let web3 = window.web3;

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    const id = setInterval(() => {
      web3.eth.getAccounts((err,r) => {
        if (!err) {
          if (this.state.myAddress !== r[0]) {
            updateMyAddress(r[0]);
          }
        }else{
          updateMyAddress(undefined);
        }
      })
    }, 1000);

    this.setState({
      accountChecker : id
    });
  }

  componentWillUnmount = () =>{
    clearInterval(this.state.accountChecker);
  }

  render() {
    const { classes } = this.props;
    const { myAddress, openLogin } = this.state;
    const { handleLoginDialog } = this;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                    component={NavLink}
                    to="/"
                    color="inherit"
                >
                <Home />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                ETHEREUM BOARD
              </Typography>


              {typeof myAddress === 'undefined' 
              ? (
                  <Button color="inherit" onClick={handleLoginDialog}>
                    LOGIN
                  </Button>
                )
              : <div>Your address : {myAddress}</div>
              }

              <Login
                open={openLogin}
                onClose={handleLoginDialog}
              />

              <div>
                <IconButton
                    component={NavLink}
                    to="/writing"
                    color="inherit"
                >
                  <Create />
                </IconButton>
              </div>
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
