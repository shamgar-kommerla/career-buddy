import {API} from '../backend'

export const signup = (user,next) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
        next();
    })
    .catch(err => {
        console.log(err);
    })
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json", // Accept shouldn't be included inside quotes
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => 
        console.log(err)
    )
}

// setting up a token if a user is successfully signed in 
export const authenticate = (data, next) => {
    // if window object is accessible to us
    // set JsonWebToken with JSON.stringify(data)
    if(typeof window !== "undefined"){ 
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}


export const signout = next => {
    // remove token from browser
    if(typeof window !== "undefined"){ 
        localStorage.removeItem("jwt")
        next();
    }

    // signout from backend ass well
    return fetch(`${API}/signout`, {
        method: "GET"
    })
    .then(response => console.log("Signout Success"))
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    // if window is not accesssible, user is not authenticated
    if(typeof window == "undefined"){ 
        return false;
    }
    // if there is a token already in the browser, we return that token
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
}

// professor routes
// export const professorIsAuthenticated = () => {
//     // if window is not accesssible, user is not authenticated
//     if(typeof window == "undefined"){ 
//         return false;
//     }
//     // if there is a token already in the browser, we return that token
//     if(localStorage.getItem("jwt")){
//         return JSON.parse(localStorage.getItem('jwt'))
//     }else{
//         return false;
//     }
// }

export const profSignin = (user) => {
    return fetch(`${API}/professors/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json", // Accept shouldn't be included inside quotes
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => 
        console.log(err)
    )
}
