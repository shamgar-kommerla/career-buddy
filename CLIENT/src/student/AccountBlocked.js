import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signout } from '../auth';


const AccountBlocked = () => {
    const navigate =useNavigate();
    return (
        <div>
            <center>
                <h1>THIS ACCOUNT HAS BEEN BLOCKED</h1>
                <h4>Please contact Admin</h4>
                <button  onClick={() => {
                                    signout(() => {
                                        navigate('/')
                                    })
                                    }}>Signout</button>
            </center>
        </div>
    )
}

export default AccountBlocked
