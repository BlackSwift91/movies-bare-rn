import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUserToken } = userSlice.actions;

export default userSlice.reducer;
