import axios from 'axios';

export const userService = {
    login,
    logout,
    register
};

function login(email, password) {
    console.log("inside login service function");
    localStorage.setItem("sessionId", "12345");
   // console.log(localStorage.getItem("sessionId"));
    return;
    // var serverUrl = "http://localhost:8080/login";
    // var self = this;
    // var payload = {
    //     "email": email,
    //     "password": password
    // }
    // axios.post(serverUrl, payload).then(res => {
    //         console.log(res);
    //         if(res.status == 200){
    //             console.log("Login successful");
    //             localStorage.setItem('sessionId', res.data.body);
    //         }else if(res.status == 204){
    //             console.log("email password do not match");
    //             alert("email password do not match");
    //         }else{
    //             console.log("email does not exists");
    //             alert("email does not exist");
    //         }
    //     }
    // ).catch(function (error){
    //     console.log(error);
    // });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('sessionId');
}

function register(){

}