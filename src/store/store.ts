import {configureStore} from "@reduxjs/toolkit"
import productsSlide from "./productsSlice"



export default configureStore({
    reducer:{
        products:productsSlide,
    },
})