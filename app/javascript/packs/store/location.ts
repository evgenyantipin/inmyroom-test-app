import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  location: {
    city: null | string;
    country: null | string;
  };
}

interface IStateLocation {
  city: null | string;
  country: null | string;
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
    setLoc: (
      state: IState,
      action: PayloadAction<IStateLocation>
    ) => {
      state.location = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { setLoc } = slice.actions;

export const setLocation = (location: IStateLocation) => (dispatch) => {
  dispatch(setLoc(location));
};
