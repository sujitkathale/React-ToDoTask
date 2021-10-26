import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/login';
import Registration from './components/Register';
import Todo from './components/Todo';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/"exact component={Registration} />
          <Route path="/login"exact component={Login} />
          <Route path="/todo"exact component={Todo} />
        </Switch>   
      </Router>
    </>
  );
}

export default App;
