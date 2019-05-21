import {Action, MENU_TOGGLE} from '../actions/ui';

export interface State {
    opened: boolean
}

export const initialState: State = {
    opened: false,
};

export function reducer<State>(state = initialState, action: Action) {
    switch (action.type) {
        case MENU_TOGGLE: {
            return {
                opened: !state.opened
            };
        }
        default:
            return state;
    }
}