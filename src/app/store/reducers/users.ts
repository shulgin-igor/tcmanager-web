import {User} from '../../shared/models/user.model';
import {Action, CREATED, LIST_LOADED, VALIDATION_FAILED, VIEW_SUCCESS} from '../actions/users';

// TODO: create separate store for user form

export interface State {
    list: { [id: number]: User },
    selected: User,
    errors: any
}

export const initialState: State = {
    list: {},
    selected: null,
    errors: {}
};

export function reducer<State>(state = initialState, action: Action) {
    // TODO reduce VIEW_FAILED
    switch (action.type) {
        case VIEW_SUCCESS: {
            const user: User = action.payload;
            return {
                ...state,
                selected: user
            };
        }
        case CREATED: {
            const newUser = action.payload; // TODO: set newUser type

            return {
                ...state,
                list: {...state.list, newUser}
            };

        }
        case VALIDATION_FAILED: {
            return {
                ...state,
                errors: action.payload
            };

        }
        case LIST_LOADED: {
            return {
                ...state,
                list: action.payload
            };

        }
        default:
            return state;
    }
}