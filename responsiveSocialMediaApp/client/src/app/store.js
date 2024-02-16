import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loginUserApiRtk } from '../features/rtkQuery/LoginUserRtk';
import { registerUserApiRtk } from '../features/rtkQuery/RegisterUser';
import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import userSlice from '../features/Slices/userSlice';
import { searchUserApiRtk } from '../features/rtkQuery/SearchRtk';
import { aboutUserApiRtk } from '../features/rtkQuery/AboutUserRtk';


const rootReducer = combineReducers({

  helloSocialUser: userSlice.reducer,


  [registerUserApiRtk.reducerPath]:registerUserApiRtk.reducer,
  [loginUserApiRtk.reducerPath]:loginUserApiRtk.reducer,
  [searchUserApiRtk.reducerPath]:searchUserApiRtk.reducer,
  [aboutUserApiRtk.reducerPath]:aboutUserApiRtk.reducer,

})


const persisConfig = {

  key: 'helloSocial',
  version: 1,
  storage,

}


const persistedReducer = persistReducer(persisConfig, rootReducer)


export const store = configureStore({

  reducer:persistedReducer,
  middleware:getDefaultMiddleware => getDefaultMiddleware({}).concat(loginUserApiRtk.middleware)

});



export const persistor = persistStore(store);





