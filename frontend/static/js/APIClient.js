const API_BASE = '/api/v1';

const HTTPClient = {
    get: (url) => {
        return fetch(`${API_BASE}${url}`).then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Response was not OK");
            }
        }).then(obj => {
            return obj;
        }).catch(err => {
            console.log(err);
        })
    },

    post: (url, data) => {
        return fetch(`${API_BASE}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringfy(data)
        }).then(handleError).then(res => {
            return res.json();
        });
    },

    put: (url, data) => {
        return fetch(`${API_BASE}${url}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log(data);
        });
    },

    delete: (url, data) => {
        return fetch(`${API_BASE}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(handleError).then(res => {
            return res.json();
        });
    }
};

export default {
    getCurrentUser: () => {
        return HTTPClient.get('/current');
    },

    getUserByUsername: (username) => {
        return HTTPClient.get('/users/' + username);
    }

};