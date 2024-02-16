

import { createSlice } from "@reduxjs/toolkit";




const initialState = {

    currentUser: null,
    loading: false,
    error: false

}



const userSlice = createSlice({

    name: "helloSocialUser",
    initialState,
    reducers: {

        signInCart: (state) => void (

            state.loading = true

        ),


        signInSuccess: (state, action) => void (


            state.currentUser = action.payload,
            state.loading = false,
            state.error = false

        ),


        signInCart: (state, action) => (

            state.loading = false,
            state.error = action.payload

        )

    }


})




export const { signInCart, signInFailure, signInSuccess } = userSlice.actions


export default userSlice






