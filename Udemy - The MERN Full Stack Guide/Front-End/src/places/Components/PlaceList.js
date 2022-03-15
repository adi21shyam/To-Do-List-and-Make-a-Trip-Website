//3rd Party Modules
import React from 'react';

//Local Modules
import Card from '../../shared/Components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/Components/FormElements/Button/Button.js';

//CSS Files
import './PlaceList.css';


function PlaceList (props){

    return <>
    {
        props.places.length ?
        <ul className='place-list'>
            {
                props.places.map(place =>  <PlaceItem 
                    key={place.id} 
                    id={place.id} 
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creator={place.creator}
                    location={place.location}
                    image={place.image}
                    onDelete={props.placeDeletionHandler}
                    />)
            }
        </ul>
        :
        <div className='place-list center'>
            <Card>
            <h2>No Places found, Maybe Create One?</h2>
            <Button to='/places/new'>Add Place</Button>
            </Card>
        </div>
    }
    </>
}
export default PlaceList;