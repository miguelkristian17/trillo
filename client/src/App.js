import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import { useEffect } from "react";
import MainLayout from './components/layout/MainLayout';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Home from "./components/layout/Home";
import { loadUser } from "./actions/auth";

//Redux
import { Provider } from "react-redux";
import store from "./store"
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {


  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

    return (
      <Provider store={store}>
      <Router>
      <MainLayout>
      <Alert />
        <Switch>
          <Route path="/" exact >
          <Landing />
          </Route>
          <Route path="/register" >
          <Register />
          </Route>
          <Route path="/login" >
          <Login />
          </Route>
          <Route path="/home" >
          <Home />
          </Route>
        </Switch>
        </MainLayout>
      </Router>
      </Provider> 
    );
}
export default App;