import React, { useState, createContext } from "react";
import user from "../api/users"

const access_token = localStorage.getItem("access_token");
// if (!access_token) { window.location.replace("/login") }
console.log(access_token);
const AuthStr = 'Bearer '.concat(access_token);
const getUser = async (AuthStr) => {
    let userData = undefined;
    const response = await user.get("/my_profile", { headers: { Authorization: AuthStr } })
    .then((response) => {
        userData = response.data.data.payload
        console.log(userData);
        // return userData
    })
    .catch((e) => {
        console.log("error");
        throw e
        // Promise.reject(e)
        // return {}
    })
    return userData
}

console.log(access_token);
let currentUser
if(access_token != null && access_token != undefined){
    console.log("if");
    currentUser = getUser(AuthStr)
}
else{
    console.log("else");
    currentUser = undefined
}
// const currentUser = access_token != null? getUser(AuthStr) : {};
console.log(currentUser);

// const currentLocation = window.location.href
// if(currentUser && currentUser != {} && currentLocation.indexOf("login") < 0  ){
//     window.location.href = "/login"
// }else if(currentUser && currentUser != {} && !currentUser.problem_category && currentLocation.indexOf("updateProfile") < 0){
//     window.location.href = "/updateProfile"
// }




export const UserContext = createContext();
export const UserContextProvider = props => {
    const [User, setUser] = useState(currentUser);
    // const [selectedUser, setSelectedUser] = useState(null);
    const setCurrentUser = (token) => {
        console.log("token");
        console.log(token);
        token = "Bearer ".concat(token)
        const user = getUser(token)
        console.log(user);
        setUser(user);
        // localStorage.setItem("user", JSON.stringify(User))
    };
    return (
        <UserContext.Provider value={{ User, setUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
