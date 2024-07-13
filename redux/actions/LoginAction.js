import { LOGIN_REQUEST } from "./types";
import { URL } from "../../public/assets/path/path";

const loginData=(login)=>{
    return{
        type:LOGIN_REQUEST,
        payload:login
    }
}
const LoginAction=(params,LoginSuccess,LoginError)=>{
return(dispatch)=>{
    var axios=require("axios")
    var config={
        method:"post",
        url:`${URL.baseUrl}login`,
        data:params
    }
    axios(config).then((response)=>{
        dispatch(loginData(response.data))
        LoginSuccess(response.data)
    }).catch((err)=>{
        LoginError(err)
    })
}
}
export default LoginAction