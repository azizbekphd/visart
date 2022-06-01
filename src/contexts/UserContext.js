import React from "react";
import User from "../models/User";

const UserContext = React.createContext();

export function saveToken(token){
    localStorage.setItem("token", token)
}

export default UserContext;