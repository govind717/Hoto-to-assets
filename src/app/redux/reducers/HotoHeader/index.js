const { PACKAGE_NO } = require("app/redux/actions/HotoHeader/constants");

const INTI_STATE = {
    data:"Package 1"
}

const packageNoDataReducer = (state = INTI_STATE,action) => {
     switch (action.type) {  
       case PACKAGE_NO:
         return {
           data:action.payload
         };
       default:
         return state;
     }
};
export default packageNoDataReducer;