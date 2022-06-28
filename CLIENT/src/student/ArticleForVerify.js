import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import {getArticleByarticleId, suggestEdits,tickArticleAsVerified, rejectArticleAndDelete} from './helper/articlehelper'
import Breadcrumb from './BreadCrumb';


const ArticleForVerify = () => {

    const params = useParams();
    const [article, setArticle] = useState([]);
    const {student,token} = isAuthenticated();
    const preload = () => {
        // const {} = isAuthenticated();
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

    
    console.log(article);

    //  for SUGGESTIONS 
    const [suggestion, setSuggestion] = useState({
        edit_suggestions:""
    });

    const handleSuggestionChange = (e) => {
        console.log(suggestion);
        setSuggestion({
            ...suggestion,
            edit_suggestions: e.target.value
        })
    }
    const handleSuggestions = (e) => {
        e.preventDefault();
        suggestEdits(article._id, student._id, token,suggestion)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log("Suggested successfully");
            }
        })
        .catch(err => console.log(err))
    }


    // TICKING AS VERIFIED
    const tickAsVerified = () => {
        tickArticleAsVerified(article._id,student._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log("Verified successfully");
            }
        })
        .catch(err => console.log(err))
    }

    //REJECTING
    const rejectArticle = () => {
        rejectArticleAndDelete(article._id, student._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log("Rejected form and deleted it from database");
            }
        })
        .catch(err => console.log(err))
    }

    const minStyle = {
        width:'60%',
        margin: 'auto'
    }

    return (
        <section>
            <Breadcrumb props={window.location.pathname} />
            <div style={minStyle}>
                <h1>{article['company']} | {article['role']}</h1>
                <div dangerouslySetInnerHTML={{__html: article['content']}}></div>
                <form onSubmit={handleSuggestions}>
                    <textarea onChange={handleSuggestionChange}  name="edit_suggestions" cols="30" rows="10"></textarea>
                    <button type="submit">suggest</button>
                </form>

                <button onClick={tickAsVerified}>Tick as Verified</button><br />
                <button onClick={rejectArticle}>Reject</button>
            </div>
        </section>
        
    )
}

export default ArticleForVerify
