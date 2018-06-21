import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import { RootProvider } from '../contexts/RootContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const AppProvider = ({ contexts, children }) => contexts.reduce(
    (prev, context) => React.createElement(context, {
      children: prev
    }), 
    children
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

class Root extends Component{
    render(){
        return(
            <AppProvider contexts={[RootProvider]}>
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </MuiThemeProvider>
            </AppProvider>
        );
    }
};

export default Root;