//3rd Party Modules
import React, { useContext } from 'react';
import { useHistory } from 'react-router';

//Local Modules
import useForm from '../../shared/util/formHook.js';
import Input from '../../shared/Components/FormElements/Input/Input.js'
import Button from '../../shared/Components/FormElements/Button/Button.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators.js';
import { useHttpClient } from '../../shared/util/useHttpClient.js';
import AuthContext from '../../shared/Context/auth-context.js';
import LoadingSpinner from '../../shared/Components/UIElements/LoadingSpinner.js';
import ErrorModal from '../../shared/Components/UIElements/ErrorModal.js';
import ImageUpload from '../../shared/Components/FormElements/ImageUpload.js';

//CSS Files
import './PlaceForm.css';
function NewPlace() {

    const {isLoading, error, clearError, sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);

    const [currentStateOfInput,inputChangeHandler] = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        },
        address:{
            value:'',
            isValid:false
        },
        image:{
            value:null,
            isValid:false
        }
    }, false);
    
    
    const history = useHistory();

    const addSubmitHandler = async (event) =>{
        event.preventDefault();
        try{
            const formData = new FormData();
            console.log(currentStateOfInput.inputs)
            formData.append('title',currentStateOfInput.inputs.title.value);
            formData.append('description',currentStateOfInput.inputs.description.value);
            formData.append('address',currentStateOfInput.inputs.address.value);
            formData.append('image', currentStateOfInput.inputs.image.value);

            console.log(formData);
            // const response  =
            await sendRequest({
                api:'/api/places',
                method:'POST',    
                body:formData,
                headers:{Authorization : 'Bearer ' + auth.token}
            });
            history.push(`/places/users/${auth.userId}`);
        }
        catch(err){}
    };
    return <>
        { isLoading && <LoadingSpinner asOverlay/> }
        { error && <ErrorModal onClear={clearError} error={error} /> }
        <form className='place-form' onSubmit={addSubmitHandler} >

            <Input element='input'
            id='title' 
            type='text' 
            label='Title' 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText='Please Enter a Valid Title' 
            onInput={inputChangeHandler} />

            <Input element='textarea'
            id='description' 
            type='text' 
            row = '5'
            label='Description' 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText='Please Enter a Valid Description' 
            onInput={inputChangeHandler}/>

            <ImageUpload center  
            id='image' 
            errorText={`Upload a Valid Image`} 
            onInput={inputChangeHandler}/>        
            
            <Input element='input'
            id='address' 
            type='text'
            label='Address' 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText='Please Enter a Valid Address' 
            onInput={inputChangeHandler}/>

            <Button type='submit' disabled={!currentStateOfInput.isFormValid} >
                ADD PLACE 
            </Button>
        </form>
    </>
}

export default NewPlace;

