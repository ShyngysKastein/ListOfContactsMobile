import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios-contact';

export const getContacts = createAsyncThunk(
    'contact/getContacts',
    async () => {
        const res = await axios.get('contacts.json');
        return res.data;
    }
)

const initialState = {
    contacts: [],
    error: null,
    isLoading: false,
    visible: false,
    contact: null
}
const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        toggleDialog: (state, action) => {
            state.visible = action.payload;
        },
        modalInfo: (state, action) => {
            const filterInfo = state.contacts.filter(el => el.id === action.payload);
            state.contact = filterInfo;
            state.visible = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getContacts.pending, state => {
                state.isLoading = true;
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.error = action.error;
                state.isLoading = false;
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.contacts = Object.keys(action.payload).map((id) => {
                    return { ...action.payload[id], id }
                })
                state.isLoading = false;
            })
    }
})

export const { toggleDialog, modalInfo } = contactSlice.actions;
export default contactSlice.reducer;