import {API} from '../../backend';

export const allCompanies = () => {
    return fetch(`${API}/company/view`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))

}
