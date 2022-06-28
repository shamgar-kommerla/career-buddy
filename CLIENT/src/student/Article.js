import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Breadcrumb from './BreadCrumb'
import {getArticleByarticleId} from './helper/articlehelper'


const Article = () => {

    const params= useParams();
    const [article, setArticle] = useState([])

    const preload = () => {
        const {token} = isAuthenticated();
        getArticleByarticleId(params.articleId, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setArticle(data);
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        preload();
        
    }, [])

    // console.log(article);

    const minStyle = {
        width:'60%',
        margin: 'auto'
    }

    console.log(window.location.pathname);
    return (
        <section className="article-view-section">
            <Breadcrumb props={window.location.pathname} />
            <div style={minStyle}>
                <center>
                <h1>{article['company']} | {article['role']}</h1>
                </center>
                <div dangerouslySetInnerHTML={{__html: article['content']}}></div>
            </div>
        </section>
    )
}

export default Article
