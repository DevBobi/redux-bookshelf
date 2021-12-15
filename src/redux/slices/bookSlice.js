import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',

    async () => {
        const response = await fetch('https://redux-book-shelf.herokuapp.com/books')
            .then(res => res.json())
        return response.data
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        discover: [],
        readingList: [],
        finishedList: []
    },

    reducers: {
        addToReadingList: (state, { payload }) => {
            state.readingList.push(payload)
        },
        removeFromReadingList: (state, { payload }) => {
            state.readingList = state.readingList.filter(book => book.id !== payload.id)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.discover = action.payload;
            state.status = 'success';
        })
        builder.addCase(fetchBooks.pending, (state, action) => {
            state.status = 'pending';
        })
    },
});

export const { addToReadingList, removeFromReadingList } = bookSlice.actions;

export default bookSlice.reducer;