import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IMovies {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  movies: IMovies[] | null;
}

const initialState: UserState = {
  movies: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovies[]>) => {
      state.movies = action.payload;
    },
  },
});

export const {setMovies} = movieSlice.actions;

export default movieSlice.reducer;
