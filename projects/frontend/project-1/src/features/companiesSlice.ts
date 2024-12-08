import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../lib/store';

// Define a type for the slice state
interface CompanyState {
  value: string[];
  selected: string;
}

// Define the initial state using that type
const initialState: CompanyState = {
  value: ['Brewed Delight', "Noah's Coffee", 'Royal Coffee', 'Cup of Magic'],
  selected: '',
};

export const companiesSlice = createSlice({
  name: 'companies',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = companiesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCompanies = (state: RootState) => state.companies.value;

export default companiesSlice.reducer;
