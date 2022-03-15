//3rd Party Modules
import React from 'react';

//CSS Files
import './MainHeader.css';

function MainHeader (props){

    return <header className='main-header'>
            {props.children}
    </header>
}
export default MainHeader;