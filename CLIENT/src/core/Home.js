import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';
import Landing from './Landing';
import '../css/styles.css'

function Home() {

    return (
        <div>
            {
                isAuthenticated() && isAuthenticated().student && (
                    <Navigate to="/student" />
                )
            }
            {
                isAuthenticated() && isAuthenticated().professor && (
                    <Navigate to="/admin" />
                )
            }
            {
                !isAuthenticated() &&
                // The page code will be written here itself
                // NO NEED for a new component
                // (   <Fragment>
                (
                        <Landing />
                    
                )
            }
        </div>
    )
}


export default Home