import React, { Fragment, useEffect, useState } from 'react'
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { deleteArticle } from '../professor/helper/studenthelper';
import Breadcrumb from './BreadCrumb';
import {getPublishedArticles} from './helper/articlehelper';


const ReadArticles = () => {

    const [articles, setArticles] = useState([])
    const navigate = useNavigate();
    const preload = () => {
        const {token} = isAuthenticated();
        getPublishedArticles(token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setArticles(data)
            }
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        preload();
    }, [])
    
    const handleDelete = (id) => {
        const {token} = isAuthenticated();
        const {_id} = isAuthenticated().professor;
        deleteArticle(id,_id,token);
    }

    return (
        <section className="read-articles-section">
            <Breadcrumb props={window.location.pathname} />
            {/* <p>Here you can see some famous articles</p> */}
            <div className="article-cards-container">
            {
                articles.map((article,index) => {
                    return (
                        <div key={index} className="article-card">
                            <div className="article-name">{article['company']}</div>
                            <div className="article-role">{article['role']}</div>
                            {/* <p>published: {article['updatedAt'].toLocaleDateString("en-US")}</p> */}
                            {
                                console.log(Date(article['updatedAt']))
                            }
                            <div className="publisher-details">
                                <Link to={article['_id']}>read this article</Link>
                            </div>
                            {
                                isAuthenticated().professor && (
                                    <button className="delete-article" onClick={() => handleDelete(article['_id'])}>
                                        delete this article
                                    </button>
                                )
                            }
                        </div>
                    )
                })
            }
            </div>
            
        </section>
    )
}


export default ReadArticles