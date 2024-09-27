import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import SiteView from './components/SiteView';
import { Container } from "@mui/material";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Provider store={store}>
        <Container maxWidth={"sm"}>
          <SiteView/>
        </Container>
        <ToastContainer autoClose={3000} position="top-right"/>
      </Provider>
  );
}

export default App;
