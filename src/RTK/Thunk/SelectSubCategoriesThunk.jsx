import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let SelectSubCategoriesThunk = createAsyncThunk(
    "sub/SelectSubCategoriesThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API}/select_menu/sub_categories/${arg.id}`,
                Api()
            );
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
