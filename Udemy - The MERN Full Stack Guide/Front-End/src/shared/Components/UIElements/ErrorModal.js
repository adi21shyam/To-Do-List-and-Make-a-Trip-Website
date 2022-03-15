//3rd Party Modules
import React from 'react';

//Local Modules
import Modal from './Modal';
import Button from '../FormElements/Button/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error} 
      footer={<Button onClick={props.onClear}>Close It</Button>}
    >      
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
