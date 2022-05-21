import apiRequest from "../utils/apiRequest";

export default class User {
    token;
    loggedIn;

    constructor(){
        this.token = localStorage.getItem("token");
    }

    login() {
            return new Promise((resolve, reject) => {
                if(this.token){
                    apiRequest({
                        path: "auth/login/",
                        method: "POST",
                        body: {
                            token: this.token,
                        }
                    }).then(async (response)=>{
                        console.log(await response.text())
                        resolve(await response.json());
                    }).catch((e)=>{
                        reject(e);
                    });
                } else {
                    reject("Token is null")
                }
            });
        // try{
        //     let response = await apiRequest({
        //         path: "auth/login",
        //         method: "POST",
        //         body: {
        //             token: this.token,
        //         }
        //     });
        // } catch (e) {
            
        // }
    }
 
    async signIn(login, password) {
        apiRequest({
            path: "auth/signin",
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
 
    async signUp(login, password) {
        apiRequest({
            path: "auth/signup",
            method: "POST",
            body: {
                username: login,
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