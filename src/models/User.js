import apiRequest from "../utils/apiRequest";

export default class User {
    token;
    loggedIn;

    constructor(){
        this.token = localStorage.getItem("token");
    }

    async login() {
        await apiRequest({
            path: "login",
            method: "POST",
            body: {
                token: this.token,
            }
        }).then((response)=>{
            console.log(response);
            this.loggedIn = true;
        }).finally(()=>{
            this.loggedIn = true;
        })
    }

    async signIn(login, password) {
        apiRequest({
            path: "signin",
            method: "POST",
            body: {
                login: login,
                password: password,
            }
        }).then((response)=>{
            console.log(response);
            this.loggedIn = true;
        }).finally(()=>{
            this.loggedIn = true;
        })
    }

    logout() {
        localStorage.removeItem("token");
        this.token = null;
        this.loggedIn = false;
    }
}