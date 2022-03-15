//3rd Party Modules
import React from 'react';

//Local Modules
import UserItem from './UserItem';
import Card from '../../shared/Components/UIElements/Card';

//CSS Files
import './UserList.css';

function UserList (props){

    return <>
    {
        props.items.length ?    
        <ul className='users-list'>
            {
                props.items.map(user=> 
                
                    <UserItem 
                    key={user.id}
                    id={user.id}
                    places={user.places}
                    image={user.image}
                    name={user.name}
                    />
                )
            }
        </ul>
        :
        <div className='center'>
            <Card>
                <h2>No Items Found!!</h2>
            </Card>

        </div>
    }

    </>
}
export default UserList;