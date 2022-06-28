import React, { useEffect, useState } from 'react'
import {getunverifiedArticles} from './helper/articlehelper'
import {isAuthenticated} from '../auth/index';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from './BreadCrumb';

const Verify = () => {
    
    const [articles, setArticles] = useState([]);
    

    const preload = () => {
        const {token, student} = isAuthenticated();
        getunverifiedArticles(student._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log(data);
                setArticles(data)
            }
        })
    }

    useEffect(() => {
        preload();
    },[]);

    const minStyles = {
        border : '1px solid #111',
        margin: '1rem'
    }

    return (
        <div className="verify-articles-section">
            <Breadcrumb props={window.location.pathname} />
            <center>
                <h2>UnVerifed Articles</h2>
            </center>
            
            {/* <p>This is verify page, only for P.Admin</p> */}
            <div className="article-cards">
            {
                articles.map((article,index) => {
                    return(
                        <div key={index} style={minStyles} className='article-card'>
                            <div className="article-heading">
                                <p className="company">{article['company']} | {article['role']}</p>
                            </div>
                            <div className="article-publisher-details">
                                <Link className="link" to={article['_id']}>read</Link>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Verify
