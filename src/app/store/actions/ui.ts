import {Action} from '@ngrx/store';

export const MENU_TOGGLE = '[UI] Menu Toggle';

export class MenuToggle implements Action {
    readonly type = MENU_TOGGLE;

    constructor(public payload?: any) {
    }

}

export type Action = MenuToggle;