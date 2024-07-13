import { SAVE_STATUS } from "./types"

export const fetchStatus=(status)=>{
    return{
        type:SAVE_STATUS,
        payload:status
    }
    }

const SaveStatusAction=(params)=>{
    return(dispatch)=>{
        console.log(params, "before action")
        dispatch(fetchStatus(params))
    }
}

export default SaveStatusAction