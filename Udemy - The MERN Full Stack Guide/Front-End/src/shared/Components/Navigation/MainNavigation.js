//3rd Party Modules
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

//Local Modules
import MainHeader from './MainHeader.js';
import SideDrawer from './SideDrawer.js';
import Navlinks from './NavLinks.js';
import BackDrop from '../UIElements/BackDrop.js';

//CSS Files
import './MainNavigation.css'
function MainNavigation (props){


    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    
    const closeDrawer = () => {
        setDrawerIsOpen(false);
    }
    
    return <>
    {
        drawerIsOpen && <BackDrop onClick={closeDrawer}/>
    }
    <SideDrawer show={drawerIsOpen}>
        <nav className='main-navigation__drawer-nav'>
            <Navlinks/>
        </nav>
    </SideDrawer>
    <MainHeader>
        <button className='main-navigation__menu-btn' onClick={()=>{setDrawerIsOpen(true)}}>
            <span/>
            <span/>
            <span/>
        </button>
        <h1 className='main-navigation__title'>
            <Link to='/'> Your Places </Link>
        </h1>
        <nav className='main-navigation__header-nav'>
            <Navlinks/>
        </nav>
    </MainHeader>
    </>
}
export default MainNavigation;