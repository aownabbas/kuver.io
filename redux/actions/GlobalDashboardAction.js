import { GLOBAL_DASHBOARD } from "./types";
import { URL } from "../../public/assets/path/path";

const globalDashboard=(g_dashboard)=>{
    return{
        type:GLOBAL_DASHBOARD,
        payload:g_dashboard
    }
}
const GlobalDashboardAction=(globalDashboardSuccess,globalDashboardError)=>{
return(dispatch)=>{
    var axios=require("axios")
    var config={
        method:"get",
        url:`${URL.baseUrl}g_dashboard`,
        // data:params
    }
    axios(config).then((response)=>{
        dispatch(globalDashboard(response.data))
        globalDashboardSuccess(response.data)
    }).catch((err)=>{
        globalDashboardError(err)
    })
}
}
export default GlobalDashboardAction