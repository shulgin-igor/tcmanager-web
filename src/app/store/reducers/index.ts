import * as users from './users';
import * as ui from './ui';
import {ActionReducerMap} from '@ngrx/store';

export interface State {
    users: users.State;
    ui: ui.State;
}

export const reducers: ActionReducerMap<State> = {
    users: users.reducer,
    ui: ui.reducer
};