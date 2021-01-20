import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./actions/store";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Header from "./components/Header";
import GalleryList from "./pages/GalleryList";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#EAEDED",
    },
  },
  typography: {
		fontFamily: ['Kanit', 'sans-serif'].join(','),
	},

});


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <Login ></Login> */}
        <Header ></Header>

          {/* <Main></Main> */}
          <GalleryList></GalleryList>
       
      </Provider>
    </ThemeProvider>
  );
}

export default App;
