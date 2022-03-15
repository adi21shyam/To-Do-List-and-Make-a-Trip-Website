//3rd Party Modules
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';

//Local Modules
import useForm from '../../shared/util/formHook.js';
import Card from '../../shared/Components/UIElements/Card.js';
import Button from '../../shared/Components/FormElements/Button/Button';
import Input from '../../shared/Components/FormElements/Input/Input.js'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import LoadingSpinner from '../../shared/Components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/Components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/util/useHttpClient';
import AuthContext from '../../shared/Context/auth-context.js';

//CSS Files
import './PlaceForm.css';

function UpdatePlace() {
    const placeId = useParams().placeId;
    
    const [loadedPlace, setLoadedPlace] = useState();
    const {isLoading, error, clearError, sendRequest} = useHttpClient();

    const history = useHistory();
    const auth = useContext(AuthContext);

    const updateSubmitHandler = async (event) =>{
        event.preventDefault();
        try{
            // const response = 
            await sendRequest({
                method:"PATCH",
                body:JSON.stringify({
                    title:currentStateOfInput.inputs.title.value,
                    description:currentStateOfInput.inputs.description.value
                }),
                api:`/api/places/${placeId}`, 
                headers:{
                        'Content-Type':"application/json ; charset=UTF-8", 
                        Authorization:'Bearer '+ auth.token                   
                },

            });            
            history.push(`/places/users/${auth.userId}`);
            }
            catch(err){}
    };

    const [currentStateOfInput,inputChangeHandler, setFormData] = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        }
        
    }, false);


    useEffect(()=>{ 
    
    const fetchPlace = async ()=> {
        try{
            const response = await sendRequest({
                api:`/api/places/${placeId}`,
                headers:{
                    'Content-Type':"application/json ; charset=UTF-8"                    
                },
                method:'GET'                 
            });
            setLoadedPlace(response.data);

            setFormData({
                title:{
                    value:response.data.title,
                    isValid:true
                },
                description:{
                    value: response.data.description,
                    isValid:true
                }
            }, true)
        
        }
        catch(err){
            
        }
    }
    fetchPlace();
    },[setFormData, placeId, sendRequest]);
   
    if(!loadedPlace && !error)
    {
        return <>
            <div className='center'>
                <Card>
                    <h2>Couldn't found Place</h2>
                </Card>
            </div>
        </>
    }
    if(isLoading)
    {
        return <>
            <div className='center'>
                <Card>
                <LoadingSpinner />
                </Card>
            </div>
        </>
    }
    return <>
    {isLoading && <div className='center'> <LoadingSpinner asOverlay/> </div>}
    {error && <ErrorModal onClear={clearError} error={error}/>}
    { !isLoading && loadedPlace &&
    <form className='place-form' onSubmit={updateSubmitHandler} >
    <Input element='input'
    id='title' 
    type='text' 
    label='Title' 
    validators={[VALIDATOR_REQUIRE()]} 
    errorText='Please Enter a Valid Title' 
    onInput={inputChangeHandler}
    initialValue={loadedPlace.title} 
    initialValid={true}/>

    <Input element='textarea'
    id='description' 
    type='text' 
    row = '5'
    label='Description' 
    validators={[VALIDATOR_MINLENGTH(5)]} 
    errorText='Please Enter a Valid Description' 
    onInput={inputChangeHandler}
    initialValue={loadedPlace.description}
    initialValid={true}/>


    <Button type='submit' disabled={!currentStateOfInput.isFormValid} >
        UPDATE
    </Button>
    </form>
    }
    </>
}

export default UpdatePlace;

