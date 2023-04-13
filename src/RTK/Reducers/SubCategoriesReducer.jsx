import { createSlice } from "@reduxjs/toolkit";
import { SubCategoriesThunk } from "../Thunk/SubCategoriesThunk";
import { SelectParentCategoriesThunk } from "../Thunk/SelectParentCategoriesThunk";
import { AddSubCategoriesThunk } from "../Thunk/AddSubCategoriesThunk";
import { OneSubCategoriesThunk } from "../Thunk/OneSubCategoriesThunk";
import { UpdateSubCategoriesThunk } from "../Thunk/UpdateSubCategoriesThunk";
import { DeleteSubCategoriesThunk } from "../Thunk/DeleteSubCategoriesThunk";

let initState = {
    code: null,
    subcategoriesData: [],
    subcategoriesName: {},
    currentPage: 1,
    lastPage: 1,
    categoriesImg: "",
    name_en_Error: null,
    name_ar_Error: null,
    name_fr_Error: null,
    selectError: null,
    mainSelectData: [],
};

let SubCategoriesReducer = createSlice({
    name: "sub",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            if (action.payload.type === "en") {
                state.name_en_Error = null;
            }
            if (action.payload.type === "ar") {
                state.name_ar_Error = null;
            }
            if (action.payload.type === "fr") {
                state.name_fr_Error = null;
            }
            if (action.payload.type === "select") {
                state.selectError = null;
            }
            if (action.payload.type === "all") {
                state.subcategoriesName = {};
                state.name_fr_Error = null;
                state.name_ar_Error = null;
                state.name_en_Error = null;
            }
        },
        removeCategoriesData: (state, action) => {
            state.subcategoriesData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // =======SubCategoriesThunk===========
            .addCase(SubCategoriesThunk.fulfilled, (state, action) => {
                state.subcategoriesData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(SubCategoriesThunk.rejected, (state, action) => {})
            // =======SelectParentCategoriesThunk===========
            .addCase(SelectParentCategoriesThunk.fulfilled, (state, action) => {
                state.mainSelectData = action.payload.data;
            })
            .addCase(
                SelectParentCategoriesThunk.rejected,
                (state, action) => {}
            )
            // =======OneSubCategoriesThunk===========
            .addCase(OneSubCategoriesThunk.fulfilled, (state, action) => {
                state.subcategoriesName = action.payload.data.name;
            })
            .addCase(OneSubCategoriesThunk.rejected, (state, action) => {})
            // =======AddSubCategoriesThunk===========

            .addCase(AddSubCategoriesThunk.fulfilled, (state, action) => {})
            .addCase(AddSubCategoriesThunk.rejected, (state, action) => {
                state.name_en_Error = action.payload?.data?.["name.en"];
                state.name_ar_Error = action.payload?.data?.["name.ar"];
                state.name_fr_Error = action.payload?.data?.["name.fr"];
                state.selectError = action.payload?.data?.parent_id;
            })
            // =======UpdateSubCategoriesThunk===========

            .addCase(UpdateSubCategoriesThunk.fulfilled, (state, action) => {})
            .addCase(UpdateSubCategoriesThunk.rejected, (state, action) => {
                state.name_en_Error = action.payload?.data?.["name.en"];
                state.name_ar_Error = action.payload?.data?.["name.ar"];
                state.name_fr_Error = action.payload?.data?.["name.fr"];
            })
            // =======DeleteSubCategoriesThunk===========

            .addCase(DeleteSubCategoriesThunk.fulfilled, (state, action) => {})
            .addCase(DeleteSubCategoriesThunk.rejected, (state, action) => {});
    },
});

export default SubCategoriesReducer.reducer;

export let { closeError, removeCategoriesData } = SubCategoriesReducer.actions;
