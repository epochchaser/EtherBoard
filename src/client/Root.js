import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import Web3 from 'web3';
var web3 = new Web3();

class Root extends Component{
    componentDidMount(){
        window.addEventListener('load', function() {
          if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
          } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
          }
        });
      }

    render(){
        return(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
    }
};

export default Root;