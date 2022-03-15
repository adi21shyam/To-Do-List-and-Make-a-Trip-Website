//3rd Party Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

//Local Modules
import BackDrop from './BackDrop';

//CSS Files
import './Modal.css';

const ModalOverlay = props => {
  const jsxContent = (<div className= {`modal ${props.modalClass}`} style={props.style}>
    
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

    <form onSubmit = {props.onSubmit ? props.onSubmit : (event)=>{ event.preventDefault() }}>

      <div className={`modal__content ${props.contentClass}`}> 
      {props.children}
      </div>
    <footer className={`modal__footer ${props.footerClass}`} >
      {props.footer}    
    </footer>
    </form>  

    </div>);

    return ReactDOM.createPortal(jsxContent, document.getElementById('modal-portal'))
};

const Modal = props => {
  return <React.Fragment>
    {props.show && <BackDrop onClick={props.onCancel}/>}
    <CSSTransition
      in={props.show}
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames='modal'
    >
      <ModalOverlay {...props} />

    </CSSTransition>
  </React.Fragment>
};

export default Modal;