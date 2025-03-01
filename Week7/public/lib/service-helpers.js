const access_token = storageHasData() ? getStorage('access_token') : '';
const token = `Bearer ${access_token}`;

const DEFAULT_OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const DEFAULT_OPTIONS_WITH_AUTH = {
    headers: {
        Authorization: token,
        'Content-Type': 'application/json',
    },
};

const OPTIONS_WITH_AUTH = {
    headers: {
        Authorization: token,
    },
};

/**
 * Generic Read API Handler
 * 
 * @param {string} url - address to make request to
 * @param {any} options - additional options to send. Defaults to options with auth headers
 */
const _get = async (url, options = DEFAULT_OPTIONS_WITH_AUGH) => {
    const res = await fetch(url, {
        method: 'GET',
        ... options,
    });
    return res.json();
};

/**
 * Generic Create API Handler
 * 
 * @param {string} url - address to make request to 
 * @param {any} data - updates to send
 * @param {any} options - additional options to send. Defaults to options with normal headers
 */
const _post = async (url, data, options = DEFAULT_OPTIONS) => {
    const res = await fetch(url, {
        method: 'POST',
        ... options,
        body: JSON.stringify(data),
    });

    return res.json();
};

/**
 * Generic Update API Handler
 * NOTE: PUT requests strictly require authentication.
 * @param {string} url - address to make requests to 
 * @param {any} data - updates to send
 * @param {any} options - additional options to send. Defaults to options with auth headers
 */
const _put = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const res = await fetch(url, {
        method: 'PUT',
        ... options,
        body: JSON.stringify(data),
    });
};

/**
 * Generic Delete API Handler
 * NOTE: DELETE requests strictly require authentication
 * 
 * @param {string} url - address to make request to 
 * @param {any} options - additional options to send. Defaults to options with auth headers
 */
const _delete = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const res = await fetch(url, {
        method: 'DELETE',
        ... options,
    });
    return res.json();
};
