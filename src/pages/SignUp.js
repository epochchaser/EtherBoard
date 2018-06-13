import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Web3 from 'web3';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200,
  },
  button: {
    width: 200,
  },
  input: {
    display: 'none',
  }
});

class SignUp extends React.Component {
  state = {
    myAddress : '',
    nickname : '',
    email : '',
    accountChecker : ''
  };

  updateMyAddress = (address) => {
    this.setState({
      myAddress : address
    });
  };

  updateInterface = () =>{

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount = () =>{
    const { updateMyAddress, updateInterface } = this;
    const { myAddress } = this.state;
    let web3 = window.web3;

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    const id = setInterval(() => {
      web3.eth.getAccounts((err,r) => {
        if (!err) {
          if (myAddress !== r[0]) {
            updateMyAddress(r[0]);
            updateInterface();
          }
        }else{
          updateMyAddress('');
          console.log(err);
        }
      })
    }, 1000);

    this.setState({
      accountChecker : id
    });
  }

  componentWillUnmount = () =>{
    console.log("cleared");
    clearInterval(this.state.accountChecker);
  }

  render() {
    const { classes } = this.props;
    const { myAddress } = this.state;

    return (
        <div>
          <Grid container spacing={32} direction="column">
              <Grid container item spacing={0} justify="center" key={0}>
                  <Grid item xs={8}>
                    My address : {myAddress}            
                  </Grid>
              </Grid>

              <Grid container item spacing={0} justify="center" key={1}>
                <Grid item xs={8} >
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="nickname"
                      label="Nickname"
                      className={classes.textField}
                      onChange={this.handleChange('nickname')}
                      value={this.state.nickname}
                      margin="normal"
                    />

                    <TextField
                      id="email"
                      label="Email"
                      className={classes.textField}
                      onChange={this.handleChange('email')}
                      value={this.state.email}
                      margin="normal"
                    />
                  </form>
                </Grid>
              </Grid>

              <Grid container item spacing={0} justify="center" key={2}>
                <Grid item xs={8} >
                  <Button variant="contained" color="primary" className={classes.button}>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          
        </div>
      );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignUp);