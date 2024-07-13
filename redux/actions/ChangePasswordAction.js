import { CHANGE_PASSWORD } from "./types";
import { URL } from "../../public/assets/path/path";

const changePassword=(change_Password)=>{
    return{
        type:CHANGE_PASSWORD,
        payload:change_Password
    }
}
const ChangePasswordAction=(params,changePasswordSuccess,changePasswordError)=>{
return(dispatch)=>{
    var axios=require("axios")
    var config={
        method:"post",
        url:`${URL.baseUrl}passowrd_change`,
        data:params
    }
    axios(config).then((response)=>{
        dispatch(changePassword(response.data))
        changePasswordSuccess(response.data)
    }).catch((err)=>{
        changePasswordError(err)
    })
}
}
export default ChangePasswordAction