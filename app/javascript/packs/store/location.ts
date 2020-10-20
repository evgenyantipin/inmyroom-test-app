import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStateLocation {
  city: null | string;
  country: null | string;
}

export interface IState {
  location: IStateLocation
}

const slice = createSlice({
  name: "location",
  initialState: {
    location: {
      city: null,
      country: null,
    },
  } as IState,
  reducers: {
    setLocation: (
      state: IState,
      action: PayloadAction<IStateLocation>
    ) => {
      state.location = action.payload;
    },
  },
});

export default slice.reducer;

export const { setLocation } = slice.actions;