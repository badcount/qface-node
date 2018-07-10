import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function customers(state = [], action) {
  switch (action.type) {
    case 'SET_CUSTOMER_LIST':
      return action.result;
    case 'SEARCH_PHOTO':
      return [];
    default:
      return state;
  }
}

function selectedCustomer(state = {}, action) {
  switch (action.type) {
    case 'SET_SELECTED_CUSTOMER':
      return action.customer;
    case 'SEARCH_PHOTO':
      return {};
    default:
      return state;
  }
}

function count(state = 5, action) {
  switch (action.type) {
    case 'TAKE_PHOTOS':
      return 5;
    case 'SEND_PHOTOS':
      return 0;
    case 'COUNT':
      return state - 1;
    default:
       return state;
  }
}

function takingPhoto(state=false, action) {
  switch (action.type) {
    case 'TAKE_PHOTOS':
      return true;
    case 'STOP_TAKING_PHOTO':
      return false;
    default:
      return state
  }

}

function searchingPhoto(state=false, action) {
  switch (action.type) {
    case 'SEARCH_PHOTO':
      return true;
    case 'CUSTOMER_FOUND':
      return false;
    default:
      return state
  }

}
export default combineReducers({ customers, selectedCustomer, takingPhoto, routing: routerReducer, searchingPhoto, count });
