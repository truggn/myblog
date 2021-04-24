
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './view/Auth'
import AuthContextProvider from './contexts/AuthContext'
import homePage from './view/homePage';
import managePage from './view/manage'
import aboutPage from './view/aboutPage'
import photoPage from './view/photoPage'
import contactPage from './view/contactPage'
import blogPage from './view/blogPage'
import servicePage from './view/servicesPage'
import ProtectedRoute from './component/routing/ProtectedRoute';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/login' render={props => <Auth {...props} authRoute='/login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute='/register' />} />
          <Route exact path='/' component={homePage} />
          <Route exact path='/home' component={homePage} />
          <Route exact path='/about' component={aboutPage} />
          <Route exact path='/pictures' component={photoPage} />
          <Route exact path='/contact' component={contactPage} />
          <Route exact path='/blogs' component={blogPage} />
          <Route exact path='/services' component={servicePage} />
          <ProtectedRoute exact path='/manage-page' component={managePage} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
