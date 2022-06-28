import {API} from '../../backend';

export const getAllStudents = (professorId, token) => {
    return fetch(`${API}/admin/students/${professorId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .catch(err => console.log(err))
}

export const blockStudent = (studentId, professorId, token ) => {
    console.log(`${API}/admin/block/${studentId}/${professorId}, ${token}`);
    return fetch(`${API}/admin/block/${studentId}/${professorId}`, {
        method:"PUT",
        headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        // console.log("REsponse Block");
        return response.text();
    })
    .catch(err => console.log(`Error: ${err}`))
}
export const unBlockStudent = (studentId, professorId, token ) => {
    console.log('unblock function called');
    return fetch(`${API}/admin/unblock/${studentId}/${professorId}`, {
        method:"PUT",
        headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err))
}
export const promoteStudent = (studentId, professorId, token ) => {
    console.log(`${API}/admin/promote/${studentId}/${professorId}`);
    return fetch(`${API}/admin/promote/${studentId}/${professorId}`, {
        method: "PUT",
        headers: {
            // "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err))
}
export const demoteStudent = (studentId, professorId, token ) => {
    console.log(`${API}/admin/demote/${studentId}/${professorId}`);
    return fetch(`${API}/admin/demote/${studentId}/${professorId}`, {
        method: "PUT",
        headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteArticle = (articleId, professorId, token)=> {
    return fetch(`${API}/admin/article/delete/${articleId}/${professorId}`,{
        method: "DELETE",
        headers: {
            // "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err))
}