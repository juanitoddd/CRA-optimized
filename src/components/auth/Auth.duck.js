import axios from "axios";

const AUTH_LOADING = "AUTH_LOADING";
const AUTH_SERVER_ERROR = "AUTH_SERVER_ERROR";
const AUTH_DONE = "AUTH_DONE";

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const VERIFY = "VERIFY";

const SET_USER = "SET_USER";
const FEATURES = "FEATURES";

const initialState = {
  server_error: false,
  loading: false,
  action: null,
  data: null,
  jwt: null,
  user: null,
  features: []
};

// REDUCERS --- : Handle the result of the actions
let _user;
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        server_error: false,
        action: action._action // Signup, Login, etc
      };
    case SIGNUP:
      return {
        ...state,
        loading: false
      };
    case LOGIN:
      return {
        ...state,
        loading: false,
        jwt: action.response.data.jwt,
        user: action.response.data.user
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.response.data
      };
    case FEATURES:
      let _features = [];
      switch (action._role) {
        case "1": // OWNER
          _features = [
            "BOX_EDIT_INFO",
            "BOX_STATS",
            "ACCOUNT_DELETE",
            "ACCOUNT_EDIT",
            "MEMBERS_EDIT",
            "BILLING"
          ];
          break;
        case "2": // ADMIN
          _features = ["BOX_EDIT_INFO", "BOX_STATS", "MEMBERS_EDIT", "BILLING"];
          break;
        case "3": // WEBMASTER
          _features = ["BOX_EDIT_INFO"];
          break;
        case "4": // EDITOR
          _features = [];
          break;
        default:
          break;
      }
      return {
        ...state,
        features: _features
      };
    case LOGOUT:
      return {
        ...initialState
      };
    case AUTH_SERVER_ERROR:
      return {
        ...state,
        loading: false,
        server_error: true
      };
    case AUTH_DONE:
      return {
        ...state,
        loading: false,
        server_error: false
      };
    default:
      return state;
  }
};

// ACTIONS --- : Perform a change, call or (as its name implies) an action or logic

function actionLoading(_action) {
  return { type: AUTH_LOADING, _action };
}
function responseSignup(response) {
  return { type: SIGNUP, response };
}
function responseLogin(response) {
  console.log("response.success", response.success);
  if (response.success) {
    return { type: LOGIN, response };
  } else {
    return { type: AUTH_DONE, response };
  }
}
function responseUser(response) {
  if (response.success) {
    return { type: SET_USER, response };
  } else {
    return { type: AUTH_DONE, response };
  }
}
function requestDone(response) {
  return { type: AUTH_DONE, response };
}
function responseVerify(response) {
  return { type: VERIFY, response };
}
function serverError() {
  return { type: AUTH_SERVER_ERROR, response: { success: false } };
}

export function setFeatures(_role) {
  return { type: FEATURES, _role };
}

export function signup(_data) {
  return dispatch => {
    dispatch(actionLoading("signup"));
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/signup`, // CakePHP
      data: _data,
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded" // Prevents preflight
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(responseSignup(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function login(_data) {
  console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL);
  return dispatch => {
    dispatch(actionLoading("login"));
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/login`, // CakePHP
      data: _data,
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          console.log("response", response);
          return dispatch(responseLogin(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function saveUserProfile(_token, _user) {
  return dispatch => {
    dispatch(actionLoading());
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${_token}`
      },
      data: {
        User: _user
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(responseUser(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

// User changes the Password
export function userPassword(_token, _password) {
  console.log("Sending Password", _password);
  return dispatch => {
    dispatch(actionLoading());
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/password`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${_token}`
      },
      data: { password: _password },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(requestDone(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

// After getting Email to reset Password
export function resetPassword(_id, _password, _token) {
  return dispatch => {
    dispatch(actionLoading());
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/reset`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id: _id,
        password: _password,
        token: _token
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(requestDone(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function logout() {
  return { type: LOGOUT };
}

export function forgot(_email) {
  return dispatch => {
    dispatch(actionLoading("forgot"));
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/forgot`,
      data: { email: _email },
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(requestDone(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function getUserFromToken(_token) {
  return dispatch => {
    dispatch(actionLoading());
    return axios({
      url: `${process.env.REACT_APP_API_URL}/users/fromToken/${_token}`,
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(requestDone(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function getInviteFromToken(_token) {
  return dispatch => {
    dispatch(actionLoading());
    return axios({
      url: `${
        process.env.REACT_APP_API_URL
      }/invites/fromToken/${_token}`,
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(requestDone(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function acceptInvitation(_data, _token) {
  return dispatch => {
    dispatch(actionLoading());
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/accept/${_token}`,
      data: { User: _data },
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(requestDone(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function verifyEmail(_token) {
  return dispatch => {
    dispatch(actionLoading("verifyEmail"));
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/users/verify/${_token}`, // CakePHP
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(responseVerify(response.data));
        } else {
          // Server responded with an Error, 500, 404, etc
          return dispatch(serverError());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}
