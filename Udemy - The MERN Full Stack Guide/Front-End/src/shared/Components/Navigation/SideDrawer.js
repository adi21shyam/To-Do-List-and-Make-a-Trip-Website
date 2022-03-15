//3rd Party Modules
import React from 'react'
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

//CSS Files
import './SideDrawer.css';

function SideDrawer (props){

    return ReactDOM.createPortal(
        <CSSTransition
        in={props.show}
        timeout={200}
        classNames='slide-in-left'
        mountOnEnter
        unmountOnExit
        >
            <aside className='side-drawer'>{props.children}</aside>
        </CSSTransition>
        ,document.getElementById('drawer-portal'));
}
export default SideDrawer;