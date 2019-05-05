import axios from 'axios';

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    var serverUrl = "http://localhost:8080/login";
    var self = this;
    var payload = {
        "username": username,
        "password": password
    }
    axios.post(serverUrl, payload).then(
        function (response) {
            console.log(response);
            if(response.data.code == 200){
                console.log("Login successful");
                localStorage.setItem('sessionId', response.data.body);
            }else if(response.data.code == 204){
                console.log("Username password do not match");
                alert("username password do not match");
            }else{
                console.log("Username does not exists");
                alert("Username does not exist");
            }
        }
    ).catch(function (error){
        console.log(error);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('sessionId');
}

function register(){

}