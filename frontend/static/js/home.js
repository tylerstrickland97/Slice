import api from './APIClient.js'

window.onload = () => {
    api.getUserByUsername('sampleuser').then(res => {
        console.log(res);
    });
}