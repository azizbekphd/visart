import React from "react";

const UserContext = React.createContext();

export function saveToken(token){
    localStorage.setItem("token", token)
}

export default UserContext;