import { SIGNUP_REQUEST } from "./types";
import { URL } from "../../public/assets/path/path";

const signUpData=(signUp)=>{
    return{
        type:SIGNUP_REQUEST,
        payload:signUp
    }
}
const SignUpAction=(params,signUpSuccess,signUpError)=>{
return(dispatch)=>{
    console.log(`${URL.baseUrl}register?${params}`,'bbbbb')

    var axios=require("axios")
    var config={
        method:"post",
        url:`${URL.baseUrl}register?${params}`,
        // headers:{
        //     Authorization:`Bearer ${token}`,
        //     'Content-Type': 'application/json'
        // },
        // data:params
    }
    axios(config).then((response)=>{
        dispatch(signUpData(response.data))
        signUpSuccess(response.data)
    }).catch((err)=>{
        signUpError(err)
    })
}
}
export default SignUpAction