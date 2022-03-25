
function Service(config, axios) {

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const get = (endpoint, params, callback) => {
    axios({
      method: 'get',
      url: config.apiUrl + endpoint,
      params
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const post = (endpoint, params, callback) => {
    axios({
      method: 'post',
      url: config.apiUrl + endpoint,
      data: params
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const sendFile = (endpoint, method, formData, callback) => {
    const userToken = getToken();

    axios({
      method: method,
      url: config.apiUrl + endpoint,
      data: formData,
      headers: {
        'Authorization': "bearer " + userToken,
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const getLogged = (endpoint, params, callback) => {
    const userToken = getToken();
    axios({
      method: 'get',
      url: config.apiUrl + endpoint,
      headers: { 'Authorization': "bearer " + userToken },
      params
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const postLogged = (endpoint, params, callback) => {
    const userToken = getToken();
    axios({
      method: 'post',
      url: config.apiUrl + endpoint,
      headers: { 'Authorization': "bearer " + userToken },
      data: params
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const putLogged = (endpoint, params, callback) => {
    const userToken = getToken();
    axios({
      method: 'put',
      url: config.apiUrl + endpoint,
      headers: { 'Authorization': "bearer " + userToken },
      data: params
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const removeLogged = (endpoint, params, callback) => {
    const userToken = getToken();
    axios({
      method: 'delete',
      url: config.apiUrl + endpoint,
      headers: { 'Authorization': "bearer " + userToken },
      data: params
    }).then(function (response) {
      if (response.status == 200) {
        callback(null, response.data);
      } else {
        callback(response.data);
      }
    }, function (error) {
      return callback(error.response);
    });
  };

  const getMe = (callback) => {
    getLogged('admins/me', {}, callback);
  }

  const getById = (endpoint, id, callback) => {
    getLogged(endpoint + '/getById', { id }, callback);
  }

  const login = (admin, callback) => {
    post('admins/login', admin, callback);
  }

  const registertaxi = (taxi, callback) => {
    post('taxis/register', taxi, callback);
  }

  const listAdmins = (query, callback) => {
    getLogged('admins/list', query || {}, callback);
  }

  const createAdmin = (admin, callback) => {
    post('admins/register', admin, callback);
  }

  const createUser = (user, callback) => {
    post('users/register', user, callback);
  }

  const removeAdmin = (id, callback) => {
    removeLogged('admins/remove', { id }, callback);
  }

  const updateUser = (userId, user, callback) => {
    putLogged('users/' + userId, user, callback);
  }

  const count = (endpoint, query, callback) => {
    getLogged(endpoint + '/count', query, callback);
  }

  const load = (endpoint, id, callback) => {
    get(endpoint + '/' + id, {}, callback);
  }

  const listAuth = (endpoint, query, callback) => {
    getLogged(endpoint + '/list', query || {}, callback);
  }

  const list = (endpoint, query, callback) => {
    get(endpoint + '/list', query || {}, callback);
  }

  const create = (endpoint, data, callback) => {
    postLogged(endpoint + '/create', data, callback);
  }

  const createWithFile = (endpoint, data, callback) => {
    sendFile(endpoint + '/create-file', 'post', data, callback);
  }

  const createOrUpdate = (endpoint, data, callback) => {
    postLogged(endpoint + '/createOrUpdate', data, callback);
  }

  const update = (endpoint, dataId, data, callback) => {
    putLogged(endpoint + '/' + dataId, data, callback);
  }

  const updateWithFile = (endpoint, dataId, data, callback) => {
    sendFile(endpoint + '/' + dataId + '/file', 'put', data, callback);
  }

  const remove = (endpoint, id, callback) => {
    removeLogged(endpoint + '/remove', { id }, callback);
  }

  const getVisaToken = (query, callback) => {
    post('visa/token', query, callback);
  }

  const visaPay = (query, callback) => {
    post('visa/pay', query, callback);
  }

  const sepaPay = (query, callback) => {
    post('sepa/pay', query, callback);
  }



  return {
    getMe,
    getById,
    login,
    registertaxi,
    count,
    createAdmin,
    createUser,
    removeAdmin,
    listAdmins,
    updateUser,
    create,
    update,
    remove,
    list,
    listAuth,
    load,
    sendFile,
    createOrUpdate,
    createWithFile,
    updateWithFile,
    getVisaToken,
    visaPay,
    sepaPay
  };
}

export default Service;