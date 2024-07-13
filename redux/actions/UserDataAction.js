import { USER_DATA } from "./types";
import { URL } from "../../public/assets/path/path";

const userData=(user_data)=>{
    return{
        type:USER_DATA,
        payload:user_data
    }
}
const UserDataAction=(userDataSuccess,userDataError)=>{
return(dispatch)=>{
    var axios=require("axios")
    var config={
        method:"get",
        url:`${URL.baseUrl}global_dashboard`,
        // data:params
    }
    axios(config).then((response)=>{
        dispatch(userData(response.data))
        userDataSuccess(response.data)
    }).catch((err)=>{
        userDataError(err)
    })
}
}
export default UserDataAction