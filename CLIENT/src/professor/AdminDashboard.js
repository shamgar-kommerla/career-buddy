import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getPublishedArticles } from '../student/helper/articlehelper'
import { getAllStudents } from './helper/studenthelper'
import About from '../core/About';


const AdminDashboard = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    const preload = () => {
        const {token} = isAuthenticated();
        const {_id} = isAuthenticated().professor;
        
        getPublishedArticles(token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setArticles(data)
            }
        })
        .catch(err => console.log(err))

        
        getAllStudents(_id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setStudents(data);
            }
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        preload();
    }, []);

    console.log(articles.length);
    console.log(students.length);

  return (
    <section className='student-dashboard'>
            <div className="student-welcome-message">
                <div className="student-message-content">
                    <p>Hello <span className="student-name">prof. {isAuthenticated().professor.name}</span>,</p>
                    <p>welcome to CAREER BUDDY</p>
                </div>
            </div>
            {/* <div className="normal-details">
                <div className="n-d-cont">
                <div className="no-of-articles">
                        <div className="no-so-studs">
                            <p className="num">
                                {students.length}
                            </p>
                            <p className="desc">
                                students registered
                            </p>
                        </div>
                </div>
                <div className="no-of-articles">
                        <div className="no-so-arts">
                            <p className="num">
                                {articles.length}
                            </p>
                            <p className="desc">
                                articles published
                            </p>
                        </div>
                </div>
                </div>
                
            </div> */}




            <About />
        </section>
  )
}

export default AdminDashboard