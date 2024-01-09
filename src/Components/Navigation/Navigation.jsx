import React from 'react';
import homeIcon from '../../img/home-icon.svg';
import tasksIcon from '../../img/tasks-icon.svg';
import settingsIcon from '../../img/settings-icon.svg';
import signOutIcon from '../../img/signout-icon.svg';
import './Navigation.css';

// Light Icons:

// import homeLightIcon from '../../img/homeLightIcon.png';
// import tasksLightIcon from '../../img/tasksLightIcon.png';
// import settingsLightIcon from '../../img/settingsLightIcon.png';
// import signOutLightIcon from '../../img/signoutLightIcon.png';

const Navigation = ({ user, changeRoute, handleNavRoute }) => {
   

    return(
        <>
            <div className="navigation">
                <div 
                    className="nav-route"
                >
                    <img className='profile-picture' src="https://api.multiavatar.com/teo.svg" alt="" />
                    <p> {user.firstName} </p>
                </div>
                <div 
                    className="nav-route"
                    onClick={() => handleNavRoute('home')}

                >
                    <img className='icon' src={homeIcon} alt="" />
                    <p> Home </p>
                </div>
                <div 
                    className="nav-route"
                    onClick={() => handleNavRoute('tasks')}

                >
                    <img className='icon' src={tasksIcon} alt="" />
                    <p> Tasks </p>
                </div>
                <div 
                    className="nav-route"

                >
                    <img className='icon' src={settingsIcon} alt="" />
                    <p> Settings </p>
                </div>
                <div 
                    className="nav-route"
                    onClick={() => changeRoute('signout')}
                >
                    <img className='icon' src={signOutIcon} alt="" />
                    <p> Sign Out </p>
                </div>
            </div>
        </>
    );
}


export default Navigation;