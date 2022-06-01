import "./SignIn.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";
import UserContext from "../../contexts/UserContext";
import apiRequest from "../../utils/apiRequest";

function SignIn() {

    const {setUser, saveToken} = useContext(UserContext)

    const navigate = useNavigate()

    const [data, setData] = useState({
        "login": "",
        "password": "",
    });

    function handleLogin(e){
        setData({
            ...data,
            "login": e.target.value,
        })
    }

    function handlePassword(e){
        setData({
            ...data,
            "password": e.target.value,
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        apiRequest({
            path: "auth/signin/",
            method: "POST",
            body: data,
        }).then((response)=>{
            response.json().then((user)=>{
                setUser(user)
                saveToken(user["token"])
                window.location.replace("/")
            })
        }).catch((reason)=>{
            console.log(reason);
        })
    }

    return (
        <>
            <div className="content">
                <div className="card">
                    <header>
                        <img src="logo.png" height={128}/>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <h1>visart</h1>
                        <TextInput
                            type={"text"}
                            value={data.login}
                            minLength={3}
                            onChange={handleLogin}
                            placeholder={"Username, email or phone"}
                            required={true}
                        />
                        <PasswordInput
                            value={data.password}
                            minLength={8}
                            onChange={handlePassword}
                            placeholder={"Password"}
                            required={true}
                        />
                        <button type={"submit"}>Sign in</button>
                        <Link to="/signup">
                            Haven't account yet? Sign up
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;