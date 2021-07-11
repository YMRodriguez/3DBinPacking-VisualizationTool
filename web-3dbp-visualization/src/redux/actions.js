export const SELECT_ITEM = 'SELECT_ITEM';
export const CHANGE_PACKING_METHOD = 'CHANGE_PACKING_METHOD';
export const CHANGE_COUNTER = 'CHANGE_COUNTER';

export function selectItem(item, color) {
    return { type: SELECT_ITEM, payload: { item, color } }
}

export function changePackingMethod(packingMethod) {
    return { type: CHANGE_PACKING_METHOD, payload: { packingMethod } }
}

export function changeCounter(counter) {
    return { type: CHANGE_COUNTER, payload: { counter } }
}