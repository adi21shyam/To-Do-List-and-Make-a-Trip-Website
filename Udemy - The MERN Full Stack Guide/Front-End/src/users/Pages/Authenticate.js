//3rd Party Modules
import React, { useContext, useState } from 'react';

//Local Modules
import Input from '../../shared/Components/FormElements/Input/Input.js'
import Button from '../../shared/Components/FormElements/Button/Button.js';
import Card from '../../shared/Components/UIElements/Card.js';
import useForm from '../../shared/util/formHook.js';
import AuthContext from '../../shared/Context/auth-context.js';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators.js'
import LoadingSpinner from '../../shared/Components/UIElements/LoadingSpinner.js';
import ErrorModal from '../../shared/Components/UIElements/ErrorModal.js';
import { useHttpClient } from '../../shared/util/useHttpClient.js';
import ImageUpload from '../../shared/Components/FormElements/ImageUpload.js';

//CSS Files
import './Authenticate.css';

function Authenticate (){
    const [loginMode, setloginMode] = useState(true);
    const {isLoading, error, clearError, sendRequest} = useHttpClient();

    const auth = useContext(AuthContext);
    
    const [currentStateOfInput, inputChangeHandler, setFormData] = useForm(
        {
            email:{
                value:'',
                isValid:false
            },
            password:{
                value:'',
                isValid:false
            }
        }
        ,false
    )

    const switchHandler = () =>{
        if(!loginMode){
            setFormData(
                {
                    ...currentStateOfInput.inputs,
                    name:undefined,
                    image:undefined
                }, 
                currentStateOfInput.inputs.email.isValid && currentStateOfInput.inputs.password.isValid                
            )
        }
        else{
            setFormData(
                {
                    ...currentStateOfInput.inputs,
                    name:{
                        value: '',
                        isValid :false
                    },
                    image:{
                        value: null,
                        isValid :false
                    }
                },
                false
            )
        }
        setloginMode(prevMode => !prevMode);
    }


    const authSubmitHandler = async (event) =>{
        event.preventDefault();
        if(loginMode){
            try{
            const response = 
            await sendRequest({
                method:"POST",
                body:JSON.stringify({
                    email:currentStateOfInput.inputs.email.value,
                    password:currentStateOfInput.inputs.password.value
                }),
                headers:{
                    "Content-Type": "application/json; charset=UTF-8"
                },
                api:'/api/users/login'
            });
            const {userId, email, token} = response.data;
            auth.login(userId, token);
            }
            catch(err){}
        }
        else{  
            try{             
            // A web API to send different types of inputs to backend
            const formData = new FormData();
            console.log(currentStateOfInput.inputs);
            formData.append('name',currentStateOfInput.inputs.name.value);
            formData.append('email',currentStateOfInput.inputs.email.value);
            formData.append('password',currentStateOfInput.inputs.password.value);
            formData.append('image', currentStateOfInput.inputs.image.value);

            const response =
            await sendRequest({
                method:"POST",
                body:formData, 
                api:'/api/users/signup',
            });
            
            const {userId, email, token} = response.data;
            auth.login(userId, token);
            }
            catch(err){}
        }
    }
    return <>
    { error &&
     <ErrorModal onClear={clearError} error={error}/> 
    }
     <Card className='authenticate'> 
        {isLoading && <LoadingSpinner asOverlay/>}
        <form onSubmit={authSubmitHandler}>
           
        {
            !loginMode && 
            <Input element='input'
            id='name' 
            type='text' 
            label='Full Name' 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText='Please Enter a Valid Name' 
            onInput={inputChangeHandler} />
        }
        {!loginMode && <ImageUpload id='image' center errorText={`Upload a Valid Image`} onInput={inputChangeHandler}/>}
        <Input element='input'
            id='email' 
            type='text' 
            label='Email Id' 
            validators={[VALIDATOR_EMAIL()]} 
            errorText='Please Enter a Valid Email Id' 
            onInput={inputChangeHandler} />

            <Input element='input'
            id='password' 
            type='password' 
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]} 
            errorText='Please Enter a Valid Password' 
            onInput={inputChangeHandler}/>

            <Button type='submit' disabled={!currentStateOfInput.isFormValid}>{  !loginMode && 'Register'} {  loginMode && 'Login'} </Button>
    </form>
    <hr/>
    <Button inverse onClick={switchHandler}>Switch to {  loginMode && 'SignUp'} {  !loginMode && 'Login'} Mode</Button>
    </Card>
    </>
}
export default Authenticate;

