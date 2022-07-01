import { configureStore } from "@reduxjs/toolkit";
import {coinapi, newsapi} from '../services/index'

export default configureStore({
    reducer:{
     [coinapi.reducerPath]: coinapi.reducer,
     [newsapi.reducerPath]: newsapi.reducer
    },
})