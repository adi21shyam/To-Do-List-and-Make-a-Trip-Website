//3rd Party Modules
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

//Local Modules
import PlaceList from '../Components/PlaceList';
import LoadingSpinner from '../../shared/Components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/Components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/util/useHttpClient';

function UserPlaces(){
    const userId = useParams().userId;
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const {isLoading, error, clearError, sendRequest} = useHttpClient();

    useEffect(()=>{

        const fetchPlaces = async ()=> {
             try{
                 const response = await sendRequest({
                     api:`/api/places/users/${userId}`,
                     headers:{
                         'Content-Type':"application/json ; charset=UTF-8"                    
                     },
                     method:'GET'                 
                 });
                 setLoadedPlaces(response.data);
             }
             catch(err){
                 
             }
         }
         fetchPlaces();
     }
     ,[sendRequest,userId]);


     const placeDeletionHandler = deletedPlaceId => {
        //Don't Write {} inside setState
        setLoadedPlaces(prevPlaces =>
          prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
      };
    

    return <>
    {isLoading && <div className='center'> <LoadingSpinner asOverlay/> </div>}
    {error && <ErrorModal onClear={clearError} error={error}/>}
    {!isLoading && !error && <PlaceList places={loadedPlaces} placeDeletionHandler={placeDeletionHandler}></PlaceList> }
    </>
}
export default UserPlaces;