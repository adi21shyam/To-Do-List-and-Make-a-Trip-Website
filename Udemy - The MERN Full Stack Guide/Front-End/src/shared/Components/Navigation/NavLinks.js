//3rd Party Modules
import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

//Local Modules
import AuthContext from '../../Context/auth-context';
import Button from '../FormElements/Button/Button';

//CSS Files
import './NavLinks.css';

function Navlinks(props){

    const auth = useContext(AuthContext);
    
    return <ul className='nav-links'>
    <li>
    <NavLink to='/users' exact> ALL USERS</NavLink>
    </li>
    { auth.isLoggedIn &&
        <li>
            <NavLink to={`/places/users/${auth.userId}`} >MY PLACES</NavLink>
        </li> 
    }
    { auth.isLoggedIn &&
        <li>
            <NavLink to='/places/new' >ADD PLACE</NavLink>
        </li> 
    }
    { !auth.isLoggedIn &&
    <li>
        <NavLink to='/auth' >AUTHENTICATE</NavLink>
    </li> 
    }
    { auth.isLoggedIn &&
    <li>
        <Button onClick={auth.logout} >LOGOUT</Button>
    </li> 
    }
    </ul>
}

export default Navlinks;