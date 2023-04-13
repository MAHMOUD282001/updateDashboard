import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let CategoriesStatusThunk = createAsyncThunk(
    "categories/CategoriesStatusThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API}/change_status/category/${arg?.id}`,
                {
                    status: arg?.status,
                },

                Api()
            );
            // console.log(res.data);

            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
