
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './component/layout/landing'
import Auth from './view/Auth'
import AuthContextProvider from './contexts/AuthContext'
import homePage from './view/homePage';
import backendPage from './view/backEnd';
import fontendPage from './view/fontEnd';
import storyDevs from './view/storydevs';
import managePage from './view/manage'
import ProtectedRoute from './component/routing/ProtectedRoute';


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={props => <Auth {...props} authRoute='/login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute='/register' />} />
          <ProtectedRoute exact path='/home' component={homePage} />
          <ProtectedRoute exact path='/back-end' component={backendPage} />
          <ProtectedRoute exact path='/font-end' component={fontendPage} />
          <ProtectedRoute exact path='/story-devs' component={storyDevs} />
          <ProtectedRoute exact path='/manage-acount' component={managePage} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
