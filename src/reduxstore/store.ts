import { configureStore ,Tuple} from '@reduxjs/toolkit'
import cartReducer,{CartStateType} from './cartSlice'
import productsReducer,{ProductsStateType} from './productsSlice'
import usersReducer,{UsersStateType} from './usersSlice'
import userDetailsslice,{UserDetailsType} from './userDetailsslice'
import sessionStorage from 'redux-persist/es/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk'

const persistConfig={
    key: "root", 
    storage:sessionStorage,
}
export type RootState= {
    products:ProductsStateType;
    cart: CartStateType;
    users: UsersStateType;
    userDetails:UserDetailsType
  }
const persistUserDetailsReducer=persistReducer(persistConfig,userDetailsslice)
const store=configureStore({
    reducer:{
        products:productsReducer,
        cart: cartReducer,
        users: usersReducer,
        userDetails:persistUserDetailsReducer
    },
    middleware:()=>new Tuple(thunk)
})

export const  persistor = persistStore(store);


export default store