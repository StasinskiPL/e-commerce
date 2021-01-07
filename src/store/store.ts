import {combineReducers, configureStore} from "@reduxjs/toolkit"
import productsSlide from "./productsSlice"
import cartSlice from "./cartSlice"

const rootReducer = combineReducers({
    products:productsSlide,
    cart:cartSlice,

})

export default configureStore({
    reducer:rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>