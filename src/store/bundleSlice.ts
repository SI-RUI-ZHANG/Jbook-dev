import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import bundle from "../bundler";

// Create the bundle thunk
export const createBundle = createAsyncThunk(
  "bundles/createBundle",
  async (arg: { cellId: string; input: string }, thunkAPI) => {
    thunkAPI.dispatch(bundleStart({cellId: arg.cellId}));
    const bundleResult = await bundle(arg.input);
    if (bundleResult.err) {
      thunkAPI.dispatch(bundleError({cellId: arg.cellId, bundle: bundleResult}));
      return;
    }
    thunkAPI.dispatch(bundleComplete({cellId: arg.cellId, bundle: bundleResult}));
  }
);


export type Bundle = {
  result: string;
  err: boolean;
}

type BundleStartAction = PayloadAction<{ cellId: string }>
type BundleCompleteAction = PayloadAction<{ cellId: string, bundle: Bundle }>
type BundleErrorAction = PayloadAction<{ cellId: string, bundle: Bundle }>

interface BundleState {
  [key: string]: {
    loading: boolean;
    result: string;
    err: boolean;
  } | undefined;
}

const initialState: BundleState = {};

// Create a slice
const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleStart: (state, action: BundleStartAction) => {
      state[action.payload.cellId] = {
        loading: true,
        result: "",
        err: false,
      };
    },
    bundleComplete: (state, action: BundleCompleteAction) => {
      state[action.payload.cellId] = {
        loading: false,
        result: action.payload.bundle.result,
        err: false,
      };
    },
    bundleError: (state, action: BundleErrorAction) => {
      state[action.payload.cellId] = {
        loading: false,
        result: action.payload.bundle.result,
        err: true,
      };
    }
  },
});

// Export the reducer
export default bundleSlice.reducer;

// Export the actions
export const {
  bundleStart,
  bundleComplete,
  bundleError
} = bundleSlice.actions;
