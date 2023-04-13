import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let AddAttributeThunk = createAsyncThunk(
    "attribute/AddAttributeThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_API}/attributes`,
                {
                    name: arg?.name,
                },
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
