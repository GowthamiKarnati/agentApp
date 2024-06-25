
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    mobileNumber: '',
    searchValue: '',
    customerKYCData: null, 
    customerData: null,
    fieldToUpdate: null,
    applicationData: null,
    Submitting: false,
    addingtruck: false,
    updatingValue: false,
    loading: false,
    email:'',
    newCustomerData: null,
    newCustomerFeild:'',
    
  },
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCustomerKYCData: (state, action) => { 
      state.customerKYCData = action.payload; 
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setFieldToUpdate: (state, action) => {
      state.fieldToUpdate = action.payload;
    },
    setApplicationData: (state, action) => { // Action to set application data
      state.applicationData = action.payload;
    },
    setSubmitting: (state, action) => {
      state.Submitting = action.payload;
    },
    setAddingTruck: (state, action) => {
      state.addingtruck = action.payload;
    },
    setUpdatingValue: (state, action) => {
      state.updatingValue = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNewCustomerData: (state, action) =>{
      state.newCustomerData = action.payload;
    },
    setNewCustomerFeilds: (state, action) =>{
      state.newCustomerFeild = action.payload;
    }
  },
});

export const { setMobileNumber, setSearchValue, setCustomerKYCData,setCustomerData,setFieldToUpdate,setApplicationData, setSubmitting,setAddingTruck,setUpdatingValue,setLoading, setEmail,setNewCustomerData, setNewCustomerFeilds} = authSlice.actions;
export const selectMobileNumber = (state) => state.auth.mobileNumber;
export const selectSearchValue = (state) => state.auth.searchValue;
export const selectCustomerKYCData = (state) => state.auth.customerKYCData; 
export const selectCustomerData = (state) => state.auth.customerData;
export const selectFieldToUpdate = (state) => state.auth.fieldToUpdate;
export const selectApplicationData = (state) => state.auth.applicationData;
export const selectIsSubmitting = (state) => state.auth.Submitting;
export const selectAddingTruck = (state) => state.auth.addingtruck;
export const selectUpdatingValue = (state) => state.auth.updatingValue;
export const selectLoading = (state) => state.auth.loading;
export const selectEmail = (state) => state.auth.email;
export const selectNewCustomerData = (state) => state.auth.newCustomerData;
export const selectnewCustomerFeild = (state) => state.auth.newCustomerFeild
export default authSlice.reducer;
