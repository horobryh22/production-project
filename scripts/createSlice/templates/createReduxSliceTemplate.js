const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = (slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');

    return `import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ${sliceNameUpperCase}Schema } from '../types';

const initialState: ${sliceNameUpperCase}Schema = {};

export const ${sliceNameUpperCase}Slice = createSlice({
    name: '${slice}',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
            
        },
    },
    // extraReducers: builder =>
    //     builder
    //         .addCase(.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.isLoading = false;
    //         })
    //         .addCase(.pending, state => {
    //             state.isLoading = true;
    //             state.error = undefined;
    //         })
    //         .addCase(
    //             .fulfilled,
    //             (state, action: PayloadAction<Article>) => {
    //                 state.isLoading = false;
    //                 state.data = action.payload;
    //                 state.error = undefined;
    //             },
    //         ),
});

export const { actions: ${sliceNameUpperCase}Actions } = ${sliceNameUpperCase}Slice;
export const { reducer: ${sliceNameUpperCase}Reducer } = ${sliceNameUpperCase}Slice;
`
}