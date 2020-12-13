import axios from "axios";

const API_URL = "http://localhost:5000/signin";

const register = (username, password) => {

    const data = {
        username: username,
        password: password
    }

    axios.post(API_URL + '/register', data)
        .then(res => {
            if (res.data.msg === 'User added!') {
                alert('registration complete')
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
                alert("welcome!")
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

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};