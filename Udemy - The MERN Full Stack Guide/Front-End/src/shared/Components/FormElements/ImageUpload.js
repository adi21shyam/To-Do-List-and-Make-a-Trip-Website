//3rd Party Modules
import React, { useEffect, useRef, useState } from 'react';

//Local Modules
import Button from './Button/Button';

//CSS Files
import './ImageUpload.css';

const ImageUpload = props =>{
    const fileRef = useRef();
    const [file, setFile] = useState(); //To manage File
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);


    const pickedImageHandler = event => {
        // event.target.files, it will contain files, of that input element which is connected with that event
        // console.log(event.target);
        let filePicked;
        let ourIsValid = isValid;
        if(event.target.files && event.target.files.length===1){
            filePicked = event.target.files[0];
            setFile(filePicked);
            ourIsValid = true;
            setIsValid(true);
        }
        else{
        setIsValid(false);
        ourIsValid = false;
        }

        //To save the input element for further backend process
        //Note: isValid Takes time to update hence we are using our own variable
        props.onInput(props.id, filePicked, ourIsValid);
    };

    //To see Preview at each state change
    useEffect(()=>{
        if(!file)
        return;

        //Creating the url from file content
        //FileReader is a Web API
        const fileReader = new FileReader();

        // The FileReader.onload property contains an event handler 
        // executed when the load event is fired, when content read with readAsDataURL is available
        fileReader.onload = ()=>{
            setPreviewUrl(fileReader.result);
        };


        // Starts reading the contents of the specified Blob, 
        // once finished, the result attribute contains a URL representing the file's data
        fileReader.readAsDataURL(file); 
        
    },[file]);

    const pickImageHandler = () =>{
        //This method exist on DOM Node and will open up that File Picker means 
        //it will click on that Element which is invisible through other element
        fileRef.current.click();
    }
    return<>
    <div className='form-control' >
        <input id={props.id}
        ref={fileRef}                   //To access this input element in DOM
        type='file' 
        accept='.jpg, .jpeg, .png' 
        style={{display:'none'}}        //Because we Don't want to see the default Choose File picker
        onChange={pickedImageHandler}   //To Preview image when there is certain changes happens on Input
        />
        <div className={`image-upload ${props.center && 'center'}`} >
            <div className='image-upload__preview'>
                {previewUrl && <img src={previewUrl} alt='preview'/>}
                {!previewUrl && <p> Choose a Image to Display!</p>}
            </div>
            <Button type='button' onClick={pickImageHandler} >Choose Image</Button>
        </div>
        {/* {!isValid && <p>{props.errorText}</p>} */}
    </div>
    </>
}

export default ImageUpload;