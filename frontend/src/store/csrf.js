

const csrfFetch = async (url, options = {}, isJson = true ) => {
    options.method ||= 'GET';
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
        if(isJson) options.headers['Content-Type'] = 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }
    
    const response = await fetch(url, options);

    if (response.status >= 400) throw response;
 
    return response;
}




export const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
    
}

export const restoreCSRF = async () => {
    const response = await csrfFetch('/api/session')
    storeCSRFToken(response);
    return response;
}


export default csrfFetch