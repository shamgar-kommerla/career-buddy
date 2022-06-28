import React, {useState, useEffect} from 'react'
import {getMyPublishedArtices, getMyUpdateSuggestedArtices} from './helper/articlehelper';
import {isAuthenticated} from '../auth/index';
import { Link, useNavigate } from 'react-router-dom';


const StudentDashboard = () => {
    const {token, student} = isAuthenticated();
    const [published, setPublished] = useState([])
    const [update, setUpdate] = useState([])
    
    console.log(isAuthenticated().student);
    const preload = () => {

        getMyPublishedArtices(student._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setPublished(data)
            }
        })
        .catch(err => console.log(err))

        getMyUpdateSuggestedArtices(student._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setUpdate(data)
            }
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {
        preload();
    }, [])
    
    return (
        <section className='student-dashboard'>
            <div className="student-welcome-message">
                <div className="student-message-content">
                    <p>Hello <span className="student-name">{isAuthenticated().student.name}</span>,</p>
                    <p>welcome to CAREER BUDDY</p>
                </div>
            </div>
            <div  className="dashboard-published-articles-section" >
                <div className="dashboard-published-articles-container">
                    <h3 className="heading">Published Articles</h3>

                    <div  className="my-published-articles">
                        {
                            published.length === 0 ?
                                (
                                    <div className='no-articles-published'>
                                        <p>
                                        NO ARTICLES PUBLISHED BY YOU
                                        </p>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        {
                                            published.map(article => {
                                                // console.log(article);
                                                return (
                                                    <div className="card">
                                                        <div className="job-details">
                                                            <p className="company-name">{article['company']} </p>
                                                            <p className="job-description">{article['role']}</p> 
                                                        </div>
                                                        <div className="publish-status">
                                                            <p>publish-status: <span className="status">published</span></p>
                                                        </div>
                                                        <Link to={`/student/articles/${article['_id']}`}>Read</Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            <div className="dashboard-yet-to-update-section" >
                <div className="dashboard-yet-to-update-container">
                    <h3 className="heading">Yet to Update</h3>
                    <div  className="my-update-suggestions">
                        {
                            update.length === 0 && 
                            (
                                <div className='no-articles-published'>
                                    <p>
                                    NO ARTICLES PUBLISHED BY YOU
                                    </p>
                                </div>
                            )
                        }
                    {
                            update.map(article => {
                                return (
                                    <div className="card">
                                        <div className="job-details">
                                            <p className="company-name">{article['company']} </p>
                                            <p className="job-description">{article['role']}</p> 
                                        </div>
                                        <div className="publish-status">
                                            <p>publish-status: <span className="status">not published</span></p>
                                        </div>
                                        <div className="suggestions">
                                            <p>messages : <span className="message">{article['edit_suggestions']}</span></p>
                                        </div>
                                        <button>Edit & Resubmit article</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentDashboard;
