import React, {Fragment} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth/index';



const currentTab = (path) => {
    if(window.location.pathname === path){
        return {color: "#3f0071",textShadow:"0px 0px 2px rgba(63,0,113,0.2)"}
    }else {
        return {color:"#444"}
    }
}




const AdminMenu = () => {
    let navigate = useNavigate();
    return (
        <section className='menu-section'>
            <div className='menu-container'>
                <div className="logo-section">
                    <h3 className='logo'>CAREER BUDDY</h3>
                </div>
                <ul>    
                    
                    {
                        !isAuthenticated() && (
                            <Fragment>
                                <li>
                                    <Link style={currentTab("/")} to="/"  className="nav-link" >Home</Link>
                                </li>
                                <li>
                                    <a style={currentTab("#about")} href="#about"  className="nav-link" >About</a>
                                </li>
                                <li>
                                    <a style={currentTab("#creators")} href="#creators"  className="nav-link" >Creators</a>
                                </li>
                                <li>
                                    <Link style={currentTab("/signin")} className="nav-link" to="/signin">Sign in</Link>
                                </li>
                                <li>
                                    <Link style={currentTab("/signup")} className="nav-link"  to="/signup">Sign up</Link>
                                </li>
                            </Fragment>
                        )
                    }
            
                    {
                        isAuthenticated() && (
                            <Fragment>
                                <li>
                                    <Link style={currentTab("/admin/dashboard")} className="nav-link" to="/admin/dashboard">Dashboard</Link>
                                </li>
                                {/* <li>
                                    <Link style={currentTab("/student/notifications")} className="nav-link" to="/student/notifications">Notoifications</Link>
                                </li> */}
                                <li>
                                    <Link style={currentTab("/admin/articles")} className="nav-link"  to="/admin/articles">Read</Link>
                                </li>
                                {/* // )} */}
                                <li>
                                    <Link style={currentTab("/admin/profile")} className="nav-link" to="/admin/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link style={currentTab("/admin/students")} className="nav-link" to="/admin/students">Students</Link>
                                </li>
                                <li>
                                <span className='nav-link' onClick={() => {
                                    signout(() => {
                                        navigate('/')
                                    })
                                    }}>Sign out</span>
                                </li>
                            </Fragment>
                        )
                    }
                    
                </ul>
            </div>
            
        </section>
    )
}

export default AdminMenu;
