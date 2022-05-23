import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";

function SignUp() {

    const [data, setData] = useState({
        "username": "",
        "password": "",
    });

    function handleUsername(e){
        setData({
            ...data,
            "username": e.target.value,
        })
    }

    function handlePassword(e){
        setData({
            ...data,
            "password": e.target.value,
        })
    }

    return (
        <>
            <div className="content">
                <div className="card">
                    <header>
                        <img src="logo.png" height={128}/>
                    </header>
                    <form>
                        <h1>visart</h1>
                        <TextInput
                            type={"text"}
                            value={data.username}
                            minLength={3}
                            onChange={handleUsername}
                            placeholder={"Username"}
                            required={true}
                        />
                        <PasswordInput
                            value={data.password}
                            minLength={8}
                            onChange={handlePassword}
                            placeholder={"Password"}
                            required={true}
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