import axios from "axios";

const API_URL = "http://localhost:5000/signin";

// handle registration process for client side
const register = (username, password) => {

    const data = {
        username: username,
        password: password
    }

    axios.post(API_URL + '/register', data)
        .then(res => {
            if (res.data.msg === 'User added!') {
                alert('registration complete')
                window.location = '/signin'
            }
            else {
                if (res.data.msg === 'Username is already taken') {
                    alert('Sorry, that username is taken')
                }
                else {
                    alert('registration failed')
                }
            }
        })
        .catch(err => console.log("Registration Error -> ", err))
};

// login on client side, setup jwt token
const login = (username, password) => {

    const data = {
        username: username,
        password: password
    }

    axios.post(API_URL, data)
        .then(res => {
            console.log(res)
            if (res.data.msg === 'login successful') {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                // alert("welcome!")
                window.location = '/'
                return res.data
            }
            else {
                alert('sorry incorrect login')
                console.log('login failure')
            }
        })
        .catch(err => console.log("Signin Error -> ", err))
};

// remove token to logout
const logout = () => {
    localStorage.removeItem("user");
};

// returns data in localstorage for token use
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

// set a header to authenticate on server side
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }


const auth = {
    register,
    login,
    logout,
    getCurrentUser,
    authHeader
}

export default auth