//3rd Party Modules
import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route,Redirect,Switch} from 'react-router-dom';

//Local Modules
import MainNavigation from './shared/Components/Navigation/MainNavigation';
import AuthContext from  './shared/Context/auth-context';
import useAuth from './shared/util/authHook';
import Card from './shared/Components/UIElements/Card';
import LoadingSpinner from './shared/Components/UIElements/LoadingSpinner';

//CSS Files
import './index.css';

//LazyLoading of Files for Code Splitting
const Users = React.lazy(()=>import('./users/Pages/Users'));
const UserPlaces = React.lazy(()=>import('./places/Pages/UserPlaces'));
const NewPlace = React.lazy(()=>import('../src/places/Pages/NewPlace.js'));
const UpdatePlace = React.lazy(()=>import('./places/Pages/UpdatePlace'));
const Authenticate = React.lazy(()=>import('./users/Pages/Authenticate'));


function App (){

  const {token, userId, login, logout} = useAuth();

  let routes;
  if(token){    
    routes = (<Switch>
      <Route path="/" exact>
      </Route>
  
      <Route path="/places/users/:userId" exact>
        <UserPlaces/>
      </Route>
  
      <Route path="/users" exact>  
        <Users/>
      </Route>
      
      <Route path="/places/new" exact>
        <NewPlace/>
      </Route>   
      
      <Route path="/places/:placeId" exact>
        <UpdatePlace/>
      </Route>    
  
      <Redirect to='/users' />
    </Switch>)
  }
  else{
    routes = (<Switch>
      <Route path="/" exact>
      </Route>

      <Route path="/auth" exact>
        <Authenticate/>
      </Route>
      
      <Route path="/places/users/:userId" exact>
        <UserPlaces/>
      </Route>

      <Route path="/users" exact>  
        <Users/>
      </Route>
        
      <Redirect to='/auth' />
    </Switch>)

  }
  return <Router>
  <AuthContext.Provider value={{isLoggedIn:!!token,token:token , userId:userId, login:login, logout:logout}}>
  <MainNavigation/>
  <main><Suspense fallback={<div className='center'>
                <Card>
                <LoadingSpinner />
                </Card>
            </div>} >{routes}</Suspense>
  </main>
  </AuthContext.Provider>
  </Router>
}


export default App;