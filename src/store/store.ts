import {combineReducers, configureStore} from "@reduxjs/toolkit"
import productsSlide from "./productsSlice"
import cartSlice from "./cartSlice"
import loginSlice from "./loginSlice"

const rootReducer = combineReducers({
    products:productsSlide,
    cart:cartSlice,
    login:loginSlice,

})

export default configureStore({
    reducer:rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>