
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Reducers listed here will be persisted
};

export default persistConfig;
