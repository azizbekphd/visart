import "./SignUp.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";
import apiRequest from "../../utils/apiRequest";
import UserContext from "../../contexts/UserContext";
import User from "../../models/User";

function SignUp() {

    const {setUser, saveToken, getToken} = useContext(UserContext)

    const navigate = useNavigate()

    const [data, setData] = useState({
        "username": "",
        "password": "",
        "name": "",
        "surname": "",
        "email": "",
        "phone": ""
    });

    function handleData(e, key){
        setData({
            ...data,
            [key]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        apiRequest({
            path: "auth/signup/",
            method: "POST",
            body: data,
        }).then((response)=>{
            response.json().then((user)=>{
                setUser(user)
                saveToken(user["token"])
                navigate("/", {replace: true})
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
                            value={data.username}
                            minLength={3}
                            onChange={(e)=>handleData(e, "username")}
                            placeholder={"Username"}
                            required={true}
                        />
                        <PasswordInput
                            value={data.password}
                            minLength={8}
                            onChange={(e)=>handleData(e, "password")}
                            placeholder={"Password"}
                            required={true}
                        />
                        <TextInput
                            type={"text"}
                            value={data.name}
                            onChange={(e)=>handleData(e, "name")}
                            placeholder={"Name"}
                        />
                        <TextInput
                            type={"text"}
                            value={data.surname}
                            onChange={(e)=>handleData(e, "surname")}
                            placeholder={"Surname"}
                        />
                        <button type={"submit"}>Sign up</button>
                        <Link to="/signin">
                            Already have an account? Sign in
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;