import React, { useEffect } from 'react';
import {BrowserRouter,Route, Routes, useNavigate} from 'react-router-dom';
import { isAuthenticated, signout } from './auth';
import Home from './core/Home';
import Publish from './student/Publish';
import Signin from './user/Signin';
import Signup from './user/Signup';
import StudentDashboard from './student/StudentDashboard';
import StudentNotifications from './student/StudentNotifications';
import Student from './student/Student';
import ReadArticles from './student/ReadArticles'
import Verify from './student/Verify';
import Article from './student/Article';
import ArticleForVerify from './student/ArticleForVerify';
import StudentProfile from './student/StudentProfile';
import AccountBlocked from './student/AccountBlocked';
import PublishCpy from './student/PublishCpy';
import TestRoute from './TestRoute';
import AdminDashboard from './professor/AdminDashboard';
import Admin from './professor/Admin';
import AdminProfile from './professor/AdminProfile';
import StudentsList from './professor/StudentsList';

function MyRoutes() {
    
    return (
        <BrowserRouter>
            <Routes>

                <Route exact path='/' element={<Home/>} />
                <Route exact path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/send_mail" element={<TestRoute />}></Route>

                <Route path="/student/blocked" element={<AccountBlocked />} />
                <Route path="/student" element={<Student />}>
                    <Route path="dashboard" element={<StudentDashboard />}/>
                    <Route path="notifications" element={<StudentNotifications />} />
                    <Route path="publish" element={<PublishCpy />} />
                    <Route path="articles" element={<ReadArticles />} />
                    <Route path="articles/:articleId" element={<Article />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="verify" element={ <Verify />} />
                    <Route path="verify/:articleId" element={<ArticleForVerify />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route path="dashboard" element={<AdminDashboard />}/>
                    <Route path="articles" element={<ReadArticles />} />
                    <Route path="verify" element={ <Verify />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="students" element={<StudentsList />} />
                    <Route path="articles/:articleId" element={<Article />} />

                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

function PageNotFound () {
    return (
        <div>
            <center>
                <h1>404</h1><br />
                <h1>PAGE NOT FOUND</h1>
            </center>
        </div>
    )
}

function OnlyForAdmins () {
    return(
        <div>
            <center>
                <h1>ACCEDD DENIED</h1>
                <h3>Only for ADMINS</h3>
            </center>
        </div>
    )
}

export default MyRoutes;