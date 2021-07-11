import { combineReducers } from "redux";
import { SELECT_ITEM, CHANGE_PACKING_METHOD, CHANGE_COUNTER } from './actions';
import produce from "immer";


const selectItemReducer = produce((draft = {}, action = {}) => {
    switch (action.type) {
        case SELECT_ITEM:
            draft.item = action.payload.item;
            draft.color = action.payload.color;
            break
        default:
            return draft
    }
})

const packingMethodReducer = produce((draft = {}, action = {}) => {
    switch (action.type) {
        case CHANGE_PACKING_METHOD:
            draft = action.payload.packingMethod;
        default:
            return draft
    }
})

const counterForPackingReducer = produce((draft = {}, action = {}) => {
    switch (action.type) {
        case CHANGE_COUNTER:
            draft = action.payload.counter;
        default:
            return draft
    }
})


const GlobalState = (combineReducers({
    selectedItem: selectItemReducer,
    packingMethod: packingMethodReducer,
    counterForPacking: counterForPackingReducer,
}));
export default GlobalState;