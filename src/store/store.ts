import {combineReducers, configureStore} from "@reduxjs/toolkit"
import productsSlide from "./productsSlice"

const rootReducer = combineReducers({
    products:productsSlide,

})

export default configureStore({
    reducer:rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>