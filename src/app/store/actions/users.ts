import {Action} from '@ngrx/store';
import {User} from '../../shared/models/user.model';

export const VIEW = '[Users] View';
export const VIEW_SUCCESS = '[Users] View Success';
export const VIEW_FAILED = '[Users] View Failed';

export const CREATE = '[Users] Create';
export const CREATED = '[Users] Created';
export const VALIDATION_FAILED = '[Users] Create - Validation Failed';

export const LIST = '[Users] List';
export const LIST_LOADED = '[Users] List Loaded';

export class View implements Action {
    readonly type = VIEW;

    constructor(public payload: number) {
    }

}

export class ViewSuccess implements Action {
    readonly type = VIEW_SUCCESS;

    constructor(public payload: User) {
    }

}

export class ViewFailed implements Action {
    readonly type = VIEW_FAILED;

    constructor(public payload: any) {
    }

}

export class Create implements Action {
    readonly type = CREATE;

    constructor(public payload: User) {
    }
}

export class Created implements Action {
    readonly type = CREATED;

    constructor(public payload: User) {
    }
}

export class List implements Action {
    readonly type = LIST;

    constructor(public payload?: any) {
    }
}

export class ListLoaded implements Action {
    readonly type = LIST_LOADED;

    constructor(public payload: any) {
    }
}

export class ValidationFailed implements Action {
    readonly type = VALIDATION_FAILED;

    constructor(public payload: any) { // TODO: set type to <ValidationError[]>
    }
}

// TODO: UPDATE
// TODO: BLOCK

export type Action = View | Create | Created | List | ListLoaded | ValidationFailed | ViewSuccess | ViewFailed;