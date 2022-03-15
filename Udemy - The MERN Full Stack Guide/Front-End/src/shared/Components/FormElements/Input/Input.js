//3rd Party Modules
import React, {useEffect, useReducer} from 'react';

//Local Modules
import { validate } from '../../../util/validators';

//CSS Files
import './Input.css';

const reducer = (currentValue, action) =>{
  switch(action.type)
  {
    case 'change':
      return {
        ...currentValue, 
        value:action.val,
        isValid:validate(action.val, action.validators)
      };
    case 'touch':
      return {
        ...currentValue, 
        isTouched:true,
      };

    default:
      return currentValue;

  }
}
const Input = props => {
  
  const [currentValue, dispatch] = useReducer(reducer, {value:props.initialValue || '', isValid:props.initialValid || false, isTouched:false});
  const {value, isValid} = currentValue;
  const {onInput,id} = props;

  useEffect( ()=>{
      onInput(id, value, isValid);
  },[value, isValid, id, onInput]);
  
  const changeHandler = event => {
    dispatch({type:'change', val:event.target.value, validators: props.validators})
  }

  const touchHandler = event => {
    dispatch({type:'touch'})
  }
  
  const element = props.element==='input' ?(

    <input id={props.id} type={props.type} placeholder={props.placeholder} value={currentValue.value} onChange={changeHandler} onBlur={touchHandler}/>

    ) : (

      <textarea id={props.id} rows={props.rows || 3} value={currentValue.value} onChange={changeHandler} onBlur={touchHandler} />

  );

    
  return <div className={`form-control ${!currentValue.isValid && currentValue.isTouched && 'form-control--invalid'}`}>
   <label htmlFor={props.id} > {props.label}</label>
   {element}
   {!currentValue.isValid && currentValue.isTouched && <p>{props.errorText}</p>}
  </div>
};

export default Input;
