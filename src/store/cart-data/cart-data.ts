import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CartData} from '../../types/state';
import {Guitar} from '../../types/guitar';

const initialState: CartData = {
  guitars: [] as Guitar[],
  deletingGuitar: {} as Guitar,
  coupon: null,
  discount: null,
  isCouponCorrect: null,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addGuitarToCart: (state, action) => {
      if (state.guitars.find((guitar) => guitar.id === action.payload.id)) {
        const guitarIndex = state.guitars.findIndex((guitar) => guitar.id === action.payload.id);
        state.guitars = [...state.guitars.slice(0, guitarIndex), action.payload, ...state.guitars.slice(guitarIndex)];
      } else {
        state.guitars = [action.payload, ...state.guitars];
      }
    },
    setDeletingGuitar: (state, action) => {
      state.deletingGuitar = action.payload;
    },
    removeGuitarFromCart: (state, action) => {
      const guitarIndex = state.guitars.findIndex((guitar) => guitar.id === action.payload.id);
      state.guitars = [...state.guitars.slice(0, guitarIndex), ...state.guitars.slice(guitarIndex + 1)];
    },
    deleteGuitar: (state, action) => {
      state.guitars = state.guitars.slice().filter((guitar) => guitar.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.guitars = [];
      state.deletingGuitar = {} as Guitar;
      state.coupon = null;
      state.discount = null;
      state.isCouponCorrect = null;
    },
    loadCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    loadDiscount: (state, action) => {
      state.discount = action.payload;
      state.isCouponCorrect = true;
    },
    removeDiscount: (state) => {
      state.coupon = null;
      state.discount = null;
      state.isCouponCorrect = false;
    },
  },
});

export const {
  addGuitarToCart,
  setDeletingGuitar,
  removeGuitarFromCart,
  deleteGuitar,
  clearCart,
  loadCoupon,
  loadDiscount,
  removeDiscount,
} = cartData.actions;
