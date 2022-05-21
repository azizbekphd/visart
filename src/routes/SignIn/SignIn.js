import { useState } from "react";

function SignIn() {

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

    return (
        <>
            <div className="content">
                <header>
                    <img src="logo.png"/>
                </header>
                <main>
                    <h1>visart</h1>
                    <input
                        type={"text"}
                        value={data}
                        onChange={handleLogin}
                        placeholder={"Username, email or phone"}
                    />
                    <input
                        type={"password"}
                        value={data}
                        onChange={handleLogin}
                        placeholder={"Password"}
                    />
                    <button type={"submit"}>Sign in</button>
                </main>
            </div>
        </>
    );
}

export default SignIn;