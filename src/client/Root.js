import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import { Web3Provider } from '../contexts/Web3Context';

const AppProvider = ({ contexts, children }) => contexts.reduce(
    (prev, context) => React.createElement(context, {
      children: prev
    }), 
    children
  );

class Root extends Component{
    render(){
        return(
            <AppProvider contexts={[Web3Provider]}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AppProvider>
        );
    }
};

export default Root;