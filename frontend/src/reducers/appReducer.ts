import { combineReducers } from "redux";
import { ownerReducer } from "./ownerReducer";
import { showcaseReducer } from "./showcaseReducer";
import { cartReducer } from "./cartReducer";
import { dashboardReducer } from "./dashboardReducer";
import { staffReducer} from "./staffReducer";

const appReducer = combineReducers({
  dashboard: dashboardReducer,
  staff: staffReducer,
  owner: ownerReducer,
  showcase: showcaseReducer,
  cart: cartReducer,
});

export default appReducer;
