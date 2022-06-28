import {API} from '../../backend';


export const createArticle = (studentId, token, article) => {
    return fetch(`${API}/article/create/${studentId}`, {
        method:"POST",
        headers: {
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(article)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=> console.log(err))
}


// unpublished articles
export const getunverifiedArticles = (studentId , token) => {
    // localhost:8000/api/articles/unverified/61c1a4409dfcb734ee0520bd
    return fetch(`${API}/articles/unverified/${studentId}`, {
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
            // console.log(response);
            return response.json();
    })
    .catch(err => console.log(err))
}

// get published articles
export const getPublishedArticles = (token) => {
    return fetch(`${API}/articles`, {
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

// for reading the published articles
export const getArticleByarticleId = (articleId, token) => {
    return fetch(`${API}/articles/${articleId}`, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

// suggestions
export const suggestEdits = (articleId, studentId, token, suggestions) => {
    return fetch(`${API}/article/suggest/${articleId}/${studentId}`, {
        method : "PUT",
        headers: {
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(suggestions)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const tickArticleAsVerified = (articleId, studentId, token) => {
    return fetch(`${API}/article/verify/${articleId}/${studentId}`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getMyPublishedArtices = (studentId, token) => {
    return fetch(`${API}/articles/published/${studentId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getMyUpdateSuggestedArtices = (studentId, token) => {
    return fetch(`${API}/articles/suggestion/${studentId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const rejectArticleAndDelete = (articleId, studentId, token) => {
    return fetch(`${API}/article/${articleId}/${studentId}`, {
        method:"DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
