import { SAVE_STATUS } from "../actions/types";

const initialState={
    loading:false,
    status:"",
    error:""
}

const SaveStatusRerducer=(state=initialState,action)=>{
    switch (action.type) {
            case SAVE_STATUS:
      console.log(action.payload, "after action");
                return{
                    loading:false,
                    status:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default SaveStatusRerducer;