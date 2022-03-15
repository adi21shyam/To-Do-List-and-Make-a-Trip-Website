//3rd Party Modules
import React from 'react';
import {Link} from 'react-router-dom';

//Local Modules
import Avatar from '../../shared/Components/UIElements/Avatar';
import Card from '../../shared/Components/UIElements/Card';

//CSS Files
import './UserItem.css'

function UserItem (props)
{
    return <>
    <li className='user-item'>
            <Card className='user-item__content' style={{background:'#4d4d4d', padding:'0rem'}}>
            <Link to={`/places/users/${props.id}`}>
                <div className='user-item__image'>
                    <Avatar image={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`} alt={props.name} />
                </div>
                <div className='user-item__info'>
                    <div >
                        <h2>{props.name}</h2>
                    </div>
                    <div>
                        <h3>{props.places.length} {props.places.length===1 ? 'Place' : 'Places' }</h3>
                    </div>
                </div>
            </Link>
            </Card>
        
        
        
    </li>
        
    </>
};
export default UserItem;