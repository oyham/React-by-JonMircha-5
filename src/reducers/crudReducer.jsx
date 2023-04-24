import { TYPES } from "../actions/crudActions";

export const crudInitialState = {
    db: null
}

export function crudReducer(state, action) {
    switch (action.type) {
        case TYPES.READ_ALL_DATA: {
            return null
        }
        case TYPES.CREATE_DATA: {
            return null
        }
        case TYPES.READ_ONE_DATA: {
            return null
        }
        case TYPES.UPDATE_DATA: {
            return null
        }
        case TYPES.DELETE_DATA: {
            return null
        }
        case TYPES.NO_DATA: {
            return crudInitialState
        }
        default:
            return state
    }
}



